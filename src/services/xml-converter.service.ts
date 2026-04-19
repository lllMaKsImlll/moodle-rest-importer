export interface QuestionOption {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    type: 'mcq' | 'numeric' | 'truefalse' | 'essay' | 'matching';
    text: string;
    options?: QuestionOption[];
    correctNumeric?: number;
    tolerance?: number;
    correctAnswer?: boolean;
    feedback?: string;
    defaultGrade?: number;
    penalty?: number;
    hidden?: number;
}

export class XmlConverterService {

    /**
     * Конвертирует JSON-массив вопросов в Moodle XML формат
     */
    convertToMoodleXml(questions: Question[]): string {
        const header = this.getXmlHeader();
        const body = questions.map((q, idx) => this.convertQuestionToXml(q, idx + 1)).join('\n');
        const footer = this.getXmlFooter();

        return header + body + footer;
    }

    /**
     * Конвертирует отдельный вопрос в XML
     */
    private convertQuestionToXml(question: Question, index: number): string {
        switch (question.type) {
            case 'mcq':
                return this.convertMcqToXml(question, index);
            case 'numeric':
                return this.convertNumericToXml(question, index);
            case 'truefalse':
                return this.convertTrueFalseToXml(question, index);
            case 'essay':
                return this.convertEssayToXml(question, index);
            case 'matching':
                return this.convertMatchingToXml(question, index);
            default:
                throw new Error(`Unknown question type: ${question.type}`);
        }
    }

    /**
     * Конвертирует MCQ (Multiple Choice Question)
     */
    private convertMcqToXml(question: Question, index: number): string {
        const name = this.escapeXml(this.generateQuestionName(question.text, index));
        const questionText = this.escapeXml(this.wrapInCData(question.text));
        const defaultGrade = question.defaultGrade || 1.0;

        let answersXml = '';
        if (question.options) {
            for (const opt of question.options) {
                const fraction = opt.isCorrect ? '100' : '0';
                const answerText = this.escapeXml(this.wrapInCData(opt.text));
                answersXml += `
            <answer fraction="${fraction}" format="html">
            <text>${answerText}</text>
            <feedback><text></text></feedback>
            </answer>`;
            }
        }

        return `
        <question type="multichoice">
            <name>
            <text>${name}</text>
            </name>
            <questiontext format="html">
            <text>${questionText}</text>
            </questiontext>
            <defaultgrade>${defaultGrade}</defaultgrade>
            <penalty>${question.penalty || 0.3333333}</penalty>
            <hidden>${question.hidden || 0}</hidden>
            <single>true</single>
            <shuffleanswers>true</shuffleanswers>
            <answernumbering>abc</answernumbering>
            <showstandardinstruction>0</showstandardinstruction>
            ${answersXml}
        </question>`;
    }

    /**
     * Конвертирует числовой вопрос
     */
    private convertNumericToXml(question: Question, index: number): string {
        const name = this.escapeXml(this.generateQuestionName(question.text, index));
        const questionText = this.escapeXml(this.wrapInCData(question.text));
        const defaultGrade = question.defaultGrade || 1.0;
        const tolerance = question.tolerance || 0.01;

        return `
            <question type="numerical">
                <name>
                <text>${name}</text>
                </name>
                <questiontext format="html">
                <text>${questionText}</text>
                </questiontext>
                <defaultgrade>${defaultGrade}</defaultgrade>
                <penalty>${question.penalty || 0.1}</penalty>
                <hidden>${question.hidden || 0}</hidden>
                <answer fraction="100" format="moodle_auto_format">
                <text>${question.correctNumeric}</text>
                <feedback><text></text></feedback>
                <tolerance>${tolerance}</tolerance>
                </answer>
                <unitgradingtype>0</unitgradingtype>
                <unitpenalty>0.1</unitpenalty>
                <showunits>3</showunits>
                <unitsleft>0</unitsleft>
            </question>`;
    }

