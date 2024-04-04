'use client';

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import formSchema from '@/lib/validationSchemas/resetPasswordSchema';
import { resetPassword } from '@/app/actions/resetPassword';
import { toast } from '../ui/use-toast';
import Icon from '../icon/Icon';

const ResetPasswordForm = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const emailConfirmForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isButtonDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setIsButtonDisabled(false);
            setCountdown(0);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isButtonDisabled]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsButtonDisabled(true);
    setCountdown(60);
    const { email } = values;
    const res = await resetPassword(email);
    if (res.status === 500) {
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
    }
  };

  const email = emailConfirmForm.watch('email');

  return (
    <div className="flex justify-center items-center h-lvh flex-col">
      <div className="shadow-xl border border-gray-100 p-4 md:p-16 md:w-96 w-64 flex flex-col gap-5 items-center">
        <Icon height="50" width="50" icon="logo" fill="#FF2300" />
        <div className=" flex flex-col gap-2">
          <h1 className="text-lg text-center font-bold">Reset Password</h1>
          <p className="text-sm">Enter your email to receive reset link</p>
        </div>
        <Form {...emailConfirmForm}>
          <form
            onSubmit={emailConfirmForm.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={emailConfirmForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="viuFull"
              disabled={!email || isButtonDisabled}
            >
              {isButtonDisabled ? `Resend in ${countdown} seconds` : 'Send'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
