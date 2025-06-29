import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { AppError, zodErrorFormatter } from '../utils';
import { StatusCodes } from 'http-status-codes';

export default function <P, B, Q> (
    ParamsSchema: z.ZodSchema<P>,
    BodySchema: z.ZodSchema<B>,
    QuerySchema: z.ZodSchema<Q>) {
        return (req: Request<P, {}, B, Q>, res: Response, next: NextFunction) => {
            const { error: paramsError, data: paramsData } = ParamsSchema.safeParse(req.params);
            if (paramsError) {
                const error = zodErrorFormatter(paramsError, 'Invalid URL Parameters Object');
                next(error);
                return;
            }
            req.params = paramsData;

            const { error: bodyError, data: bodyData } = BodySchema.safeParse(req.body);
            if (bodyError) {
                const error = zodErrorFormatter(bodyError, 'Invalid Request Body Object');
                next(error);
                return;
            }
            req.body = bodyData;

            const {error: queryError, data: queryData} = QuerySchema.safeParse(req.query);
            if (queryError) {
                const error = zodErrorFormatter(queryError, 'Invalid Query Parameters Object');
                next(error);
            }
            // Make the req.query writable
            Object.defineProperty(req, "query", {
                value: queryData,
                writable: true,
                enumerable: true,
                configurable: true
            })

            next();
        }
}