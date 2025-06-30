import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils";
import { BaseError, ValidationError } from "sequelize";
import { StatusCodes } from "http-status-codes";

export default function <P, B, Q, R> (fn: (Preq: Request <P, {}, B, Q>, Pres: Response<R>, Pnext: NextFunction) => void ) {
    return async (req: Request <P, {}, B, Q>, res: Response<R>, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            if (error instanceof AppError) {
                next(error);
            } else if (error instanceof BaseError) {
                const err = new AppError(StatusCodes.FORBIDDEN, "Invalid Input", error.message);
                next(err);
            } else {
                // Will be handled in the production ...
                const err = new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Something Worong Happened", error);
                next(err);
            }
        }
    }
}