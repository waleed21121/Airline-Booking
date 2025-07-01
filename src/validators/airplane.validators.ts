import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { AirplaneSchema } from "../schemas/airplane.schema";
import { IdSchema } from "../schemas/id.schema";
import { UpdateAirplaneSchema } from "../schemas/updateAirplane.schema";


export const postAirplaneValidator = validationMiddleware(z.object({}), AirplaneSchema, z.object({}))
export type TPostAirplane = typeof postAirplaneValidator

export const updateAirplaneValidtor = validationMiddleware(IdSchema, UpdateAirplaneSchema, z.object({}))
export type TUpdateAirplane = typeof updateAirplaneValidtor 