import axios from 'axios';
import dotenv from 'dotenv';
import { QuestionCategory, CreatedCategory, Quiz, BankQuestion, ImportResult } from '../types/moodle.types';

dotenv.config();

const MOODLE_URL = process.env.MOODLE_URL;
const MOODLE_TOKEN = process.env.MOODLE_TOKEN;

export class MoodleService {
    private endpoint: string;

    constructor() {
        this.endpoint = `${MOODLE_URL}/webservice/rest/server.php`;
    }

    async callApi<T>(functionName: string, params: Record<string, any> = {}): Promise<T> {
        try {
            const response = await axios.post(this.endpoint, null, {
                params: {
                    wstoken: MOODLE_TOKEN,
                    wsfunction: functionName,
                    moodlewsrestformat: 'json',
                    ...params
                }
            });

            if (response.data.exception) {
                throw new Error(response.data.message || 'Moodle API error');
            }

            return response.data as T;
        } catch (error: any) {
            throw new Error(`API Error (${functionName}): ${error.message}`);
        }
    }

    // Получить категории вопросов в курсе
    async getQuestionCategories(contextId: number): Promise<QuestionCategory[]> {
        return this.callApi<QuestionCategory[]>('core_question_get_categories', {
            contextid: contextId
        });
    }

    // Создать категорию вопросов
    async createQuestionCategory(name: string, contextId: number): Promise<CreatedCategory> {
        return this.callApi<CreatedCategory>('core_question_create_category', {
            name: name,
            contextid: contextId
        });
    }

    // Создать тест в курсе
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

    // Добавить вопрос в тест
    async addQuestionToQuiz(quizId: number, questionId: number, maxMark: number = 1.0, page: number = 0): Promise<any> {
        return this.callApi('mod_quiz_add_quiz_question', {
            quizid: quizId,
            questionid: questionId,
            maxmark: maxMark,
            page: page
        });
    }

    // Получить список вопросов в категории
    async getQuestionsByCategory(categoryId: number): Promise<BankQuestion[]> {
        return this.callApi<BankQuestion[]>('core_question_get_questions', {
            categoryid: categoryId
        });
    }

    // Импорт вопросов из XML
    async importQuestionsFromXml(xmlContent: string, categoryId: number): Promise<ImportResult> {
        return this.callApi<ImportResult>('question_bank_import_questions', {
            categoryid: categoryId,
            format: 'xml',
            data: xmlContent
        });
    }

    // Остальные методы...
    async getCourseContents(courseId: number) {
        return this.callApi('core_course_get_contents', { courseid: courseId });
    }

    async getEnrolledUsers(courseId: number) {
        return this.callApi('core_enrol_get_enrolled_users', { courseid: courseId });
    }

    async enrolUsers(users: Array<{ userid: number; courseid: number; roleid?: number }>) {
        const enrolments = users.map(user => ({
            roleid: user.roleid || 5,
            userid: user.userid,
            courseid: user.courseid,
            timestart: Math.floor(Date.now() / 1000),
            timeend: 0
        }));

        return this.callApi('enrol_manual_enrol_users', { enrolments });
    }

    async getSiteInfo() {
        return this.callApi('core_webservice_get_site_info');
    }
}