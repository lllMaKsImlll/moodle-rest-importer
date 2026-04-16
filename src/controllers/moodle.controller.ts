import { Request, Response } from 'express';
import { MoodleService } from '../services/moodle.service';
import { XmlConverterService } from '../services/xml-converter.service';
import { QuestionCategory, Quiz, BankQuestion } from '../types/moodle.types';

const moodleService = new MoodleService();
const xmlConverter = new XmlConverterService();

export class MoodleController {

    // Проверка подключения
    async checkConnection(req: Request, res: Response) {
        try {
            const info = await moodleService.getSiteInfo();
            res.json({ success: true, data: info });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Импорт и создание теста (исправленная версия)
    async importAndCreateTest(req: Request, res: Response) {
        try {
            const {
                questions,        // массив вопросов от LLM
                courseId,        // ID курса
                quizName,        // название теста
                categoryName     // опционально: название категории вопросов
            } = req.body;

            if (!questions || !courseId || !quizName) {
                return res.status(400).json({
                    success: false,
                    error: 'Необходимы поля: questions, courseId, quizName'
                });
            }

            // ШАГ 1: Конвертируем JSON в Moodle XML
            console.log('📝 1. Конвертация JSON в Moodle XML...');
            const xmlContent = xmlConverter.convertToMoodleXml(questions);

            // ШАГ 2: Создаем категорию вопросов (или используем существующую)
            console.log('📂 2. Подготовка категории вопросов...');
            let categoryId: number = req.body.categoryId;

            if (!categoryId) {
                // Получаем список категорий курса
                const categories: QuestionCategory[] = await moodleService.getQuestionCategories(courseId);

                if (categories.length > 0) {
                    categoryId = categories[0].id; // используем первую категорию
                    console.log(`📌 Используем существующую категорию: ${categories[0].name} (ID: ${categoryId})`);
                } else {
                    // Создаем новую категорию
                    const categoryNameToUse = categoryName || `Категория для ${quizName}`;
                    const newCategory = await moodleService.createQuestionCategory(categoryNameToUse, courseId);
                    categoryId = newCategory.id;
                    console.log(`✨ Создана новая категория: ${newCategory.name} (ID: ${categoryId})`);
                }
            }

            // ШАГ 3: Импортируем вопросы в банк
            console.log('💾 3. Импорт вопросов в банк вопросов курса...');
            const importResult = await moodleService.importQuestionsFromXml(xmlContent, categoryId);
            console.log(`📊 Импортировано вопросов: ${importResult.imported || questions.length}`);

            // ШАГ 4: Создаем тест в курсе
            console.log('📋 4. Создание теста в курсе...');
            const quiz: Quiz = await moodleService.createQuiz(courseId, quizName, `Автоматически созданный тест на основе LLM`);
            const quizId = quiz.id;
            console.log(`✅ Тест создан: ${quiz.name} (ID: ${quizId})`);

            // ШАГ 5: Получаем список импортированных вопросов
            console.log('🔍 5. Получение списка вопросов из банка...');
            const questionsInBank: BankQuestion[] = await moodleService.getQuestionsByCategory(categoryId);

            // Берем последние N вопросов (сколько импортировали)
            const recentQuestions = questionsInBank.slice(-questions.length);
            console.log(`📚 Найдено ${recentQuestions.length} вопросов для добавления`);

            // ШАГ 6: Добавляем вопросы в тест
            console.log('➕ 6. Добавление вопросов в тест...');
            let addedCount = 0;

            for (let i = 0; i < recentQuestions.length; i++) {
                const question = recentQuestions[i];
                await moodleService.addQuestionToQuiz(quizId, question.id, 1.0, i);
                addedCount++;
                console.log(`  ✅ Вопрос ${i + 1}/${recentQuestions.length} добавлен (ID: ${question.id})`);
            }

            console.log(`🎉 Готово! Создан тест "${quizName}" с ${addedCount} вопросами`);

            res.json({
                success: true,
                data: {
                    quizId: quizId,
                    quizName: quizName,
                    courseId: courseId,
                    questionsImported: addedCount,
                    categoryId: categoryId
                },
                message: `Тест "${quizName}" успешно создан с ${addedCount} вопросами`
            });

        } catch (error: any) {
            console.error('❌ Ошибка:', error);
            res.status(500).json({
                success: false,
                error: error.message,
                details: error.response?.data || null
            });
        }
    }

    // Остальные методы...
    async getCourseContents(req: Request, res: Response) {
        try {
            const { courseId } = req.params;
            const contents = await moodleService.getCourseContents(Number(courseId));
            res.json({ success: true, data: contents });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getEnrolledUsers(req: Request, res: Response) {
        try {
            const { courseId } = req.params;
            const users = await moodleService.getEnrolledUsers(Number(courseId));
            res.json({ success: true, data: users });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async enrolUsers(req: Request, res: Response) {
        try {
            const { users } = req.body;

            if (!users || !Array.isArray(users)) {
                return res.status(400).json({
                    success: false,
                    error: 'Body должен содержать массив users'
                });
            }

            const result = await moodleService.enrolUsers(users);
            res.json({ success: true, data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}