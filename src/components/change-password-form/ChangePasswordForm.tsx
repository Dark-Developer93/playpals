'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import formSchema from '@/lib/validationSchemas/changePasswordSchema';
import { changePassword } from '@/app/actions/changePassword';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';
import Icon from '../icon/Icon';

interface ChangePasswordFormProps {
  resetPasswordToken: string;
}

const ChangePasswordForm = ({
  resetPasswordToken,
}: ChangePasswordFormProps) => {
  const router = useRouter();

  const changePasswordForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { password } = values;

    const res = await changePassword(resetPasswordToken, password);
    if (res.status === 500 || res.status === 404) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: res.message,
        duration: 3000,
      });
    } else {
      toast({
        title: 'Success',
        description: res.message,
        duration: 10000,
        className: 'bg-green-500',
      });
      router.push('/login');
    }
  };

  return (
    <div className="flex justify-center items-center h-lvh flex-col gap-3">
      <div className="md:w-96 shadow-xl border border-gray-100 p-4 md:p-16 w-64 flex flex-col items-center gap-2">
        <Icon height="50" width="50" icon="logo" fill="#FF2300" />
        <h1 className="text-lg text-center text-secondary">
          Set Your New Password
        </h1>
        <Form {...changePasswordForm}>
          <form
            onSubmit={changePasswordForm.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={changePasswordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your new password"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={changePasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm your Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="viuFull">
              Reset
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
