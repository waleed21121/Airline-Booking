import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { AirplaneSchema } from "../schemas/airplane.schema";


export const postAirplaneValidator = validationMiddleware(z.object({}), AirplaneSchema, z.object({}))
export type TPostAirplane = typeof postAirplaneValidator