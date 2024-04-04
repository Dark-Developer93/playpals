import { z } from 'zod';

const formSchema = z.object({
  usernameOrEmail: z
    .string()
    .regex(/[^ ]/, 'Username or Email cannot be empty')
    .regex(/^[^\s]*$/, 'Username or Email cannot contain whitespace'),
  password: z.string().regex(/[^ ]/, 'Password cannot be empty'),
  rememberMe: z.boolean().default(false),
});

export default formSchema;
