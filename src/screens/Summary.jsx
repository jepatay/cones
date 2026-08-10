export default function Summary({ gameId, result, onPlayAgain, onBackToGames }) {
  const isReactSprint = gameId === 'react-sprint';
  const isBeatClock = gameId === 'beat-clock';

  const repsCompleted = isBeatClock ? result.taps : result.reps;

  let avgMs = 0;
  let bestMs = 0;
  if (isReactSprint && result.times.length) {
    avgMs = Math.round(result.times.reduce((a, b) => a + b, 0) / result.times.length);
    bestMs = Math.round(Math.min(...result.times));
  }

  return (
    <div className="screen summary-screen">
      <h1 className="summary-title">Session Complete</h1>

      <div className="summary-stats">
        <div className="stat-card">
          <span className="stat-value">{repsCompleted}</span>
          <span className="stat-label">Reps completed</span>
        </div>

        {isReactSprint && (
          <>
            <div className="stat-card">
              <span className="stat-value">{avgMs}<small>ms</small></span>
              <span className="stat-label">Average reaction</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{bestMs}<small>ms</small></span>
              <span className="stat-label">Best reaction</span>
            </div>
          </>
        )}
      </div>

      <div className="summary-actions">
        <button type="button" className="start-button" onClick={onPlayAgain}>
          Play Again
        </button>
        <button type="button" className="secondary-button" onClick={onBackToGames}>
          Back to Games
        </button>
      </div>
    </div>
  );
}
