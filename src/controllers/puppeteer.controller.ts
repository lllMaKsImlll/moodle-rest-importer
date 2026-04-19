import { Request, Response } from 'express';
import { PuppeteerQuizCreator } from '../services/puppeteer-import.service'

export class PuppeteerController {
    
    async createFullQuiz(req: Request, res: Response) {
        const {
            courseId = 331,
            quizName,
            questions,
            headless = false
        } = req.body;

        if (!quizName || !questions) {
            return res.status(400).json({
                success: false,
                error: 'Необходимы поля: quizName, questions'
            });
        }

        const creator = new PuppeteerQuizCreator();
        
        const result = await creator.createFullQuiz(
            courseId,
            quizName,
            questions,
            headless
        );
        
        res.json(result);
    }
}