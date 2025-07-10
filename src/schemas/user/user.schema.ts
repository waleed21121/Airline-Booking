import { z } from 'zod';

export const UserSchema = z.object({
    username: z.string({message: "The username must be a string."}).min(5, "The username must be at least 5 characters."),
    email: z.string({message: "The email must be a string."}).refine((email) => {
        return email.endsWith('@gmail.com')
    }, "The email must ends with: '@gmailcom'."),
    password: z.string({message: "The password must be a string."}).min(8, "The password must be at least 8 characters."),
    role: z.enum(['admin', 'user']).default('user').optional(),
    isVerified: z.boolean().default(false).optional(),
    verifyToken: z.string().optional()
});

export type IUser = z.infer<typeof UserSchema>;