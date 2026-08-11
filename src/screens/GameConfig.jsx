import { useEffect, useState } from 'react';
import { COLORS } from '../config/colors';
import { CONE_COUNTS, DURATIONS, REP_COUNTS, SPEED_LEVELS } from '../config/engineConfig';

export default function GameConfig({ gameMode, initialConfig, onStart, onBack }) {
  const [coneCount, setConeCount] = useState(initialConfig.coneCount);
  const [activeColors, setActiveColors] = useState(initialConfig.activeColors);
  const [speed, setSpeed] = useState(initialConfig.speed);
  const [duration, setDuration] = useState(initialConfig.duration);
  const [repCount, setRepCount] = useState(initialConfig.repCount);
  const [noGoColor, setNoGoColor] = useState(initialConfig.noGoColor);

  const minColors = gameMode.minColors ?? 1;

  const toggleColor = (id) => {
    setActiveColors((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= minColors) return prev;
        return prev.filter((c) => c !== id);
      }
      return [...prev, id];
    });
  };

  // Keep the No-Go color valid if it gets toggled off.
  useEffect(() => {
    if (gameMode.id === 'go-no-go' && !activeColors.includes(noGoColor)) {
      setNoGoColor(activeColors[0]);
    }
  }, [gameMode.id, activeColors, noGoColor]);

  const handleStart = () => {
    onStart({ coneCount, activeColors, speed, duration, repCount, noGoColor });
  };

  return (
    <div className="screen game-config">
      <button type="button" className="back-link" onClick={onBack}>&larr; Games</button>
      <h1 className="config-title">{gameMode.name}</h1>

      <section className="config-section">
        <h2>Cone count</h2>
        <div className="option-row">
          {CONE_COUNTS.map((n) => (
            <button
              key={n}
              type="button"
              className={`option-pill${coneCount === n ? ' option-pill-active' : ''}`}
              onClick={() => setConeCount(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      <section className="config-section">
        <h2>Active colors{minColors > 1 ? ` (at least ${minColors})` : ''}</h2>
        <div className="color-row">
          {COLORS.map((color) => {
            const on = activeColors.includes(color.id);
            return (
              <button
                key={color.id}
                type="button"
                className={`color-swatch${on ? ' color-swatch-active' : ''}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => toggleColor(color.id)}
                aria-pressed={on}
                aria-label={color.label}
              >
                {!on && <span className="color-swatch-off" />}
              </button>
            );
          })}
        </div>
      </section>

      {gameMode.id === 'go-no-go' && (
        <section className="config-section">
          <h2>No-Go color</h2>
          <div className="color-row">
            {COLORS.filter((c) => activeColors.includes(c.id)).map((color) => (
              <button
                key={color.id}
                type="button"
                className={`color-swatch${noGoColor === color.id ? ' color-swatch-active' : ''}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setNoGoColor(color.id)}
                aria-pressed={noGoColor === color.id}
                aria-label={`${color.label} is the No-Go color`}
              >
                {noGoColor !== color.id && <span className="color-swatch-off" />}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="config-section">
        <h2>Speed</h2>
        <div className="option-row">
          {SPEED_LEVELS.map((lvl) => (
            <button
              key={lvl.id}
              type="button"
              className={`option-pill${speed === lvl.id ? ' option-pill-active' : ''}`}
              onClick={() => setSpeed(lvl.id)}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </section>

      {gameMode.id === 'beat-clock' && (
        <section className="config-section">
          <h2>Duration</h2>
          <div className="option-row">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                className={`option-pill${duration === d ? ' option-pill-active' : ''}`}
                onClick={() => setDuration(d)}
              >
                {d}s
              </button>
            ))}
          </div>
        </section>
      )}

      {gameMode.id === 'react-sprint' && (
        <section className="config-section">
          <h2>Reps</h2>
          <div className="option-row">
            {REP_COUNTS.map((n) => (
              <button
                key={n}
                type="button"
                className={`option-pill${repCount === n ? ' option-pill-active' : ''}`}
                onClick={() => setRepCount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </section>
      )}

      <button type="button" className="start-button" onClick={handleStart}>
        Start
      </button>
    </div>
  );
}
