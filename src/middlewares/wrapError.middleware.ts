import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils";
import { BaseError, ValidationError } from "sequelize";
import { StatusCodes } from "http-status-codes";

export default function (fn: (Preq: Request, Pres: Response, Pnext: NextFunction) => void ) {
    return async (req: Request, res: Response, next: NextFunction) => {
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