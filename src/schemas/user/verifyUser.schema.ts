import { z } from 'zod';

export const VerifyUserSchema = z.object({
    email: z.string({message: "The email must be a string."}).refine((email) => {
        return email.endsWith('@gmail.com')
    }, "The email must ends with: '@gmail.com'."),
    token: z.string({message: "The token must be a string."})
});

export type IVerifyUser = z.infer<typeof VerifyUserSchema>;