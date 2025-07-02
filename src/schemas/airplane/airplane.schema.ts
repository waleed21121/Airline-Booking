import { z } from 'zod';


export const AirplaneSchema = z.object({
    modelNumber: z.string({message: "The model number must be string."}).min(5, "The model number must be at least 5 characters."),
    capacity: z.coerce.number({message: "The capacity must be number"}).min(1, "The capacity must be psitive integer.").max(1500, "The capacit is very large, It must bet less than 1500 passengers.")
});

export type IAirplane = z.infer<typeof AirplaneSchema>;