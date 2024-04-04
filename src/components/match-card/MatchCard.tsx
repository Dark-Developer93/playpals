import React from 'react';

import TeamCard from '@/components/team/TeamCard';
import { Match } from '@/types/match.types';

const MILISECONDSTOSECONDS = 1000;

const MatchCard = (props: Match) => {
  const { fixture, teams, league } = props;
  const { timestamp } = fixture;
  const { home, away } = teams;

  const matchDate = new Date(timestamp * MILISECONDSTOSECONDS);

  return (
    <section className="flex flex-col items-center gap-2 text-white bg-secondary py-4 px-6 rounded-xl w-full">
      <h4 className="text-body-s md:text-heading-xs-mobile">{league.name}</h4>
      <div className="self-stretch">
        <div className="flex items-center justify-evenly self-stretch gap-4">
          <TeamCard {...home} />
          <h3 className="text-heading-s">VS</h3>
          <TeamCard {...away} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-body">
          {matchDate.toLocaleDateString('en-us', {
            dateStyle: 'medium',
          })}
        </span>
        <span className="text-body-s">
          {matchDate.toLocaleTimeString('en-us', {
            timeStyle: 'short',
          })}
        </span>
      </div>
    </section>
  );
};

export default MatchCard;
