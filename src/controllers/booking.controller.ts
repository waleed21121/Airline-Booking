import { NextFunction, Request, Response } from "express";
import { BookingService } from "../services";
import { IBookingResponse } from "../DTOs";
import { StatusCodes } from "http-status-codes";
import { TPostBooking, TPostPayment } from "../validators/booking.validators";
import { IdempotencyKeySchema } from "../schemas/common/idempotencyKey.schema";
import { AppError, zodErrorFormatter } from "../utils";

const inMemoryDb: Record<string, string> = {};

const createBooking: TPostBooking = async (req, res: Response<IBookingResponse>, next: NextFunction) => {
    const booking = await BookingService.createBooking(req.body);
    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully created booking',
        data: booking,
        error: null
    })
}

const createPayment: TPostPayment = async (req, res: Response<IBookingResponse>, next: NextFunction) => {
    
    const {error, data} = IdempotencyKeySchema.safeParse(req.headers);
    if(error) {
        throw zodErrorFormatter(error, "Error creating the payment");
    }
    console.log(inMemoryDb[data['idempotency-key']]);
    
    if(inMemoryDb[data['idempotency-key']] !== undefined) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Error completing the payment.", "Attempt to retry the booking payment.");
    }

    const updatedBooking = await BookingService.makePayment(req.body);
    
    inMemoryDb[data['idempotency-key']] = data['idempotency-key'];

    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'Successfully completed your payment.',
        data: updatedBooking,
        error: null
    })
}

const BookingController = {
    createBooking,
    createPayment
}

export default BookingController