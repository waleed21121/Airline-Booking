import { z } from 'zod';


export const IdSchema = z.object({
    id: z.coerce.number({message: "The id must be of typer number"}).min(0, "The id must be positive integer")
});

export type IId = z.infer<typeof IdSchema>;