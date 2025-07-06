import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { BookingSchema } from "../schemas/booking/booking.schema";
import { IdSchema } from "../schemas/id.schema";


export const postBookingValidator = validationMiddleware(z.object({}), BookingSchema, z.object({}))
export type TPostBooking = typeof postBookingValidator