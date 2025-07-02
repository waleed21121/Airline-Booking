import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { CitySchema } from "../schemas/city/city.schema";
import { IdSchema } from "../schemas/id.schema";
import { UpdateCitySchema } from "../schemas/city/updateCity.schema";

export const postCityValidator = validationMiddleware(z.object({}), CitySchema, z.object({}))
export type TPostCity = typeof postCityValidator

export const updateCityValidtor = validationMiddleware(IdSchema, UpdateCitySchema, z.object({}))
export type TUpdateCity = typeof updateCityValidtor