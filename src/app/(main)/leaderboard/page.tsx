import PlayerList from './PlayerList';

const LeaderboardPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex  items-center bg-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold">PlayPals: Leaderboard</h1>
      </div>
      <p className="text-lg mx-4">
        In this page, you can see the leaderboard of the top players in the
        game. the highlighted player is the current player who is logged in. You
        can see the rank, player name and the points they have.
      </p>
      <div className="my-6 flex flex-col md:gap-4">
        <ul>
          <li className="bg-secondary flex items-center px-2 py-4 text-white md:rounded-md md:px-4 ">
            <span className="pr-6">RANK</span>
            <span>PLAYER</span>
            <span className="ml-auto text-right">POINTS</span>
          </li>
        </ul>
        <PlayerList />
      </div>
    </div>
  );
};

export default LeaderboardPage;
