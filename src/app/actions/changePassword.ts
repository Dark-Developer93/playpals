'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const changePassword = async (
  resetPasswordToken: string,
  password: string,
): Promise<{ message: string; status: number }> => {
  const token = await prisma.resetPasswordToken.findUnique({
    where: {
      token: resetPasswordToken,
    },
    select: { id: true, userId: true, tokenExpiry: true, used: true },
  });

  if (!token) {
    return { message: 'Token Not found', status: 404 };
  }

  const { tokenExpiry, used } = token;
  const today = new Date();
  const isTokenExpired = used || today > tokenExpiry || !tokenExpiry;

  if (isTokenExpired) {
    return { message: 'Token has expierd', status: 500 };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    await prisma.user.update({
      where: {
        id: token.userId,
      },
      data: {
        password: passwordHash,
      },
    });

    await prisma.resetPasswordToken.update({
      where: {
        id: token.id,
      },
      data: {
        used: true,
      },
    });

    return { message: 'Password updated successfully', status: 200 };
  } catch (error) {
    return { message: 'Internal server error', status: 500 };
  }
};
