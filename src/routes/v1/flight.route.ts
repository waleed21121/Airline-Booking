import { Router } from "express";
import { FlightController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators/id.validator";
import { postFlightValidator } from "../../validators/flight.validators";

const flightRouter = Router();

flightRouter.route('/')
                .post(postFlightValidator, wrapErrorMiddleware(FlightController.createFlight))

export default flightRouter;