import { useState } from 'react';
import PlayChrome from '../components/PlayChrome';
import { COLORS } from '../config/colors';
import { useAutoAdvance } from '../engine/useAutoAdvance';
import { pickNextColor } from '../engine/colorPicker';

// Shared by Call & Touch (open-ended), Beat the Clock (duration-capped),
// and React & Sprint (rep-count-capped) — same engine, different end condition.
// There's no mid-session tap to hang a summary off of, so exiting early (the
// X button) ends the session and shows the summary too, same as a natural end.
export default function PlayAuto({ gameId, config, onEnd }) {
  const [speed, setSpeed] = useState(config.speed);
  const colors = COLORS.filter((c) => config.activeColors.includes(c.id));

  const endMode = gameId === 'beat-clock' ? 'duration' : gameId === 'react-sprint' ? 'repCount' : 'none';
  const endValue = gameId === 'beat-clock' ? config.duration : gameId === 'react-sprint' ? config.repCount : null;

  const { value, endNow } = useAutoAdvance({
    speed,
    endMode,
    endValue,
    pickNext: (prev) => pickNextColor(colors, prev.id),
    initialValue: colors[0],
    onEnd: (result) => onEnd({ gameId, ...result }),
  });

  return (
    <PlayChrome
      background={value.hex}
      onExit={endNow}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
}
