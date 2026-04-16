export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface EnrolUserInput {
    userid: number;
    courseid: number;
    roleid?: number; // 5 = student
}

export interface QuestionImportInput {
    categoryid: number;
    format: 'xml' | 'aiken' | 'gift';
    data: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface EnrolUserInput {
    userid: number;
    courseid: number;
    roleid?: number; // 5 = student
}

export interface QuestionImportInput {
    categoryid: number;
    format: 'xml' | 'aiken' | 'gift';
    data: string;
}

// Типы для категорий вопросов
export interface QuestionCategory {
    id: number;
    name: string;
    contextid: number;
    info: string;
    infoformat: number;
    parent: number;
    sortorder: number;
}

// Тип для созданной категории
export interface CreatedCategory {
    id: number;
    name: string;
}

// Тип для созданного теста
export interface Quiz {
    id: number;
    course: number;
    name: string;
    intro: string;
    introformat: number;
    timeopen: number;
    timeclose: number;
    timelimit: number;
    attempts: number;
    grademethod: number;
    decimalpoints: number;
    questiondecimalpoints: number;
    preferredbehaviour: string;
    shuffleanswers: number;
    sumgrades: number;
}

// Тип для вопроса из банка
export interface BankQuestion {
    id: number;
    name: string;
    questiontext: string;
    questiontextformat: number;
    category: number;
    parent: number;
    length: number;
    stamp: string;
    version: string;
    hidden: number;
    generalfeedback: string;
    generalfeedbackformat: number;
    defaultmark: number;
    penalty: number;
    qtype: string;
    createdby: number;
    modifiedby: number;
    timecreated: number;
    timemodified: number;
}

// Тип для результата импорта вопросов
export interface ImportResult {
    success: boolean;
    imported: number;
    warnings?: string[];
}