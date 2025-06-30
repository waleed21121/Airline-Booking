import { Router } from "express";
import { AirplaneController } from "../../controllers";
import { postAirplaneValidator } from "../../validators/airplane.validators";
import { wrapErrorMiddleware } from "../../middlewares";

const airplaneRouter = Router();

airplaneRouter.route('/')
                .post(postAirplaneValidator, wrapErrorMiddleware(AirplaneController.createAirplane))
                .get(wrapErrorMiddleware(AirplaneController.findAirplanes));

export default airplaneRouter;