import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User as PrismaUser } from '@prisma/client';

import prisma from './prisma';

interface ExtendedUser extends PrismaUser {
  maxAge: number;
}

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const ONE_DAY = 24 * 60 * 60;
const MILLISECONDS_TO_SECONDS = 1000;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
  },
  pages: { signIn: '/login' },
  providers: [
    CredentialsProvider({
      name: 'sign in',

      credentials: {
        usernameOrEmail: {
          label: 'username or Email',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' },
      },
      async authorize(credentials) {
        if (!credentials?.usernameOrEmail || !credentials.password) {
          return null;
        }

        const prismaUser = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials.usernameOrEmail },
              { email: credentials.usernameOrEmail },
            ],
          },
        });

        if (!prismaUser)
          throw new Error('We don’t know this email or Username');

        const passwordMatch = await compare(
          credentials.password,
          prismaUser.password,
        );

        if (!passwordMatch)
          throw new Error('No match with email/username and password');

        const rememberMe = credentials.rememberMe === 'true';
        const maxAge = rememberMe ? THIRTY_DAYS : ONE_DAY;
        const sessionExpiry = new Date();
        sessionExpiry.setSeconds(
          sessionExpiry.getSeconds() + (rememberMe ? THIRTY_DAYS : ONE_DAY),
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userProfile } = prismaUser;

        return { ...userProfile, maxAge };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      if (user) {
        return {
          ...token,
          user: user as ExtendedUser,
        };
      }
      const { maxAge } = token.user as ExtendedUser;
      const newToken = {
        ...token,
        exp: Math.floor(Date.now() / MILLISECONDS_TO_SECONDS) + maxAge,
      };

      if (trigger === 'update') {
        return {
          ...newToken,
          ...session,
        };
      }

      return newToken;
    },
    session: async ({ token, session }) => {
      const { maxAge } = token.user as ExtendedUser;
      const updatedSession = {
        ...session,
        user: token.user,
        expires: new Date(
          Date.now() + maxAge * MILLISECONDS_TO_SECONDS,
        ).toISOString(),
      };

      return updatedSession;
    },
  },
};
