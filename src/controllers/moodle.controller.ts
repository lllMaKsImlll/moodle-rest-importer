import { Request, Response } from 'express';
import { MoodleService } from '../services/moodle.service';
import { ApiResponse, EnrolledUser, EnrolUsersRequest, UnenrolmentResult } from '../types/api.types';


export class MoodleController {
    private readonly moodleService: MoodleService;

    constructor() {
        this.moodleService = new MoodleService();
    }

    async checkConnection(_req: Request, res: Response<ApiResponse<unknown>>) {
        try {
            const info = await this.moodleService.getSiteInfo();
            return res.json({
                success: true,
                message: 'Подключение к Moodle установлено',
                data: info
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Ошибка подключения к Moodle'
            });
        }
    }

    async enrolUserToCourse(req: Request<{ userId: string }>, res: Response<ApiResponse<unknown>>) {
        try {
            const userId = parseInt(req.params.userId, 10);

            if (!userId || isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    error: 'userId обязателен и должен быть числом'
                });
            }

            const courseId = Number(process.env.MOODLE_COURSE_ID);

            if (!courseId || isNaN(courseId)) {
                return res.status(400).json({
                    success: false,
                    error: 'MOODLE_COURSE_ID не настроен в окружении'
                });
            }

            const result = await this.moodleService.enrolUsers([
                {
                    userid: userId,
                    courseid: courseId,
                    roleid: 5
                }
            ]);

            return res.json({
                success: true,
                message: `Пользователь ${userId} добавлен в курс ${courseId}`,
                data: result
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Ошибка при зачислении пользователя'
            });
        }
    }

    async unenrolUserFromCourse(req: Request<{ userId: string }>, res: Response<ApiResponse<UnenrolmentResult>>) {
        try {
            const userId = parseInt(req.params.userId, 10);

            if (!userId || isNaN(userId)) {
                return res.status(400).json({
                    success: false,
                    error: 'userId обязателен и должен быть числом'
                });
            }

            const courseId = Number(process.env.MOODLE_COURSE_ID);

            if (!courseId || isNaN(courseId)) {
                return res.status(400).json({
                    success: false,
                    error: 'MOODLE_COURSE_ID не настроен в окружении'
                });
            }

            const enrolledUsers = await this.moodleService.getEnrolledUsers(courseId);
            const isEnrolled = (enrolledUsers as EnrolledUser[]).some((u) => u.id === userId);

            if (!isEnrolled) {
                return res.status(404).json({
                    success: false,
                    error: `Пользователь ${userId} не зачислен в курс ${courseId}`
                });
            }

            const result = await this.moodleService.unenrolUsers([
                {
                    userid: userId,
                    courseid: courseId
                }
            ]);

            return res.json({
                success: true,
                message: `Пользователь ${userId} отчислен из курса ${courseId}`,
                data: { userid: userId, courseid: courseId, status: 'unenrolled' }
            });

        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Ошибка при отчислении пользователя'
            });
        }
    }

    async getCourseContents(req: Request<{ courseId: string }>, res: Response<ApiResponse<unknown>>) {
        try {
            const courseId = parseInt(req.params.courseId, 10);

            if (!courseId || isNaN(courseId)) {
                return res.status(400).json({
                    success: false,
                    error: 'courseId обязателен и должен быть числом'
                });
            }

            const contents = await this.moodleService.getCourseContents(courseId);
            return res.json({
                success: true,
                data: contents
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Ошибка при получении содержимого курса'
            });
        }
    }

    async getEnrolledUsers(req: Request<{ courseId: string }>, res: Response<ApiResponse<unknown>>) {
        try {
            const courseId = parseInt(req.params.courseId, 10);

            if (!courseId || isNaN(courseId)) {
                return res.status(400).json({
                    success: false,
                    error: 'courseId обязателен и должен быть числом'
                });
            }

            const users = await this.moodleService.getEnrolledUsers(courseId);
            return res.json({
                success: true,
                data: users
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Ошибка при получении списка пользователей'
            });
        }
    }

    async enrolUsers(req: Request<{}, {}, EnrolUsersRequest>, res: Response<ApiResponse<unknown>>) {
        try {
            const { users } = req.body;

            if (!users || !Array.isArray(users) || users.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Body должен содержать непустой массив users'
                });
            }

            const result = await this.moodleService.enrolUsers(users);
            return res.json({
                success: true,
                message: `Зачислено пользователей: ${users.length}`,
                data: result
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Ошибка при массовом зачислении пользователей'
            });
        }
    }
}