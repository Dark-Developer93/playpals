const RulebookPage = () => {
  return (
    <div className="text-secondary">
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold"> PlayPals: Scoring System</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-lg font-bold">
          Master Your Predictions - Earn Big Points!
        </h2>

        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-2 text-base font-bold">Match Outcome</h3>
            <ul className="ml-4 list-disc">
              <li className="text-secondary/80">
                Correct Winner Prediction (3 points)
              </li>
              <li className="text-secondary/80">
                Incorrect Winner Prediction (0 points)
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-2 text-base font-bold">
              Match Result & Scoreline
            </h3>
            <ul className="ml-4 list-disc">
              <li className="text-secondary/80">
                Correct Score Prediction (10 points)
              </li>
              <li className="text-secondary/80">
                Correct Result, Incorrect Score (5 points)
              </li>
              <li className="text-secondary/80">Incorrect Result (0 points)</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-bold">
            Additional Considerations (Optional)
          </h3>
          <p className="text-secondary/80">
            These features can be added to enhance the scoring system:
          </p>
          <ul className="ml-4 list-disc">
            <li className="text-secondary/80">
              Difficulty Levels: Reward fewer points for predictable matches.
            </li>
            <li className="text-secondary/80">
              Bonus Points for Margin of Victory: Points for correctly
              predicting win margin.
            </li>
            <li className="text-secondary/80">
              Negative Points: Inaccurate predictions can incur penalty points
              (optional).
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RulebookPage;
