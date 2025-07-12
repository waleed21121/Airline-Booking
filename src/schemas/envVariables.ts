import {z} from 'zod';

const EnvSchema = z.object({
    PORT: z.coerce.number().int(),
    DIALECT: z.string().default('postgres'),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.coerce.number().int().default(5432),
    DB_NAME: z.string().default('Airport'),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    NODE_ENV: z.string().default('development'),
    PUBLIC_KEY: z.string(),
    PRIVATE_KEY: z.string(),
    APP_PASSWORD: z.string(),
    EMAIL_SERVICE: z.string(),
    SENDER_EMAIL: z.string(),
    SERVER_URL: z.string(),
});

export default EnvSchema