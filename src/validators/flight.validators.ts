import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { FlightSchema } from "../schemas/flight/flight.schema";
import { IdSchema } from "../schemas/id.schema";

export const postFlightValidator = validationMiddleware(z.object({}), FlightSchema, z.object({}))
export type TPostFlight = typeof postFlightValidator