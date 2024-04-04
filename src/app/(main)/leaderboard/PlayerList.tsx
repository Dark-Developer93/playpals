import Link from 'next/link';

import UserAvatar from '@/components/user-avatar/UserAvatar';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/lib/session';
import { getAllUsers } from '@/lib/data/getUserData';

const PlayerList = async () => {
  const users = await getAllUsers();
  const currentUser = await getCurrentUser();

  return (
    <ul className="flex flex-col gap-1 md:gap-2">
      {users.map((user, index) => (
        <li
          key={user.id}
          className={cn(
            'flex items-center py-2 px-4 text-white md:rounded-md bg-secondary',
            {
              'bg-primary': currentUser?.id === user.id,
            },
          )}
        >
          <span className="text-xl">{index + 1}</span>
          <Link href={`/profile/${user.id}`} className="flex items-center pl-8">
            <UserAvatar
              variant="white"
              firstName={user.firstName}
              lastName={user.lastName}
              username={user.username}
              showFullName={user.showFullName}
              image={user.image || undefined}
            />
          </Link>
          <span className="ml-auto text-right">{user.totalPoints}</span>
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;
