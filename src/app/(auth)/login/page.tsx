'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import Link from 'next/link';
import formSchema from '@/lib/validationSchemas/loginSchema';
import { toast } from '@/components/ui/use-toast';
import ViuFormPanel from '@/components/viuFormPanel/ViuFormPanel';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { usernameOrEmail, password, rememberMe } = values;

    const signInData = await signIn('credentials', {
      usernameOrEmail,
      password,
      rememberMe,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: signInData.error,
        duration: 2000,
      });
    } else {
      router.push('/');
    }
  };

  return (
    <ViuFormPanel
      link={{ href: '/register', text: 'REGISTER' }}
      pageHeader="LOGIN"
    >
      <LoginForm onSubmit={onSubmit} />
      <Link href="/reset-password" className="text-primary text-sm underline">
        Forgot your password?
      </Link>
    </ViuFormPanel>
  );
};

export default LoginPage;
