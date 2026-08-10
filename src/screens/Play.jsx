import { useState } from 'react';
import { COLORS } from '../config/colors';
import { SPEED_ORDER, SPEED_SETTINGS } from '../config/engineConfig';
import { useReflexSession } from '../engine/useReflexSession';

const BLANK_BG = '#14161a';

export default function Play({ gameId, config, onExit, onEnd }) {
  const [speed, setSpeed] = useState(config.speed);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const colors = COLORS.filter((c) => config.activeColors.includes(c.id));

  const { phase, currentColor, handleTap } = useReflexSession({
    gameId,
    colors,
    speed,
    duration: config.duration,
    onEnd,
  });

  const background = phase === 'blank' ? BLANK_BG : currentColor.hex;

  return (
    <div
      className="play-screen"
      style={{ backgroundColor: background }}
      onClick={handleTap}
    >
      <button
        type="button"
        className="corner-button corner-button-left"
        onClick={(e) => {
          e.stopPropagation();
          onExit();
        }}
        aria-label="Exit to config"
      >
        &times;
      </button>

      <button
        type="button"
        className="corner-button corner-button-right"
        onClick={(e) => {
          e.stopPropagation();
          setShowSpeedMenu((s) => !s);
        }}
        aria-label="Adjust speed"
      >
        &#9881;
      </button>

      {showSpeedMenu && (
        <div className="speed-overlay" onClick={(e) => e.stopPropagation()}>
          <p className="speed-overlay-label">Speed</p>
          <div className="option-row">
            {SPEED_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                className={`option-pill${speed === key ? ' option-pill-active' : ''}`}
                onClick={() => {
                  setSpeed(key);
                  setShowSpeedMenu(false);
                }}
              >
                {SPEED_SETTINGS[key].label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
