import { useState } from 'react';
import { COLORS } from '../config/colors';
import { CONE_COUNTS, DURATIONS, SPEED_ORDER, SPEED_SETTINGS } from '../config/engineConfig';

export default function GameConfig({ gameMode, initialConfig, onStart, onBack }) {
  const [coneCount, setConeCount] = useState(initialConfig.coneCount);
  const [activeColors, setActiveColors] = useState(initialConfig.activeColors);
  const [speed, setSpeed] = useState(initialConfig.speed);
  const [duration, setDuration] = useState(initialConfig.duration);

  const toggleColor = (id) => {
    setActiveColors((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // at least 1 must stay on
        return prev.filter((c) => c !== id);
      }
      return [...prev, id];
    });
  };

  const handleStart = () => {
    onStart({ coneCount, activeColors, speed, duration });
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
        <h2>Active colors</h2>
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

      <section className="config-section">
        <h2>Speed</h2>
        <div className="option-row">
          {SPEED_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              className={`option-pill${speed === key ? ' option-pill-active' : ''}`}
              onClick={() => setSpeed(key)}
            >
              {SPEED_SETTINGS[key].label}
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

      <button type="button" className="start-button" onClick={handleStart}>
        Start
      </button>
    </div>
  );
}
