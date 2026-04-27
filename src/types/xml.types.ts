export interface QuestionOption {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    type: 'mcq' | 'numeric' | 'truefalse' | 'essay' | 'matching';
    text: string;
    options?: QuestionOption[];
    correctNumeric?: number;
    tolerance?: number;
    correctAnswer?: boolean;
    feedback?: string;
    defaultGrade?: number;
    penalty?: number;
    hidden?: number;
}