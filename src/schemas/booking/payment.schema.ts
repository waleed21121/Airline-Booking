import { z } from 'zod';

export const PaymentSchema = z.object({
    bookingId: z.coerce.number({message: "The booking id must be a number."}).min(1, "The booking id must be a positive integer."),
    userId: z.coerce.number({message: "The user id must be a number."}).min(1, "The user id must be a positive integer."),
    totalCost: z.coerce.number({message: "The total cost must be a number."}).min(1, "The total cost must be a positive integer.")
});

export type IPyament = z.infer<typeof PaymentSchema>;