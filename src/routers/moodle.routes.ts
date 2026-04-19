import { Router } from 'express';
import { MoodleController } from '../controllers/moodle.controller';

const router = Router();
const controller = new MoodleController();

router.get('/check', controller.checkConnection.bind(controller));
router.get('/course/:courseId/users', controller.getEnrolledUsers.bind(controller));

export default router;