import puppeteer, { Browser, Page } from 'puppeteer';
import { CreateQuizResult, Question } from '../types/puppeteer.api.types';

export class PuppeteerQuizCreator {
    private browser: Browser | null = null;
    private page: Page | null = null;
    private moodleUrl: string;

    constructor() {
        this.moodleUrl = process.env.MOODLE_BASE_URL || 'https://dev01-moodle.susu.ru/moodle';
    }

    async fillTinyMCE(frame: any, text: string) {
        await frame.waitForSelector('#tinymce');

        await frame.evaluate((value: string) => {
            const el = document.querySelector('#tinymce');

            if (!el) throw new Error('tinymce не найден');

            (el as HTMLElement).innerHTML = value;

            (el as HTMLElement).dispatchEvent(new Event('input', { bubbles: true }));
            (el as HTMLElement).dispatchEvent(new Event('change', { bubbles: true }));
        }, text);
    }

    async init(headless: boolean = false) {
        this.browser = await puppeteer.launch({
            headless: headless,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: { width: 1905, height: 800 }
        });
        this.page = await this.browser.newPage();
        await this.page.setDefaultTimeout(60000);
    }

    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async login(username: string, password: string): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');

        await this.page.goto('https://dev01-moodle.susu.ru/moodle/login/index.php');
        await this.delay(2000);

        await this.page.click('#username');
        await this.page.type('#username', username);

        await this.page.click('#password');
        await this.page.type('#password', password);

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#loginbtn')
        ]);

        await this.delay(3000);
    }

    async goToMyCourses(): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#page-wrapper > nav li:nth-of-type(2) > a')
        ]);

        await this.delay(3000);
    }

    async openCourse(): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('li:nth-of-type(4) div.col-md-9 > a')
        ]);

        await this.delay(3000);
    }

    async enableEditMode(): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('input[name="setmode"]')
        ]);

        await this.delay(3000);
    }

    async clickAddActivityButton(): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');
        await this.page.click('#section-1 div.divider span');
        await this.delay(2000);
    }

    async selectQuizType(): Promise<void> {
        if (!this.page) throw new Error('Браузер не инициализирован');
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#all-4 div:nth-of-type(31) a')
        ]);

        await this.delay(1000);
    }

    async fillQuizName(quizName: string): Promise<void> {
        if (!this.page) throw new Error('Браузер не инициализирован');
        await this.page.click('#id_name');
        await this.delay(500);
        await this.page.type('#id_name', quizName);
        await this.delay(500);
    }

    async fillQuizDescription(description: string): Promise<void> {
        if (!this.page) throw new Error('Браузер не инициализирован');
        const frame = this.page.frames().find(f => f.url()?.includes('editor'));
        if (frame) {
            await frame.click('#tinymce');
            await frame.type('#tinymce', description);
        }

        await this.delay(500);
    }

    async saveAndShowQuiz(): Promise<number> {
        if (!this.page) throw new Error('Браузер не инициализирован');
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#id_submitbutton')
        ]);
        await this.delay(1500);

        const url = this.page.url();
        const cmidMatch = url.match(/cmid=(\d+)/);
        const cmid = cmidMatch ? parseInt(cmidMatch[1]) : null;
        return cmid!;
    }

    async addQuestion(questionText: string, options: { text: string; isCorrect: boolean }[]): Promise<void> {
        if (!this.page) throw new Error('Браузер не инициализирован');

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#page-content a')
        ]);
        await this.delay(1000);

        await this.page.click('#action-menu-toggle-1 > span');
        await this.delay(500);

        await this.page.click('a.addquestion > span');
        await this.delay(500);

        await this.page.click('div:nth-of-type(15) span.typename');
        await this.delay(500);

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('input.submitbutton')
        ]);
        await this.delay(1000);

        const shortName = questionText.length > 100 ? questionText.substring(0, 97) + '...' : questionText;
        await this.page.click('#id_name');
        await this.page.type('#id_name', shortName);
        await this.delay(500);

        await this.page.waitForSelector('iframe');

        let frame = this.page.mainFrame().childFrames()[0];

        if (!frame) {
            throw new Error('iframe вопроса не найден');
        }

        await this.fillTinyMCE(frame, questionText); this.delay(1000);

        for (let i = 0; i < options.length; i++) {
            const option = options[i];

            await this.page.click(`#id_answer_${i}`);
            await this.page.type(`#id_answer_${i}`, option.text);

            if (option.isCorrect) {
                await this.page.click(`#id_fraction_${i}`);
                await this.page.type(`#id_fraction_${i}`, '100');
            }
        }
        await this.delay(500);

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#id_submitbutton')
        ]);
        await this.delay(1000);
    }

    async createFullQuiz(
        courseId: number,
        quizName: string,
        questions: Question[],
        headless: boolean = false
    ): Promise<CreateQuizResult> {
        try {
            await this.init(headless);

            const username = process.env.MOODLE_USERNAME || 'aitutor';
            const password = process.env.MOODLE_PASSWORD;

            await this.login(username, password!!);
            await this.goToMyCourses();
            await this.openCourse();
            await this.enableEditMode();
            await this.clickAddActivityButton();
            await this.selectQuizType();
            await this.fillQuizName(quizName);
            await this.fillQuizDescription(`Автоматически созданный тест: ${quizName}`);

            // 9. Сохранение теста
            const cmid = await this.saveAndShowQuiz();

            // 10. Добавление вопросов
            let questionsCreated = 0;
            for (let i = 0; i < questions.length; i++) {
                const question = questions[i];

                console.log(`\n📌 Вопрос ${i + 1}/${questions.length}:`);

                if (question.type === 'mcq' && question.options) {
                    await this.addQuestion(question.text, question.options);
                    questionsCreated++;
                }
            }

            console.log(`\n🎉 Тест "${quizName}" успешно создан с ${questionsCreated} вопросами!`);

            return {
                success: true,
                quizUrl: `${this.moodleUrl}/mod/quiz/view.php?cmid=${cmid}`,
                cmid: cmid,
                questionsCreated: questionsCreated
            };

        } catch (error: any) {
            console.error('❌ Ошибка:', error);

            let screenshot;
            if (this.page) {
                screenshot = await this.page.screenshot({ encoding: 'base64' });
            }

            return {
                success: false,
                error: error.message,
                screenshot: screenshot
            };
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }
}