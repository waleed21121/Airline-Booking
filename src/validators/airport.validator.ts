import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { AirportSchema } from "../schemas/airport/airport.schema";
import { IdSchema } from "../schemas/id.schema";
import { UpdateAirportSchema } from "../schemas/airport/updateAirport.schema";


export const postAirportValidator = validationMiddleware(z.object({}), AirportSchema, z.object({}))
export type TPostAirport = typeof postAirportValidator

export const updateAirportValidtor = validationMiddleware(IdSchema, UpdateAirportSchema, z.object({}))
export type TUpdateAirport = typeof updateAirportValidtor