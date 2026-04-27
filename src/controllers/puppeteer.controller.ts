import { Request, Response } from 'express';
import { PuppeteerQuizCreator } from '../services/puppeteer-import.service';
import { ApiResponse } from '../types/api.types';
import { CreateQuizRequest } from '../types/puppeteer.types';
import { CreateQuizResult } from '../types/puppeteer.api.types';

export class PuppeteerController {
    async createFullQuiz(req: Request<{}, {}, CreateQuizRequest>, res: Response<ApiResponse<CreateQuizResult>>) {
        try {
            const { courseId = 331, quizName, questions, headless = false } = req.body;

            if (!quizName || !questions || !Array.isArray(questions)) {
                return res.status(400).json({
                    success: false,
                    error: 'Необходимы поля: quizName, questions (массив)'
                });
            }

            const creator = new PuppeteerQuizCreator();
            const result = await creator.createFullQuiz(
                courseId,
                quizName,
                questions,
                headless
            );

            return res.json({
                success: true,
                message: `Тест "${quizName}" успешно создан`,
                data: result
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Неизвестная ошибка при создании теста'
            });
        }
    }
}