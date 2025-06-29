import { Router } from "express";
import { AirplaneController } from "../../controllers";
import { postAirplaneValidator } from "../../validators/airplane.validators";

const airplaneRouter = Router();

airplaneRouter.route('/').post(postAirplaneValidator, AirplaneController.createAirplane);

export default airplaneRouter;