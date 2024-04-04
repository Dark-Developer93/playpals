import UserAvatar from '@/components/user-avatar/UserAvatar';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/lib/session';
import { GET as getAllUsers } from '../../api/user/route';

const PlayerList = async () => {
  const { users } = await getAllUsers();
  const currentUser = await getCurrentUser();

  return (
    <ul className="md:space-y-2">
      {users?.map((user, index) => (
        <li
          key={user.id}
          className={cn(
            'flex items-center py-2 px-4 text-white md:rounded-md bg-secondary',
            {
              'bg-primary': currentUser.id === user.id,
            },
          )}
        >
          <span className="px-3 max-w-2 text-xl">{index + 1}</span>
          <div className="flex items-center pl-8">
            <UserAvatar
              variant="white"
              firstName={user.firstName}
              lastName={user.lastName}
              username={user.username}
              showFullName={user.showFullName}
              image={user.image || undefined}
            />
          </div>
          <span className="ml-auto text-right">{user.totalPoints}</span>
        </li>
      ))}
    </ul>
  );
};

export default PlayerList;
