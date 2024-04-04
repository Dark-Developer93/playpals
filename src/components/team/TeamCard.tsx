import React from 'react';

import Image from 'next/image';
import { Team } from '@/types/match.types';

const TeamCard = (props: Team) => {
  const { name, logo } = props;

  return (
    <div className="flex flex-col items-center gap-4 w-16 md:w-20">
      <Image
        src={logo}
        alt={`${name}'s flag`}
        width={75}
        height={75}
        className="rounded w-full"
      />
      <h4 className="text-white text-heading-xs truncate text-center w-24 md:w-40 md:whitespace-normal lg:w-52">
        {name}
      </h4>
    </div>
  );
};

export default TeamCard;
