import { NextResponse } from 'next/server';

import { hash } from 'bcrypt';

import prisma from '@/lib/prisma';
import userSchema from '@/lib/validationSchemas/registerSchema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, firstName, lastName, email, password, showFullName } =
      userSchema.parse(body);

    const isEmailExist = await prisma.user.findUnique({
      where: { email },
    });

    const isUsernameExist = await prisma.user.findUnique({
      where: { username },
    });

    if (isEmailExist || isUsernameExist)
      return NextResponse.json(
        {
          user: null,
          message: `This ${
            isEmailExist ? 'email' : 'username'
          } already exists! Try another one or login`,
        },
        { status: 409 },
      );

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        username,
        password: hashedPassword,
        showFullName,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: 'User registered successfully!' },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `internal server error` },
      { status: 500 },
    );
  }
}
