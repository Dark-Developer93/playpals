import React from 'react';

import { getUserById } from '@/lib/data/getUserData';
import ProfileCard from '../ProfileCard';

interface props {
  params: {
    userId: string;
  };
}

const ProfilePage = async ({ params }: props) => {
  const user = await getUserById(params.userId);

  return (
    <div className="flex flex-col md:gap-4 items-center">
      <ProfileCard user={user} />
    </div>
  );
};

export default ProfilePage;
