import { validationMiddleware } from "../middlewares";
import { IdSchema } from "../schemas/id.schema";
import { z } from 'zod';

export const idValidator = validationMiddleware(IdSchema, z.object({}), z.object({}));
export type TIdValidator = typeof idValidator;