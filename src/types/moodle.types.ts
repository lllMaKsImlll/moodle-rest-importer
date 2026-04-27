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

export interface ApiSuccessResponse<T> {
    success: true;
    message?: string;
    data: T;
}

export interface ApiErrorResponse {
    success: false;
    error: string;
    message?: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;