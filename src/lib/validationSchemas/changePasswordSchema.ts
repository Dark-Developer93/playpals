import { z } from 'zod';

const formSchema = z
  .object({
    password: z
      .string()
      .regex(/[^ ]/, 'Password cannot be empty')
      .regex(/[A-Z]/, 'Password must contain at least one capital letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .regex(/[^ ]/, 'Confirm Password cannot be empty'),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  );

export default formSchema;
