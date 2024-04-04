/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { signOut, useSession } from 'next-auth/react';

import { cn } from '@/lib/utils';
import UserAvatar from '../user-avatar/UserAvatar';

interface Props {
  onClose: () => void;
}

const links = [
  {
    href: '/',
    text: 'HOME',
    position: 'top-[10rem] left-[3rem]',
  },
  { href: '/games', text: 'GAMES', position: 'top-[13rem] left-[2rem]' },
  { href: '/fourm', text: 'FOURM', position: 'top-[16rem] left-[1.5rem]' },
  { href: '/rulebook', text: 'RULEBOOK', position: 'top-[19rem] left-[2rem]' },
  {
    href: '/tournament',
    text: 'TOURNAMENT',
    position: 'top-[22rem] left-[3rem]',
  },
  {
    href: '/leaderboard',
    text: 'LEADERBOARD',
    position: 'top-[25rem] left-[4rem]',
  },
  {
    href: '/contact-and-support',
    text: 'CONTACT AND SUPPORT',
    position: 'top-[28rem] left-[8rem]',
  },
];

const Navbar = ({ onClose }: Props) => {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  return (
    <nav
      className="fixed top-0 left-0 z-50 bg-black/[.4] w-full h-lvh animate-fade-appear"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-full bg-primary text-white absolute  -top-28 -right-28 w-[550px] h-[550px] animate-show-menu max-sm:-right-52"
      >
        {session?.user && (
          <div className="flex flex-col absolute top-56 left-48 gap-4">
            <UserAvatar
              variant="white"
              firstName={session?.user.firstName}
              lastName={session?.user.lastName}
              username={session?.user.username}
              showFullName={session?.user.showFullName}
              image={session?.user.image}
            />
            <div className="text-xl font-semibold text-center">
              <p>Total Points: {session?.user.totalPoints}</p>
              <p>Rank: {session?.user.rank}</p>
            </div>
          </div>
        )}
        {links.map(({ href, text, position }) => (
          <Link
            key={text}
            onClick={onClose}
            href={href}
            className={cn(
              `absolute font-bold text-white hover:underline ${position} `,
              { 'text-secondary': pathname === href },
            )}
          >
            {text}
          </Link>
        ))}
        {status === 'authenticated' ? (
          <button
            className="absolute font-bold text-white hover:underline top-[31rem] left-[15rem]"
            onClick={() => signOut({ callbackUrl: '/login' })}
            type="button"
          >
            LOGOUT
          </button>
        ) : (
          <Link
            onClick={onClose}
            href="/login"
            className={cn(
              'absolute font-bold text-white hover:underline top-[31rem] left-[15rem]',
              { 'text-secondary': pathname === '/login' },
            )}
          >
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
