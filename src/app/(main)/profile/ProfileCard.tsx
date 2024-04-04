'use client';

import React from 'react';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

import { User } from '@prisma/client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { updateUserShowFullName } from '@/app/action/updateUserShowFullName';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  user: User;
}

const ProfileCard = ({ user }: Props) => {
  const { data: session, update: updateSession, status } = useSession();
  const isOwnProfile = session?.user.id === user.id;

  let displayFirstName = '';
  let displayLastName = '';
  if (isOwnProfile) {
    displayFirstName = session?.user.firstName;
    displayLastName = session?.user.lastName;
  } else if (user.showFullName) {
    displayFirstName = user.firstName;
    displayLastName = user.lastName;
  }

  const onCheckShowFullName = async () => {
    if (status === 'authenticated') {
      const response = await updateUserShowFullName(session.user.id);

      if (response.status !== 200) {
        toast({
          title: 'Error',
          description: response.message,
          variant: 'destructive',
          duration: 1500,
        });
      } else {
        toast({
          title: 'Success',
          description: response.message,
          duration: 1500,
          className: 'bg-green-500',
        });
        await updateSession({
          ...session,
          user: { ...session.user, showFullName: !session.user.showFullName },
        });
      }
    }
  };

  if (status === 'loading') {
    return (
      <section className="flex flex-col gap-3 rounded-3xl overflow-hidden shadow-lg md:w-3/4">
        <header className="w-full h-56 bg-gray-400" />
        <div className="flex flex-col gap-4 items-center p-6">
          <div className="-translate-y-1/3 flex flex-col gap-3 items-center">
            <Skeleton className="w-32 h-32 rounded-full" />
            <Skeleton className="p-4 w-80" />
            <Skeleton className="p-4 w-80" />
          </div>
          <Skeleton className="p-4 w-60" />
          <Skeleton className="p-4 w-60" />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3 rounded-3xl overflow-hidden shadow-lg md:w-3/4">
      <header className="w-full h-56 bg-gray-400" />
      <div className="flex flex-col gap-4 items-center p-6">
        <div className=" -translate-y-1/3 flex flex-col gap-3 items-center">
          {session?.user?.image || user?.image ? (
            <Avatar className="w-32 h-32 ">
              <AvatarImage
                src={isOwnProfile ? session?.user.image : user?.image}
                alt="user avatar"
              />
            </Avatar>
          ) : (
            <Image
              src="/assets/images/default-user-avatar.png"
              alt="user avatar"
              width={128}
              height={128}
              className="rounded-full"
            />
          )}
          <h2 className="text-4xl text-viuBlue font-extrabold">
            {displayFirstName} {displayLastName}
          </h2>
          <h3 className="text-3xl text-viuBlue">
            {`@${isOwnProfile ? session?.user.username : user.username}`}
          </h3>
          {isOwnProfile && (
            <div className="flex gap-2 items-center">
              <Checkbox
                checked={session?.user.showFullName}
                onCheckedChange={onCheckShowFullName}
                id="show-full-name"
              />
              <Label htmlFor="show-full-name">
                Show your full name in public
              </Label>
            </div>
          )}
        </div>

        <div className="flex w-full flex-grow flex-col justify-between items-center">
          <span className="text-xl text-viuBlue">
            Total Points:{' '}
            {isOwnProfile ? session?.user.totalPoints : user.totalPoints}
          </span>
          <span className="text-xl text-viuBlue">
            Rank: #{isOwnProfile ? session?.user.rank : user.rank}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
