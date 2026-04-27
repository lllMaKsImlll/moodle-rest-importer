export interface MoodleApiError {
    exception: string;
    message: string;
    errorcode?: string;
}

export interface SiteInfo {
    siteurl: string;
    user?: {
        id: number;
        fullname: string;
        email?: string;
    };
    [key: string]: any;
}

export interface EnrolmentParams {
    roleid: number;
    userid: number;
    courseid: number;
    timestart: number;
    timeend: number;
}

export interface EnrolmentResult {
    success: boolean;
}

export interface QuestionCategory {
    id: number;
    name: string;
    contextid: number;
    contextlevel: string;
    instanceid: number;
}

export interface CreatedCategory {
    id: number;
    name: string;
}

export interface Quiz {
    id: number;
    name: string;
    course: number;
    intro: string;
}

export interface BankQuestion {
    id: number;
    name: string;
    questiontext: string;
    qtype: string;
}

export interface ImportResult {
    imported?: number;
    [key: string]: any;
}

export interface CourseSection {
    id: number;
    name: string;
    summary: string;
    modules: CourseModule[];
}

export interface CourseModule {
    id: number;
    name: string;
    modname: string;
    instance: number;
}

export interface EnrolledUser {
    id: number;
    fullname: string;
    email?: string;
    roles?: Array<{ roleid: number; name: string }>;
}