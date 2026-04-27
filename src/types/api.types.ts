export interface ApiResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export interface ApiSuccessResponse<T = null> extends ApiResponse<T> {
    success: true;
    data: T;
}

export interface ApiErrorResponse extends ApiResponse<null> {
    success: false;
    error: string;
}

export interface EnrolmentRequest {
    userid: number;
    courseid: number;
    roleid?: number;
}

export interface EnrolUsersRequest {
    users: EnrolmentRequest[];
}

export interface UnenrolmentResult {
    userid: number;
    courseid: number;
    status: string;
}

export interface EnrolledUser {
    id: number;
    [key: string]: any;
}
