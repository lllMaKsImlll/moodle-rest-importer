export interface Question {
    type: 'mcq' | 'numeric' | 'truefalse' | 'essay';
    text: string;
    options?: { text: string; isCorrect: boolean }[];
    correctNumeric?: number;
    tolerance?: number;
    correctAnswer?: boolean;
    defaultGrade?: number;
}

export interface CreateQuizResult {
    success: boolean;
    quizUrl?: string;
    cmid?: number;
    questionsCreated?: number;
    error?: string;
    screenshot?: string;
}

export interface PuppeteerConfig {
    headless: boolean;
    viewportWidth: number;
    viewportHeight: number;
    defaultTimeout: number;
    delayMs: number;
}