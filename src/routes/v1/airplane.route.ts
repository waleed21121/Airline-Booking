import { Router } from "express";
import { AirplaneController } from "../../controllers";
import { postAirplaneValidator } from "../../validators/airplane.validators";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators/id.validator";

const airplaneRouter = Router();

airplaneRouter.route('/')
                .post(postAirplaneValidator, wrapErrorMiddleware(AirplaneController.createAirplane))
                .get(wrapErrorMiddleware(AirplaneController.findAirplanes));

airplaneRouter.route('/:id')
                .get(idValidator, wrapErrorMiddleware(AirplaneController.findAirplane));

export default airplaneRouter;