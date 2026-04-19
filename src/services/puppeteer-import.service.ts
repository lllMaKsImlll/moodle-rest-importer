// src/services/puppeteer-quiz-creator.service.ts

import puppeteer, { Browser, Page } from 'puppeteer';

export interface Question {
    type: 'mcq' | 'numeric' | 'truefalse' | 'essay';
    text: string;
    options?: { text: string; isCorrect: boolean }[];
    correctNumeric?: number;
    tolerance?: number;
    correctAnswer?: boolean;
    defaultGrade?: number;
}

export interface CreateQuizResult {
    success: boolean;
    quizUrl?: string;
    cmid?: number;
    questionsCreated?: number;
    error?: string;
    screenshot?: string;
}

export class PuppeteerQuizCreator {
    private browser: Browser | null = null;
    private page: Page | null = null;
    private moodleUrl: string;

    constructor() {
        this.moodleUrl = process.env.MOODLE_BASE_URL || 'https://dev01-moodle.susu.ru/moodle';
    }

    async init(headless: boolean = false) {
        console.log('🚀 Запуск браузера...');
        this.browser = await puppeteer.launch({ 
            headless: headless,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: { width: 1905, height: 800 }
        });
        this.page = await this.browser.newPage();
        await this.page.setDefaultTimeout(60000);
        console.log('✅ Браузер готов');
    }

    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async login(username: string, password: string): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');

        console.log(`🔐 Авторизация как ${username}...`);
        
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
        
        console.log('✅ Авторизация успешна');
        await this.delay(3000);
    }

    async goToMyCourses(): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');
        
        console.log('📚 Переход на "Мои курсы"...');
        
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#page-wrapper > nav li:nth-of-type(2) > a')
        ]);
        
        console.log('✅ Переход на "Мои курсы" выполнен');
        await this.delay(3000);
    }

    async openCourse(): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');
        
        console.log(`📖 Открытие курса "Тестирование"...`);
        
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('li:nth-of-type(4) div.col-md-9 > a')
        ]);
        
        console.log(`✅ Курс открыт`);
        await this.delay(3000);
    }

    async enableEditMode(): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');
        
        console.log('✏️ Включаем режим редактирования...');
        
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('input[name="setmode"]')
        ]);
        
        console.log('✅ Режим редактирования включен');
        await this.delay(3000);
    }

    async clickAddActivityButton(): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');
        
        console.log('➕ Нажимаем кнопку "Добавить элемент или ресурс"...');
        
        await this.page.click('#section-1 div.divider span');
        
        console.log('✅ Кнопка добавления нажата');
        await this.delay(2000);
    }

    async selectQuizType(): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');
        
        console.log('📝 Выбираем тип "Тест"...');
        
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#all-4 div:nth-of-type(31) a')
        ]);
        
        console.log('✅ Тип "Тест" выбран');
        await this.delay(2000);
    }

    async fillQuizName(quizName: string): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');
        
        console.log(`📝 Заполняем название теста: "${quizName}"...`);
        
        await this.page.click('#id_name');
        await this.delay(500);
        await this.page.type('#id_name', quizName);
        
        console.log('✅ Название теста заполнено');
        await this.delay(1000);
    }

    async fillQuizDescription(description: string): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');
        
        console.log(`📝 Заполняем описание теста...`);
        
        const frame = this.page.frames().find(f => f.url()?.includes('editor'));
        if (frame) {
            await frame.click('#tinymce');
            await frame.type('#tinymce', description);
        }
        
        console.log('✅ Описание теста заполнено');
        await this.delay(1000);
    }

    async saveAndShowQuiz(): Promise<number> {
        if (!this.page) throw new Error('Browser not initialized');
        
        console.log('💾 Сохраняем тест...');
        
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#id_submitbutton')
        ]);
        
        await this.delay(3000);
        
        const url = this.page.url();
        const cmidMatch = url.match(/cmid=(\d+)/);
        const cmid = cmidMatch ? parseInt(cmidMatch[1]) : null;
        
        console.log(`✅ Тест сохранен, cmid: ${cmid}`);
        return cmid!;
    }

    // Функция добавления вопроса - точь-в-точь как в записи
    async addQuestion(questionText: string, options: { text: string; isCorrect: boolean }[]): Promise<void> {
        if (!this.page) throw new Error('Browser not initialized');
        
        console.log(`➕ Добавление вопроса: "${questionText.substring(0, 50)}..."`);
        
        // 1. Нажимаем "Добавить вопрос" - как в записи
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#page-content a')
        ]);
        await this.delay(2000);
        
        // 2. Открываем меню - клик по иконке
        await this.page.click('#action-menu-toggle-1 > span');
        await this.delay(1000);
        
        // 3. Клик по "новый вопрос"
        await this.page.click('a.addquestion > span');
        await this.delay(1000);
        
        // 4. Выбираем тип вопроса "Множественный выбор" (15-й элемент)
        await this.page.click('div:nth-of-type(15) span.typename');
        await this.delay(1000);
        
        // 5. Нажимаем "Добавить"
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('input.submitbutton')
        ]);
        await this.delay(2000);
        
        // 6. Заполняем название вопроса
        const shortName = questionText.length > 100 ? questionText.substring(0, 97) + '...' : questionText;
        await this.page.click('#id_name');
        await this.page.type('#id_name', shortName);
        await this.delay(500);
        
        // 7. Заполняем текст вопроса через iframe
        const frame = this.page.frames().find(f => f.url()?.includes('editor'));
        if (frame) {
            await frame.click('#tinymce');
            await frame.type('#tinymce', questionText);
        }
        await this.delay(1000);
        
        // 8. Заполняем варианты ответов
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            
            await this.page.click(`#id_answer_${i}`);
            await this.page.type(`#id_answer_${i}`, option.text);
            
            if (option.isCorrect) {
                await this.page.click(`#id_fraction_${i}`);
                await this.page.type(`#id_fraction_${i}`, '100');
            }
        }
        await this.delay(1000);
        
        // 9. Сохраняем вопрос
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle2' }),
            this.page.click('#id_submitbutton')
        ]);
        
        console.log('✅ Вопрос добавлен');
        await this.delay(2000);
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
            
            if (!password) {
                throw new Error('MOODLE_PASSWORD не установлен в .env');
            }
            
            // 1. Авторизация
            await this.login(username, password);
            
            // 2. Переход на "Мои курсы"
            await this.goToMyCourses();
            
            // 3. Открытие курса
            await this.openCourse();
            
            // 4. Включение режима редактирования
            await this.enableEditMode();
            
            // 5. Нажатие кнопки "Добавить элемент или ресурс"
            await this.clickAddActivityButton();
            
            // 6. Выбор типа "Тест"
            await this.selectQuizType();
            
            // 7. Заполнение названия теста
            await this.fillQuizName(quizName);
            
            // 8. Заполнение описания
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