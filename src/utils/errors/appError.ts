export default class AppError extends Error {
    
    errors: any;
    statusCode: number;

    constructor(statusCode:number, message: string, errors: any) {
        super(message);
        this.errors = errors;
        this.statusCode = statusCode;
    }
}