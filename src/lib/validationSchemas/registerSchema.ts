import { z } from 'zod';

const maxCharsInNames = 50;
const maxCharsInUsername = 15;

const formSchema = z
  .object({
    firstName: z
      .string()
      .regex(/[^ ]/, 'First Name cannot be empty')
      .regex(
        /^[a-zA-Z]+$/,
        'First Name must contain only alphabetic characters.',
      )
      .max(
        maxCharsInNames,
        `First name must not exceed ${maxCharsInNames} characters`,
      ),
    lastName: z
      .string()
      .regex(/[^ ]/, 'Last Name cannot be empty')
      .regex(
        /^[a-zA-Z]+$/,
        'Last Name must contain only alphabetic characters.',
      )
      .max(
        maxCharsInNames,
        `Last name must not exceed ${maxCharsInNames} characters`,
      ),
    username: z
      .string()
      .regex(/[^ ]/, 'Username cannot be empty')
      .regex(/^[^\s]*$/, 'Username cannot contain whitespace')
      .max(
        maxCharsInUsername,
        `Username must not exceed ${maxCharsInUsername} characters`,
      ),
    email: z
      .string()
      .regex(/[^ ]/, 'Email cannot be empty')
      .regex(/^[^\s]*$/, 'Email cannot contain whitespace')
      .regex(/@/, 'Email must contain @')
      .regex(/.*@.*\..*/, 'Email must contain dot(.)'),
    password: z
      .string()
      .regex(/[^ ]/, 'Password cannot be empty')
      .regex(/[A-Z]/, 'Password must contain at least one capital letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .regex(/[^ ]/, 'Confirm Password cannot be empty'),
    acceptTermsAndConditions: z.boolean().default(false),
    consentToContact: z.boolean().default(false),
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
