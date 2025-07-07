import { NextFunction, Request, Response } from "express";
import { BookingService } from "../services";
import { IBookingResponse } from "../DTOs";
import { StatusCodes } from "http-status-codes";
import { TPostBooking, TPostPayment } from "../validators/booking.validators";

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
    const updatedBooking = await BookingService.makePayment(req.body);
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