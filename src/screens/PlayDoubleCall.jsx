import { useState } from 'react';
import PlayChrome from '../components/PlayChrome';
import { COLORS } from '../config/colors';
import { useAutoAdvance } from '../engine/useAutoAdvance';
import { pickNextPair } from '../engine/colorPicker';

export default function PlayDoubleCall({ config, onEnd }) {
  const [speed, setSpeed] = useState(config.speed);
  const colors = COLORS.filter((c) => config.activeColors.includes(c.id));

  const { value, endNow } = useAutoAdvance({
    speed,
    endMode: 'none',
    endValue: null,
    pickNext: (prev) => pickNextPair(colors, prev),
    initialValue: pickNextPair(colors, null),
    onEnd: (result) => onEnd({ gameId: 'double-call', ...result }),
  });

  return (
    <PlayChrome onExit={endNow} speed={speed} onSpeedChange={setSpeed}>
      <div className="double-call-split">
        <div className="double-call-half" style={{ backgroundColor: value[0].hex }} />
        <div className="double-call-half" style={{ backgroundColor: value[1].hex }} />
      </div>
    </PlayChrome>
  );
}
