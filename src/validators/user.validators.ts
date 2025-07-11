import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { UserSchema } from "../schemas/user/user.schema";
import { IdSchema } from "../schemas/id.schema";
import { UpdateUserSchema } from "../schemas/user/updateUser.schema";
import { LoginUserSchema } from "../schemas/user/loginUser.schema";
import { VerifyUserSchema } from "../schemas/user/verifyUser.schema";


export const postUserValidator = validationMiddleware(z.object({}), UserSchema, z.object({}))
export type TPostUser = typeof postUserValidator

export const updateUserValidtor = validationMiddleware(IdSchema, UpdateUserSchema, z.object({}))
export type TUpdateUser = typeof updateUserValidtor

export const loginUserValidator = validationMiddleware(z.object({}), LoginUserSchema, z.object({}));
export type TLoginUser = typeof loginUserValidator

export const verifyUserValidator = validationMiddleware(z.object({}), z.object({}), VerifyUserSchema);
export type TVerifyUser = typeof verifyUserValidator