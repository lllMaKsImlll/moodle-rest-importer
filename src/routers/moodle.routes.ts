import { Router } from 'express';
import { MoodleController } from '../controllers/moodle.controller';

const router = Router();
const controller = new MoodleController();

router.get('/check', controller.checkConnection.bind(controller));
router.post('/course/enrol/:userId', controller.enrolUserToCourse.bind(controller));
router.delete('/course/unenrol/:userId', controller.unenrolUserFromCourse.bind(controller));
router.get('/course/:courseId/contents', controller.getCourseContents.bind(controller));
router.get('/course/:courseId/users', controller.getEnrolledUsers.bind(controller));
router.post('/course/enrol', controller.enrolUsers.bind(controller));

export default router;