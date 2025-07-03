import { z } from 'zod';

export const FlightQuerySchema = z.object({
    trip: z.string({message: "The trip must be string consists of the codes of the departure and the arrival airport of the following format: XXX-YYY."}).optional(),
    travellers: z.coerce.number({message: "The travellers must be number."}).min(1, "The travellers must be positive integer.").optional(),
    tripDate: z.coerce.date({message: "The trip date must be a date of the following format: YYYY-MM-DD."}).optional(),
    price: z.string({message: "The price must be string of consists of two prices of the following format: XXXX-YYYY."}).optional(),
    sort: z.string({message: "The sort parameter must be string."}).optional()
});

export type IFlightQuery = z.infer<typeof FlightQuerySchema>