import React from 'react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from '../ui/avatar';

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  username: string;
  image?: string;
  variant: 'viuRed' | 'white' | 'midnightBlue';
  showFullName: boolean;
}

const UserAvatar = (props: UserAvatarProps) => {
  const { firstName, lastName, username, image, variant, showFullName } = props;

  return (
    <div className="flex place-items-center gap-3">
      <Avatar>
        <AvatarImage
          src={image || '/assets/images/default-user-avatar.png'}
          alt="User Avatar"
          height={40}
          width={40}
        />
      </Avatar>
      <span
        className={cn('text-xl font-semibold', {
          'text-primary': variant === 'viuRed',
          'text-primary-foreground': variant === 'white',
          'text-secondary': variant === 'midnightBlue',
        })}
      >
        {showFullName ? `${firstName} ${lastName}` : username}
      </span>
    </div>
  );
};

export default UserAvatar;
