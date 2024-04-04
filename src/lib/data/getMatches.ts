// from and to requestParams should always be used together.
// season most of the time is required, that's why we set a default value with the current year if not provided.
// any date must be in this formatting yyyy-mm-dd.

type RequestParams = {
  date?: string;
  fromDate?: string;
  lastNumberOfMatches?: number;
  leagueId?: number;
  nextNumberOfMatches?: number;
  season: number;
  toDate?: string;
};

interface Params {
  isTesting: boolean;
  requestParams: RequestParams;
  sortingOrder?: 'asc' | 'desc';
}

export async function getMatches({
  isTesting,
  requestParams,
  sortingOrder,
}: Params) {
  const league = requestParams?.leagueId
    ? `&league=${requestParams.leagueId}`
    : '';
  const last = requestParams?.lastNumberOfMatches
    ? `&last=${requestParams.lastNumberOfMatches}`
    : '';
  const next = requestParams?.nextNumberOfMatches
    ? `&next=${requestParams.nextNumberOfMatches}`
    : '';
  const from = requestParams?.fromDate ? `&from=${requestParams.fromDate}` : '';
  const to = requestParams?.toDate ? `&to=${requestParams.toDate}` : '';
  const date = requestParams?.date ? `&date=${requestParams.date}` : '';

  const url = `${
    isTesting
      ? 'https://v3.football.api-sports.io'
      : 'https://api-football-v1.p.rapidapi.com/v3'
  }/fixtures?season=${
    requestParams.season
  }${date}${league}${from}${to}${last}${next}`;

  const headers = isTesting
    ? { 'x-apisports-key': process.env.API_SPORTS_KEY }
    : {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST,
      };

  const options = {
    method: 'GET',
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(
      `Internal Server Error fetching matches: ${res.statusText}`,
    );
  }

  const { response } = await res.json();
  return sortingOrder === 'desc' ? response.reverse() : response;
}
