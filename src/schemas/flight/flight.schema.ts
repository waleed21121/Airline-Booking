import { z } from 'zod';

export const FlightSchema = z.object({
    flightNumber: z.string({message: "The flight number must be string."}).min(3, "The flight number must be al least 3 characters."),
    airplaneId: z.number({message: "The airplane ID must be an integer."}).min(1, "The price must be positive integer."),
    departureAirportId: z.string({message: "The departure Airport must be string."}).length(3, "The departure Airport must be string code of three characters."),
    arrivalAirportId:  z.string({message: "The arrival Airport must be string."}).length(3, "The arrival Airport must be string code of three characters."),
    arrivalTime: z.coerce.date({message: "The arrival date must be of an iso format: YYYY-MM_DDTHH:m::ssZ."}),
    departureTime: z.coerce.date({message: "The departure date must be of an iso format: YYYY-MM_DDTHH:m::ssZ."}),
    price: z.coerce.number({message: "The price must be an integer."}).min(1, "The price must be positive integer."),
    boardingGate: z.string({message: "The boarding gate must be string."}).min(3, "The boarding gate must be at least three characters."),
    totalSeats: z.coerce.number({message: "The total seats number must be an integer."}).min(1, "The total seats number must be positive integer."),
});

export type IFlight = z.infer<typeof FlightSchema>;