import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { BookingSchema } from "../schemas/booking/booking.schema";
import { IdSchema } from "../schemas/id.schema";
import { PaymentSchema } from "../schemas/booking/payment.schema";


export const postBookingValidator = validationMiddleware(z.object({}), BookingSchema, z.object({}))
export type TPostBooking = typeof postBookingValidator

export const postPaymentValidator = validationMiddleware(z.object({}), PaymentSchema, z.object({}));
export type TPostPayment = typeof postPaymentValidator