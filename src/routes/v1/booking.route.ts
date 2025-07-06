import { Router } from "express";
import { BookingController } from "../../controllers";
import { postBookingValidator } from "../../validators/booking.validators";
import { wrapErrorMiddleware } from "../../middlewares";

const bookingRouter = Router();

bookingRouter.route('/')
                .post(postBookingValidator, wrapErrorMiddleware(BookingController.createBooking));


export default bookingRouter;