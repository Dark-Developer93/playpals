import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .regex(/[^ ]/, 'Email cannot be empty')
    .regex(/^[^\s]*$/, 'Email cannot contain whitespace')
    .regex(/@/, 'Email must contain @')
    .regex(/.*@.*\..*/, 'Email must contain dot(.)'),
});

export default formSchema;
