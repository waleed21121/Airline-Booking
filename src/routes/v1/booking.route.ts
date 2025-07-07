import { Router } from "express";
import { BookingController } from "../../controllers";
import { postBookingValidator, postPaymentValidator } from "../../validators/booking.validators";
import { wrapErrorMiddleware } from "../../middlewares";

const bookingRouter = Router();

bookingRouter.route('/')
                .post(postBookingValidator, wrapErrorMiddleware(BookingController.createBooking));

bookingRouter.route('/payment')
                .post(postPaymentValidator, wrapErrorMiddleware(BookingController.createPayment));

export default bookingRouter;