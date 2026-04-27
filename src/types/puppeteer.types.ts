export interface CreateQuizRequest {
    courseId?: number;
    quizName: string;
    questions: any[];
    headless?: boolean;
}

export interface CreateQuizResult {
    quizId: number;
    quizName: string;
    courseId: number;
    questionsImported: number;
}