import { useState } from 'react';
import PlayChrome from '../components/PlayChrome';
import { COLORS } from '../config/colors';
import { useSequenceSession } from '../engine/useSequenceSession';

const BLANK_BG = '#14161a';

export default function PlaySequence({ config, onEnd }) {
  const [speed, setSpeed] = useState(config.speed);
  const colors = COLORS.filter((c) => config.activeColors.includes(c.id));

  const { phase, playbackValue, currentRound, nailedIt, missedIt, endNow } = useSequenceSession({
    colors,
    speed,
    onEnd: (result) => onEnd({ gameId: 'sequence-recall', ...result }),
  });

  const background = phase === 'playback' ? (playbackValue ? playbackValue.hex : BLANK_BG) : BLANK_BG;

  return (
    <PlayChrome background={background} onExit={endNow} speed={speed} onSpeedChange={setSpeed}>
      <div className="round-pill" aria-hidden="true">{currentRound}</div>

      {phase === 'yourTurn' && (
        <div className="sequence-turn">
          <button type="button" className="sequence-btn sequence-btn-miss" onClick={missedIt} aria-label="Missed it">
            &times;
          </button>
          <button type="button" className="sequence-btn sequence-btn-hit" onClick={nailedIt} aria-label="Nailed it">
            &#10003;
          </button>
        </div>
      )}
    </PlayChrome>
  );
}
