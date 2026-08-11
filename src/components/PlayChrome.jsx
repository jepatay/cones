import { useState } from 'react';
import { SPEED_LEVELS, getSpeedById } from '../config/engineConfig';

/**
 * Shared full-screen play chrome: the low-opacity exit button, the gear
 * icon + speed overlay, and the seconds-per-cue reference pill. Every game
 * mode renders its own color/content as children on top of this.
 */
export default function PlayChrome({ background, onExit, onTap, speed, onSpeedChange, children }) {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const currentSpeed = getSpeedById(speed);

  return (
    <div
      className="play-screen"
      style={background ? { backgroundColor: background } : undefined}
      onClick={onTap}
    >
      {children}

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

      <div className="speed-pill" aria-hidden="true">
        {currentSpeed.seconds.toFixed(1)}s
      </div>

      {showSpeedMenu && (
        <div className="speed-overlay" onClick={(e) => e.stopPropagation()}>
          <p className="speed-overlay-label">Speed</p>
          <div className="speed-row">
            {SPEED_LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                className={`option-pill${speed === lvl.id ? ' option-pill-active' : ''}`}
                onClick={() => {
                  onSpeedChange(lvl.id);
                  setShowSpeedMenu(false);
                }}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
