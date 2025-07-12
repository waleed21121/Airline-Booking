import { z } from 'zod';

export const LoginUserSchema = z.object({
    email: z.string({message: "The email must be a string."}).refine((email) => {
        return email.endsWith('@gmail.com')
    }, "The email must ends with: '@gmailcom'."),
    password: z.string({message: "The password must be a string."}).min(8, "The password must be at least 8 characters.")
});

export type ILoginUser = z.infer<typeof LoginUserSchema>;