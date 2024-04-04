import React from 'react';

import { getMatches } from '@/app/api/matches/getMatches';
import { Match } from '@/types/match.types';
import MatchList from './MatchList';

const GamesPage = async () => {
  const matches: Match[] = await getMatches({
    isTesting: process.env.IS_TESTING.toLowerCase() === 'true',
    requestParams: {
      season: 2023,
      nextNumberOfMatches: 10,
      leagueId: 39,
    },
  });

  return (
    <section>
      <MatchList matches={matches} />
    </section>
  );
};

export default GamesPage;
