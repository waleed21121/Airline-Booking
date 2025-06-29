import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export default function <P, B, Q> (
    ParamsSchema: z.ZodSchema<P>,
    BodySchema: z.ZodSchema<B>,
    QuerySchema: z.ZodSchema<Q>) {
        return (req: Request<P, {}, B, Q>, res: Response, next: NextFunction) => {
            const { error: paramsError, data: paramsData } = ParamsSchema.safeParse(req.params);
            if (paramsError) {
                // Error Handling
                throw paramsError;
            }
            req.params = paramsData;

            const { error: bodyError, data: bodyData } = BodySchema.safeParse(req.body);
            if (bodyError) {
                // Error Handling
                throw bodyError;
            }
            req.body = bodyData;

            const {error: queryError, data: queryData} = QuerySchema.safeParse(req.query);
            if (queryError) {
                // Error Handling
                throw queryError
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