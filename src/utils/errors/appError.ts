export default class AppError extends Error {
    protected errors: any;
    constructor(message: string, errors: any) {
        super(message);
        this.errors = errors;
    }
}