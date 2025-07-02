import { ZodError } from "zod";
import { AppError } from "..";
import { StatusCodes } from "http-status-codes";

export default function (zodError: ZodError, message: string): AppError {
    let responseErrors: string[] = [];
    zodError.issues.forEach((issue) => {
        responseErrors.push(issue.message)
    });
    const error = new AppError(StatusCodes.BAD_REQUEST, message, responseErrors);
    return error;
}