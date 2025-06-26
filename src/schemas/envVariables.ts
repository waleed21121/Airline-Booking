import {z} from 'zod';

const EnvSchema = z.object({
    PORT: z.coerce.number().int()
})

export default EnvSchema