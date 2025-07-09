import { z } from 'zod';


export const IdempotencyKeySchema = z.object({
    'idempotency-key': z.string({message: "The idempotency key must be a string"}).min(5, "The idempotency key must be at least 5 characters.")
});