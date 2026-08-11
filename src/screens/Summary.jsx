export default function Summary({ gameId, result, onPlayAgain, onBackToGames }) {
  const isGoNoGo = gameId === 'go-no-go';
  const isSequence = gameId === 'sequence-recall';

  return (
    <div className="screen summary-screen">
      <h1 className="summary-title">Session Complete</h1>

      <div className="summary-stats">
        {isSequence ? (
          <div className="stat-card">
            <span className="stat-value">{result.longestRound}</span>
            <span className="stat-label">Longest sequence</span>
          </div>
        ) : (
          <div className="stat-card">
            <span className="stat-value">{result.reps}</span>
            <span className="stat-label">Reps completed</span>
          </div>
        )}

        {isGoNoGo && (
          <>
            <div className="stat-card">
              <span className="stat-value">{result.goCount}</span>
              <span className="stat-label">Go colors</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{result.noGoCount}</span>
              <span className="stat-label">No-Go colors</span>
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
