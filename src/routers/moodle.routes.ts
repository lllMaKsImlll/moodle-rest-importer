import { Router } from 'express';
import { MoodleController } from '../controllers/moodle.controller';

const router = Router();
const controller = new MoodleController();

// GET маршруты
router.get('/check', controller.checkConnection.bind(controller));
router.get('/course/:courseId/contents', controller.getCourseContents.bind(controller));
router.get('/course/:courseId/users', controller.getEnrolledUsers.bind(controller));

// POST маршруты
router.post('/enrol', controller.enrolUsers.bind(controller));
router.post('/import-and-create', controller.importAndCreateTest.bind(controller));

export default router;