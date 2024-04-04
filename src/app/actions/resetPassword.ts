'use server';

import crypto from 'crypto';
import { render } from '@react-email/render';

import prisma from '@/lib/prisma';
import { ResetPassword } from '@/components/email-template/ResetPassword';
import { sendEmail } from './sendEmail';

export const resetPassword = async (
  email: string,
): Promise<{ message: string; status: number }> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: { id: true, firstName: true },
  });

  if (!user)
    return {
      message:
        'If this email-address is registered, you will receive the email with reset link',
      status: 200,
    };

  const resetPasswordToken = crypto.randomBytes(32).toString('base64url');
  const today = new Date();
  const expiryDate = new Date(today.setDate(today.getDate() + 1)); // 24 hours from now

  try {
    await prisma.resetPasswordToken.create({
      data: {
        token: resetPasswordToken,
        tokenExpiry: expiryDate,
        userId: user.id,
      },
    });

    await sendEmail({
      to: email,
      subject: 'Reset your password',
      html: render(
        ResetPassword({
          email,
          resetPasswordToken,
          firstName: user.firstName,
        }) as React.ReactElement,
      ),
    });

    return {
      message:
        'If this email-address is registered, you will receive the email with reset link',
      status: 200,
    };
  } catch (error) {
    return {
      message: 'Internal server error',
      status: 500,
    };
  }
};
