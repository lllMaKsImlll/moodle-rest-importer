// Конвертер из JSON в Moodle XML
export class XmlConverterService {

    // Главный метод конвертации
    convertToMoodleXml(questions: any[]): string {
        const xmlParts = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<quiz>'
        ];

        questions.forEach((q, index) => {
            switch (q.type) {
                case 'mcq':
                    xmlParts.push(this.convertMcq(q, index + 1));
                    break;
                case 'numeric':
                    xmlParts.push(this.convertNumeric(q, index + 1));
                    break;
                case 'truefalse':
                    xmlParts.push(this.convertTrueFalse(q, index + 1));
                    break;
                default:
                    console.log(`Неизвестный тип вопроса: ${q.type}`);
            }
        });

        xmlParts.push('</quiz>');
        return xmlParts.join('\n');
    }

    // Конвертация множественного выбора (mcq)
    private convertMcq(question: any, index: number): string {
        const name = this.sanitizeText(question.text.substring(0, 50));

        let xml = `  <question type="multichoice">\n`;
        xml += `    <name>\n      <text>Вопрос ${index}: ${name}</text>\n    </name>\n`;
        xml += `    <questiontext format="html">\n`;
        xml += `      <text><![CDATA[<p>${this.convertLatex(question.text)}</p>]]></text>\n`;
        xml += `    </questiontext>\n`;
        xml += `    <defaultgrade>1.0</defaultgrade>\n`;
        xml += `    <single>true</single>\n`;
        xml += `    <shuffleanswers>true</shuffleanswers>\n`;
        xml += `    <answernumbering>abc</answernumbering>\n`;

        // Добавляем варианты ответов
        question.options.forEach((opt: any) => {
            const fraction = opt.isCorrect ? 100 : 0;
            xml += `    <answer fraction="${fraction}" format="html">\n`;
            xml += `      <text><![CDATA[<p>${this.sanitizeText(opt.text)}</p>]]></text>\n`;
            xml += `      <feedback><text></text></feedback>\n`;
            xml += `    </answer>\n`;
        });

        xml += `  </question>`;
        return xml;
    }

    // Конвертация числового вопроса
    private convertNumeric(question: any, index: number): string {
        const name = this.sanitizeText(question.text.substring(0, 50));

        let xml = `  <question type="numerical">\n`;
        xml += `    <name>\n      <text>Вопрос ${index}: ${name}</text>\n    </name>\n`;
        xml += `    <questiontext format="html">\n`;
        xml += `      <text><![CDATA[<p>${this.convertLatex(question.text)}</p>]]></text>\n`;
        xml += `    </questiontext>\n`;
        xml += `    <defaultgrade>1.0</defaultgrade>\n`;
        xml += `    <answer fraction="100" format="moodle_auto_format">\n`;
        xml += `      <text>${question.correctNumeric}</text>\n`;
        xml += `      <tolerance>${question.tolerance || 0.01}</tolerance>\n`;
        xml += `    </answer>\n`;
        xml += `  </question>`;
        return xml;
    }

    // Конвертация True/False вопроса
    private convertTrueFalse(question: any, index: number): string {
        const name = this.sanitizeText(question.text.substring(0, 50));

        let xml = `  <question type="truefalse">\n`;
        xml += `    <name>\n      <text>Вопрос ${index}: ${name}</text>\n    </name>\n`;
        xml += `    <questiontext format="html">\n`;
        xml += `      <text><![CDATA[<p>${this.convertLatex(question.text)}</p>]]></text>\n`;
        xml += `    </questiontext>\n`;
        xml += `    <defaultgrade>1.0</defaultgrade>\n`;
        xml += `    <answer fraction="${question.correctAnswer === true ? 100 : 0}" format="moodle_auto_format">\n`;
        xml += `      <text>true</text>\n`;
        xml += `    </answer>\n`;
        xml += `    <answer fraction="${question.correctAnswer === false ? 100 : 0}" format="moodle_auto_format">\n`;
        xml += `      <text>false</text>\n`;
        xml += `    </answer>\n`;
        xml += `  </question>`;
        return xml;
    }

    // Конвертация LaTeX формул в формат Moodle
    private convertLatex(text: string): string {
        // Заменяем \( ... \) на $$ ... $$ для Moodle
        let converted = text.replace(/\\\(/g, '$$');
        converted = converted.replace(/\\\)/g, '$$');

        // Заменяем \[ ... \] на $$$$ ... $$$$
        converted = converted.replace(/\\\[/g, '$$$$');
        converted = converted.replace(/\\\]/g, '$$$$');

        return converted;
    }

    // Санитизация текста для XML
    private sanitizeText(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/\n/g, ' ')
            .trim();
    }
}