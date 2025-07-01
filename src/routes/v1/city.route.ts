import { Router } from "express";
import { CityController } from "../../controllers";
import { wrapErrorMiddleware } from "../../middlewares";
import { idValidator } from "../../validators/id.validator";
import { postCityValidator, updateCityValidtor } from "../../validators/city.validators";

const cityRouter = Router();

cityRouter.route('/')
                .post(postCityValidator, wrapErrorMiddleware(CityController.createCity))
                .get(wrapErrorMiddleware(CityController.findCities));

cityRouter.route('/:id')
                .get(idValidator, wrapErrorMiddleware(CityController.findCity))
                .patch(updateCityValidtor, wrapErrorMiddleware(CityController.updateCity))
                .delete(idValidator, wrapErrorMiddleware(CityController.deleteCity));

export default cityRouter;