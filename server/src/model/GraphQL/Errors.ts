export interface IError {
    name: string;
    message?: string;
    status: number;
}

interface IErrorType {
    USER_EXISTS: IError;
    DB_INSERT: IError;
    TOKEN_CREATION: IError;
    LOGIN_FAILED: IError;
    SERVER_ERROR: IError;
}

export const ErrorType: IErrorType = {
    USER_EXISTS: {
        name: 'USER_EXISTS',
        message: 'User already exists',
        status: 404
    },
    DB_INSERT: {
        name: 'DB_INSERT',
        message: 'Database insert error',
        status: 500
    },
    TOKEN_CREATION: {
        name: 'TOKEN_CREATION',
        message: 'Token creation error',
        status: 500
    },
    LOGIN_FAILED: {
        name: 'LOGIN_FAILED',
        message: 'Login failed',
        status: 401
    },
    SERVER_ERROR: {
        name: 'SERVER_ERROR',
        status: 500
    }
}

export const findError = (errorName: string) => {
    for (let key in ErrorType) {
        if (ErrorType.hasOwnProperty(key) && ErrorType[key as keyof IErrorType].name === errorName) return ErrorType[key as keyof IErrorType];
    }
}