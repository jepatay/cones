import { GAME_MODES } from '../config/gameModes';

export default function GameSelect({ onSelect }) {
  return (
    <div className="screen game-select">
      <h1 className="app-title">Cone Reflex Trainer</h1>
      <div className="tile-grid">
        {GAME_MODES.map((mode) => (
          <button
            key={mode.id}
            type="button"
            className={`tile${mode.available ? '' : ' tile-disabled'}`}
            onClick={() => mode.available && onSelect(mode.id)}
            disabled={!mode.available}
          >
            <span className="tile-icon" aria-hidden="true">{mode.icon}</span>
            <span className="tile-name">{mode.name}</span>
            <span className="tile-tagline">{mode.tagline}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
