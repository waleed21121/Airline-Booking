import { Router } from "express";
import { FlightController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators/id.validator";
import { getFlightsValidator, postFlightValidator, updateFlightSeatsValidator } from "../../validators/flight.validators";

const flightRouter = Router();

flightRouter.route('/')
                .post(postFlightValidator, wrapErrorMiddleware(FlightController.createFlight))
                .get(getFlightsValidator, wrapErrorMiddleware(FlightController.findFlights));

flightRouter.route('/:id')
                .get(idValidator, wrapErrorMiddleware(FlightController.findFlight));

flightRouter.route('/:id/seats')
                .patch(updateFlightSeatsValidator, wrapErrorMiddleware(FlightController.updateFlightSeats));

export default flightRouter;