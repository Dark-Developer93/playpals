'use server';

import { User } from '@prisma/client';

export const updateUserShowFullName = async (
  userId: string,
): Promise<{
  message: string;
  status: number;
  user?: User;
}> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return { message: 'User not found!', status: 404 };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        showFullName: !user.showFullName,
      },
    });
    return {
      message: 'Your profile has been updated!',
      status: 200,
      user,
    };
  } catch (error) {
    return { message: 'Internal server error', status: 500 };
  }
};
