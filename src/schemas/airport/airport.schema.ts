import { z } from 'zod';
import { uppercaseCheck } from '../../utils';


export const AirportSchema = z.object({
    name: z.string({message: "The airport name must be string."}).min(5, "The airport name must be at least five caharacters."),
    code: z.string({message: "The airport code must be string."}).length(3, "The airport code must consist of 3 characters.").refine(uppercaseCheck),
    address: z.string({message: "The airport address must be string."}).optional(),
    cityID: z.number({message: "The airport address must be number."})
});

export type IAirport = z.infer<typeof AirportSchema>;