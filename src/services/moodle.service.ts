import axios from 'axios';
import dotenv from 'dotenv';
import {
    MoodleApiError,
    SiteInfo,
    EnrolmentParams,
    EnrolmentResult,
    QuestionCategory,
    CreatedCategory,
    Quiz,
    BankQuestion,
    ImportResult,
    CourseSection,
    EnrolledUser
} from '../types/moodle.api.types';

dotenv.config();

const MOODLE_URL = process.env.MOODLE_URL;
const MOODLE_TOKEN = process.env.MOODLE_TOKEN;

export class MoodleService {
    private readonly endpoint: string;

    constructor() {
        if (!MOODLE_URL || !MOODLE_TOKEN) {
            throw new Error('MOODLE_URL and MOODLE_TOKEN must be defined in environment variables');
        }
        this.endpoint = MOODLE_URL;
    }

    private async callApi<T>(functionName: string, params: Record<string, any> = {}): Promise<T> {
        const response = await axios.get(this.endpoint, {
            params: {
                wstoken: MOODLE_TOKEN,
                wsfunction: functionName,
                moodlewsrestformat: 'json',
                ...params
            },
            validateStatus: () => true
        });

        if (response.data && typeof response.data === 'object' && (response.data as MoodleApiError).exception) {
            const error = response.data as MoodleApiError;
            throw new Error(error.message || 'Moodle API error');
        }

        if (typeof response.data === 'string' && response.data.trim().startsWith('<')) {
            throw new Error(`Moodle returned HTML instead of JSON. Status: ${response.status}`);
        }

        if (response.data === null && functionName === 'enrol_manual_enrol_users') {
            return { success: true } as T;
        }

        return response.data as T;
    }

    async getSiteInfo(): Promise<SiteInfo> {
        return this.callApi<SiteInfo>('core_webservice_get_site_info');
    }

    async getCourseContents(courseId: number): Promise<CourseSection[]> {
        return this.callApi<CourseSection[]>('core_course_get_contents', { courseid: courseId });
    }

    async getEnrolledUsers(courseId: number): Promise<EnrolledUser[]> {
        return this.callApi<EnrolledUser[]>('core_enrol_get_enrolled_users', { courseid: courseId });
    }

    async enrolUsers(users: Array<{ userid: number; courseid: number; roleid?: number }>): Promise<EnrolmentResult | null> {
        const enrolments: EnrolmentParams[] = users.map(user => ({
            roleid: user.roleid || 5,
            userid: user.userid,
            courseid: user.courseid,
            timestart: Math.floor(Date.now() / 1000),
            timeend: 0
        }));

        return this.callApi<EnrolmentResult | null>('enrol_manual_enrol_users', { enrolments });
    }

    async unenrolUsers(users: Array<{ userid: number; courseid: number }>): Promise<null> {
        const enrolments = users.map(user => ({
            userid: user.userid,
            courseid: user.courseid
        }));

        return this.callApi<null>('enrol_manual_unenrol_users', { enrolments });
    }

    async getQuestionCategories(contextId: number): Promise<QuestionCategory[]> {
        return this.callApi<QuestionCategory[]>('core_question_get_categories', { contextid: contextId });
    }

    async createQuestionCategory(name: string, contextId: number): Promise<CreatedCategory> {
        return this.callApi<CreatedCategory>('core_question_create_category', {
            name,
            contextid: contextId
        });
    }

    async createQuiz(courseId: number, quizName: string, description: string = ''): Promise<Quiz> {
        const quizData = {
            courseid: courseId,
            name: quizName,
            intro: description,
            introformat: 1,
            timeopen: Math.floor(Date.now() / 1000),
            timeclose: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60,
            timelimit: 0,
            attempts: 0,
            grademethod: 1,
            decimalpoints: 2,
            questiondecimalpoints: -1,
            preferredbehaviour: 'deferredfeedback',
            shuffleanswers: 1,
            sumgrades: 0
        };

        return this.callApi<Quiz>('mod_quiz_add_quiz', quizData);
    }

    async addQuestionToQuiz(quizId: number, questionId: number, maxMark: number = 1.0, page: number = 0): Promise<any> {
        return this.callApi('mod_quiz_add_quiz_question', {
            quizid: quizId,
            questionid: questionId,
            maxmark: maxMark,
            page
        });
    }

    async getQuestionsByCategory(categoryId: number): Promise<BankQuestion[]> {
        return this.callApi<BankQuestion[]>('core_question_get_questions', { categoryid: categoryId });
    }

    async importQuestionsFromXml(xmlContent: string, categoryId: number): Promise<ImportResult> {
        const functions = [
            'core_question_import_questions',
            'mod_quiz_import_questions',
            'qbank_importquestions_import_questions'
        ];

        let lastError: Error | null = null;

        for (const funcName of functions) {
            try {
                return await this.callApi<ImportResult>(funcName, {
                    categoryid: categoryId,
                    format: 'xml',
                    data: xmlContent
                });
            } catch (error: any) {
                lastError = error;
            }
        }

        throw lastError || new Error('Не удалось импортировать вопросы: функция API не найдена');
    }
}