import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils";
import { JWT } from "../utils";
import { User } from "../models";
import { StatusCodes } from "http-status-codes";

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

export default async function (req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['accessToken'] || req.cookies['accessToken'];
    const refreshToken = req.headers['refreshToken'] || req.cookies['refreshToken'];
    try {
        const payload = await JWT.verifyToken(accessToken);
        if(payload instanceof User) {
            res.header('accessToken', accessToken);
            req.user = payload;
            next();
        }
        throw new AppError(StatusCodes.UNAUTHORIZED, "Error validating the token.", "Invalid payload.")
    } catch (accessTokenError) {
        try {
            const payload = await JWT.verifyToken(refreshToken);
            if(payload instanceof User) {
                const newAccessToken = await JWT.accessTokenGenerator(payload);
                res.header('accessToken', newAccessToken);
                req.user = payload;
                next();
            }
            throw new AppError(StatusCodes.UNAUTHORIZED, "Error validating the token.", "Invalid payload.")
        } catch (refreshTokenError) {
            next(refreshTokenError);
        }
    }
}