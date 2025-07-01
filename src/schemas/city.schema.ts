import { z } from 'zod';


export const CitySchema = z.object({
    name: z.string({message: "The city name must be a string."}).trim().min(4, 'The name must be at least 4 characters.')
});

export type ICity = z.infer<typeof CitySchema>;