import { z } from 'zod';

export const BookingSchema = z.object({
    flightId: z.coerce.number({message: "The flight id must be a number"}).min(1, "The flight id must be a positive integer."),
    userId: z.coerce.number({message: "The user id must be a number"}).min(1, "The user id must be a positive integer."),
    status: z.enum(['booked', 'cncelled', 'initiated', 'pending']).default('initiated').optional(),
    totalCost: z.coerce.number().optional(),
    noOfSeats: z.coerce.number({message: "The no. of seats must be a number"}).min(1, "The no. of seats must be a positive integer.")
});

export type IBooking = z.infer<typeof BookingSchema>;