import { Router } from "express";
import { AirplaneController } from "../../controllers";

const airplaneRouter = Router();

airplaneRouter.route('/').post(AirplaneController.createAirplane);

export default airplaneRouter;