    /**
     * Конвертирует вопрос "Верно/Неверно"
     */
    private convertTrueFalseToXml(question: Question, index: number): string {
        const name = this.escapeXml(this.generateQuestionName(question.text, index));
        const questionText = this.escapeXml(this.wrapInCData(question.text));
        const defaultGrade = question.defaultGrade || 1.0;

        // Правильный ответ: true = 100% за true, false = 100% за false
        const correctFraction = question.correctAnswer === true ? '100' : '0';
        const falseFraction = question.correctAnswer === true ? '0' : '100';

        return `
            <question type="truefalse">
                <name>
                <text>${name}</text>
                </name>
                <questiontext format="html">
                <text>${questionText}</text>
                </questiontext>
                <defaultgrade>${defaultGrade}</defaultgrade>
                <penalty>${question.penalty || 0.3333333}</penalty>
                <hidden>${question.hidden || 0}</hidden>
                <answer fraction="${correctFraction}" format="moodle_auto_format">
                <text>true</text>
                <feedback><text></text></feedback>
                </answer>
                <answer fraction="${falseFraction}" format="moodle_auto_format">
                <text>false</text>
                <feedback><text></text></feedback>
                </answer>
            </question>`;
    }

    /**
     * Конвертирует эссе (текстовый ответ)
     */
    private convertEssayToXml(question: Question, index: number): string {
        const name = this.escapeXml(this.generateQuestionName(question.text, index));
        const questionText = this.escapeXml(this.wrapInCData(question.text));
        const defaultGrade = question.defaultGrade || 10.0;

        return `
        <question type="essay">
            <name>
            <text>${name}</text>
            </name>
            <questiontext format="html">
            <text>${questionText}</text>
            </questiontext>
            <defaultgrade>${defaultGrade}</defaultgrade>
            <penalty>${question.penalty || 0.1}</penalty>
            <hidden>${question.hidden || 0}</hidden>
            <responseformat>editor</responseformat>
            <responserequired>1</responserequired>
            <responsefieldlines>15</responsefieldlines>
            <attachments>0</attachments>
            <attachmentsrequired>0</attachmentsrequired>
            <graderinfo format="html">
            <text></text>
            </graderinfo>
            <responsetemplate format="html">
            <text></text>
            </responsetemplate>
        </question>`;
    }

    /**
     * Конвертирует вопрос на соответствие (Matching)
     */
    private convertMatchingToXml(question: Question, index: number): string {
        const name = this.escapeXml(this.generateQuestionName(question.text, index));
        const questionText = this.escapeXml(this.wrapInCData(question.text));
        const defaultGrade = question.defaultGrade || 1.0;

        let subquestionsXml = '';
        if (question.options) {
            for (let i = 0; i < question.options.length; i += 2) {
                const term = question.options[i].text;
                const definition = question.options[i + 1]?.text || '';
                subquestionsXml += `
    <subquestion format="html">
        <text>${this.escapeXml(this.wrapInCData(term))}</text>
        <answer>
            <text>${this.escapeXml(this.wrapInCData(definition))}</text>
        </answer>
        </subquestion>`;
                }
            }

            return `
    <question type="matching">
        <name>
        <text>${name}</text>
        </name>
        <questiontext format="html">
        <text>${questionText}</text>
        </questiontext>
        <defaultgrade>${defaultGrade}</defaultgrade>
        <penalty>${question.penalty || 0.3333333}</penalty>
        <hidden>${question.hidden || 0}</hidden>
        <shuffleanswers>true</shuffleanswers>
        ${subquestionsXml}
        </question>`;
    }

    /**
     * Генерирует имя вопроса
     */
    private generateQuestionName(text: string, index: number): string {
        // Берем первые 50 символов текста вопроса
        const shortText = text.replace(/\\\(.*?\\\)/g, '').substring(0, 50).trim();
        return `LLM Generated: ${shortText} (${index})`;
    }

    /**
     * Оборачивает текст в CDATA секцию
     */
    private wrapInCData(text: string): string {
        // Заменяем LaTeX на правильный формат Moodle
        let processedText = text
            // Moodle использует $$ для отображения формул
            .replace(/\\\(/g, '$$')
            .replace(/\\\)/g, '$$')
            .replace(/\\\[/g, '$$')
            .replace(/\\\]/g, '$$');

        return `<![CDATA[${processedText}]]>`;
    }

    /**
     * Экранирует XML специальные символы
     */
    private escapeXml(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    /**
     * Возвращает заголовок XML файла
     */
    private getXmlHeader(): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
<quiz>
    <!--
    Автоматически сгенерированный XML для импорта в Moodle
    Создано системой авто-тестирования
    -->`;
    }

    /**
     * Возвращает закрывающий тег XML
     */
    private getXmlFooter(): string {
        return `
</quiz>`;
    }
}