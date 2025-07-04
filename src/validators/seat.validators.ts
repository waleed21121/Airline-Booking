import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { SeatSchema } from "../schemas/seat/seat.schema";
import { IdSchema } from "../schemas/id.schema";
import { UpdateSeatSchema } from "../schemas/seat/updateSeat.shema";


export const postSeatValidator = validationMiddleware(z.object({}), SeatSchema, z.object({}))
export type TPostSeat = typeof postSeatValidator

export const updateSeatValidtor = validationMiddleware(IdSchema, UpdateSeatSchema, z.object({}))
export type TUpdateSeat = typeof updateSeatValidtor