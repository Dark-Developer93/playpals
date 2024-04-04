export interface Team {
  id: number;
  logo: string;
  name: string;
  winner?: boolean;
}

type Predictions = {
  scorePrediction: {
    homeTeamScore: number;
    awayTeamScore: number;
  };
  winnerPrediction?: 'homeTeam' | 'awayTeam' | 'draw';
};

type Fixture = {
  id: number;
  date: string;
  timestamp: number;
  timezone?: string;
};

type Teams = {
  home: Team;
  away: Team;
};

type Goals = {
  home: number;
  away: number;
};

type Score = {
  halftime: Goals;
  fulltime: Goals;
  extratime: Goals | null;
  penality: Goals | null;
};

type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
};

export interface Match {
  fixture: Fixture;
  teams: Teams;
  league: League;
  score?: Score;
  goals?: Goals;
  usersPredictions?: Predictions[];
}
