import { Router } from "express";
import { FlightController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators/id.validator";
import { getFlightsValidator, postFlightValidator } from "../../validators/flight.validators";

const flightRouter = Router();

flightRouter.route('/')
                .post(postFlightValidator, wrapErrorMiddleware(FlightController.createFlight))
                .get(getFlightsValidator, wrapErrorMiddleware(FlightController.findFlights));

flightRouter.route('/:id')
                .get(idValidator, wrapErrorMiddleware(FlightController.findFlight));

export default flightRouter;