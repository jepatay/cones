import { useEffect, useRef, useState } from 'react';
import PlayChrome from '../components/PlayChrome';
import { COLORS } from '../config/colors';
import { useAutoAdvance } from '../engine/useAutoAdvance';
import { pickNextColor } from '../engine/colorPicker';

export default function PlayGoNoGo({ config, onEnd }) {
  const [speed, setSpeed] = useState(config.speed);
  const colors = COLORS.filter((c) => config.activeColors.includes(c.id));

  const goCountRef = useRef(0);
  const noGoCountRef = useRef(0);

  const { value, endNow } = useAutoAdvance({
    speed,
    endMode: 'none',
    endValue: null,
    pickNext: (prev) => pickNextColor(colors, prev.id),
    initialValue: colors[0],
    onEnd: (result) =>
      onEnd({
        gameId: 'go-no-go',
        ...result,
        goCount: goCountRef.current,
        noGoCount: noGoCountRef.current,
      }),
  });

  const isNoGo = value.id === config.noGoColor;

  useEffect(() => {
    if (value.id === config.noGoColor) noGoCountRef.current += 1;
    else goCountRef.current += 1;
  }, [value, config.noGoColor]);

  return (
    <PlayChrome background={value.hex} onExit={endNow} speed={speed} onSpeedChange={setSpeed}>
      {isNoGo && (
        <svg className="no-go-symbol" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="38" fill="none" stroke="#fff" strokeWidth="8" />
          <line x1="24" y1="24" x2="76" y2="76" stroke="#fff" strokeWidth="8" />
        </svg>
      )}
    </PlayChrome>
  );
}
