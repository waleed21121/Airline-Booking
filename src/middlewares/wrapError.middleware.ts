import { NextFunction, Request, Response } from "express";

export default function (fn: (Preq: Request, Pres: Response, Pnext: NextFunction) => void ) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            fn(req, res, next);
        } catch (error) {
            // Error Hndling
            throw error;
        }
    }
}