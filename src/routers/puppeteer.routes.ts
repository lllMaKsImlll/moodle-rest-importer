import { Router } from 'express';
import { PuppeteerController } from '../controllers/puppeteer.controller';

const router = Router();
const controller = new PuppeteerController();

router.post('/create-quiz', controller.createFullQuiz.bind(controller));

export default router;