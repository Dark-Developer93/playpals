'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';

import formSchema from '@/lib/validationSchemas/registerSchema';
import { useToast } from '@/components/ui/use-toast';
import ViuFormPanel from '@/components/viuFormPanel/ViuFormPanel';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const {
      email,
      firstName,
      lastName,
      password,
      username,
      acceptTermsAndConditions,
      confirmPassword,
      consentToContact,
      showFullName,
    } = values;

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          firstName,
          lastName,
          password,
          acceptTermsAndConditions,
          confirmPassword,
          consentToContact,
          showFullName,
        }),
      });

      const data: Promise<{ message: string }> = await response.json();

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: (await data).message,
          duration: 3000,
        });
      } else {
        toast({
          title: 'Success',
          description: (await data).message,
          duration: 3000,
          className: 'bg-green-500',
        });
        router.push('/login');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to register!',
        duration: 3000,
      });
    }
  };

  return (
    <ViuFormPanel
      link={{ href: '/login', text: 'LOGIN' }}
      pageHeader="Create an Account"
    >
      <RegisterForm onSubmit={onSubmit} />
    </ViuFormPanel>
  );
};

export default RegisterPage;
