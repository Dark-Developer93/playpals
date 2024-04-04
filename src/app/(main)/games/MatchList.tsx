'use client';

import React, { useEffect, useState } from 'react';

import MatchCard from '@/components/match-card/MatchCard';
import { Match } from '@/types/match.types';

interface Props {
  matches: Match[];
}

const MatchList = ({ matches }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!matches || !matches.length) return <h1>No matches found!</h1>;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {isClient &&
        matches.map(({ fixture, teams, league }: Match) => (
          <MatchCard
            key={fixture.id}
            fixture={fixture}
            teams={teams}
            league={league}
          />
        ))}
    </div>
  );
};

export default MatchList;
