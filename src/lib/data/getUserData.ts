import prisma from '@/lib/prisma';

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        totalPoints: 'desc',
      },
    });
    return [...users];
  } catch (error) {
    throw new Error(`Internal Server Error fetching users: ${error}`);
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Internal Server Error fetching user: ${error}`);
  }
}
