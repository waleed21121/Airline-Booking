import { Router } from "express";
import { AirportController } from "../../controllers";
import { postAirportValidator, updateAirportValidtor } from "../../validators/airport.validator";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators/id.validator";

const airportRouter = Router();

airportRouter.route('/')
                .post(postAirportValidator, wrapErrorMiddleware(AirportController.createAirport))
                .get(wrapErrorMiddleware(AirportController.findAirports));

airportRouter.route('/:id')
                .get(idValidator, wrapErrorMiddleware(AirportController.findAirport))
                .patch(updateAirportValidtor, wrapErrorMiddleware(AirportController.updateAirport))
                .delete(idValidator, wrapErrorMiddleware(AirportController.deleteAirport));

export default airportRouter;