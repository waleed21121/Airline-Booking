import { z } from "zod";
import { validationMiddleware } from "../middlewares";
import { FlightSchema } from "../schemas/flight/flight.schema";
import { IdSchema } from "../schemas/id.schema";
import { FlightQuerySchema } from "../schemas/query/flightQuery.schema";
import { UpdateFlightSeatsSchema } from "../schemas/flight/updateFlightSeats.schema";

export const postFlightValidator = validationMiddleware(z.object({}), FlightSchema, z.object({}))
export type TPostFlight = typeof postFlightValidator

export const getFlightsValidator = validationMiddleware(z.object({}), z.object({}), FlightQuerySchema)
export type TGetFlights = typeof getFlightsValidator

export const updateFlightSeatsValidator = validationMiddleware(IdSchema, UpdateFlightSeatsSchema, z.object({}))
export type TUpdateFlightSeats = typeof updateFlightSeatsValidator