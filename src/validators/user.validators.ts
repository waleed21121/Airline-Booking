import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { UserSchema } from "../schemas/user/user.schema";
import { IdSchema } from "../schemas/id.schema";
import { UpdateUserSchema } from "../schemas/user/updateUser.schema";


export const postUserValidator = validationMiddleware(z.object({}), UserSchema, z.object({}))
export type TPostUser = typeof postUserValidator

export const updateUserValidtor = validationMiddleware(IdSchema, UpdateUserSchema, z.object({}))
export type TUpdateUser = typeof updateUserValidtor