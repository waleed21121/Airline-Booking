import { z } from 'zod';


export const UpdateFlightSeatsSchema = z.object({
    seats: z.coerce.number({message: "The seats must be a number."}). min(1, "The seats must be positive integer."),
    dec: z.coerce.boolean({message: "The decrement flag must be a boolean value"}).default(true).optional()
});

export type IUpdateFlightSeats = z.infer<typeof UpdateFlightSeatsSchema>;