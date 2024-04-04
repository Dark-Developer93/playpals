import React from 'react';
import Link from 'next/link';

import prisma from '@/lib/prisma';
import Icon from '@/components/icon/Icon';
import ChangePasswordForm from '@/components/change-password-form/ChangePasswordForm';
import ResetPasswordForm from '@/components/reset-password-form/ResetPasswordForm';

interface ResetPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  if (searchParams.token) {
    const token = await prisma.resetPasswordToken.findUnique({
      where: {
        token: searchParams.token as string,
      },
      select: { userId: true, used: true, tokenExpiry: true },
    });

    const today = new Date();
    const isTokenExpired =
      !token || !token.userId || token.used || today > token.tokenExpiry;
    if (isTokenExpired) {
      return (
        <div className="flex w-full h-lvh justify-center items-center p-10 gap-2">
          <div className="md:w-96 shadow-xl border border-gray-100 p-4 md:p-16 w-64 flex flex-col items-center gap-2">
            <Icon height="50" width="50" icon="logo" fill="#FF2300" />
            <p>
              Invalid token or token expired, please try again to reset your
              password
            </p>
            <Link href="/reset-password" className="text-primary underline">
              Back to Reset page.
            </Link>
          </div>
        </div>
      );
    }

    return (
      <ChangePasswordForm resetPasswordToken={searchParams.token as string} />
    );
  }
  return <ResetPasswordForm />;
};

export default ResetPasswordPage;
