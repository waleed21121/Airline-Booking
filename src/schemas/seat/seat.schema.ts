import { z } from 'zod';


export const SeatSchema = z.object({
    airplaneId: z.coerce.number({message: "The airplane id must be a number."}).min(1, "The ariplane number must be a positive integer."),
    row: z.coerce.number({message: "The row must be a number."}).min(1, "The row must be a positive integer.").max(200, "No airplane has more than 200 rows."),
    col: z.string({message: "The column must be string"}).length(1, "The column must be a single character."),
    type: z.enum(['businuss', 'economy', 'premium-economy', 'first-class'], {message: "The type of seat must be one of the following values: businuss, economy, premium-economy, first-class"}).default("economy")
});

export type ISeat = z.infer<typeof SeatSchema>;