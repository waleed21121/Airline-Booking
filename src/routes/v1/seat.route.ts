import { Router } from "express";
import { SeatController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators/id.validator";
import { postSeatValidator, updateSeatValidtor } from "../../validators/seat.validators";

const seatRouter = Router();

seatRouter.route('/')
                .post(postSeatValidator, wrapErrorMiddleware(SeatController.createSeat))
                .get(wrapErrorMiddleware(SeatController.findSeats));

seatRouter.route('/:id')
                .get(idValidator, wrapErrorMiddleware(SeatController.findSeat))
                .patch(updateSeatValidtor, wrapErrorMiddleware(SeatController.updateSeat))
                .delete(idValidator, wrapErrorMiddleware(SeatController.deleteSeat));

export default seatRouter;