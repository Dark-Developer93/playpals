import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import formSchema from '@/lib/validationSchemas/registerSchema';
import PasswordValidationInfo from './PasswordValidationInfo';

type RegisterFieldType = {
  placeholder: string;
  name:
    | 'email'
    | 'password'
    | 'firstName'
    | 'lastName'
    | 'username'
    | 'confirmPassword';
  type: 'text' | 'email' | 'password';
};

const fields: RegisterFieldType[] = [
  { placeholder: 'First Name', name: 'firstName', type: 'text' },
  { placeholder: 'Last Name', name: 'lastName', type: 'text' },
  { placeholder: 'Username', name: 'username', type: 'text' },
  { placeholder: 'Email', name: 'email', type: 'text' },
  { placeholder: 'Password', name: 'password', type: 'password' },
  {
    placeholder: 'Confirm the Password',
    name: 'confirmPassword',
    type: 'password',
  },
];

interface Props {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}

const RegisterForm = (props: Props) => {
  const { onSubmit } = props;
  const [currentErrorField, setCurrentErrorField] = useState<string | null>(
    null,
  );

  const registerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTermsAndConditions: false,
      consentToContact: false,
    },
  });

  const acceptTermsAndConditions = registerForm.watch(
    'acceptTermsAndConditions',
  );

  const consentToContact = registerForm.watch('consentToContact');

  const {
    formState: { errors },
  } = registerForm;

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
      >
        {fields.map((registerField) => (
          <FormField
            key={registerField.name}
            control={registerForm.control}
            name={registerField.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {registerField.name === 'password' ? (
                    <PasswordValidationInfo>
                      <Input
                        placeholder={registerField.placeholder}
                        type={registerField.type}
                        {...field}
                        onFocus={() => setCurrentErrorField(registerField.name)}
                      />
                    </PasswordValidationInfo>
                  ) : (
                    <Input
                      placeholder={registerField.placeholder}
                      type={registerField.type}
                      {...field}
                      onFocus={() => setCurrentErrorField(registerField.name)}
                    />
                  )}
                </FormControl>
                {currentErrorField === registerField.name &&
                  errors[registerField.name] && (
                    <FormMessage>
                      {errors[registerField.name]?.message}
                    </FormMessage>
                  )}
              </FormItem>
            )}
          />
        ))}

        <FormField
          control={registerForm.control}
          name="acceptTermsAndConditions"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row-reverse justify-end items-center gap-3">
                <FormLabel className="cursor-pointer">
                  I have read and agree to the{' '}
                  <Link
                    href="/privacy-and-policy"
                    className="underline"
                    target="_blank"
                  >
                    Terms and Conditions
                  </Link>
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={registerForm.control}
          name="consentToContact"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row-reverse justify-end items-center gap-3">
                <FormLabel className="cursor-pointer">
                  viu may contact you in a context other than this game.
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="viuFull"
          disabled={!acceptTermsAndConditions || !consentToContact}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
