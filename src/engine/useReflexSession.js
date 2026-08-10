import { useCallback, useEffect, useRef, useState } from 'react';
import { SPEED_SETTINGS } from '../config/engineConfig';

function pickNextColor(colors, prevId) {
  if (colors.length === 1) return colors[0];
  let next = prevId;
  while (next === prevId) {
    next = colors[Math.floor(Math.random() * colors.length)].id;
  }
  return colors.find((c) => c.id === next);
}

/**
 * Shared "flash a color, wait, repeat" engine for Call & Touch, React & Sprint,
 * and Beat the Clock. `speed` may change mid-session (live speed overlay).
 */
export function useReflexSession({ gameId, colors, speed, duration, onEnd }) {
  const isTimed = gameId === 'beat-clock';
  const isReactSprint = gameId === 'react-sprint';
  const intervalMs = SPEED_SETTINGS[speed].intervalMs;

  const [phase, setPhase] = useState('cue'); // 'cue' | 'blank'
  const [currentColor, setCurrentColor] = useState(() => pickNextColor(colors, null));
  const [reps, setReps] = useState(0);
  const [times, setTimes] = useState([]);
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration ?? 0);

  const cueStartRef = useRef(performance.now());
  const tappedThisCueRef = useRef(false);
  const blankTimeoutRef = useRef(null);
  const endedRef = useRef(false);

  const finish = useCallback(
    (extra) => {
      if (endedRef.current) return;
      endedRef.current = true;
      onEnd({ gameId, reps, times, taps, ...extra });
    },
    [onEnd, gameId, reps, times, taps],
  );

  // Beat the Clock: colors auto-advance on a fixed interval, independent of taps.
  useEffect(() => {
    if (!isTimed) return undefined;
    tappedThisCueRef.current = false;
    const colorTimer = setInterval(() => {
      tappedThisCueRef.current = false;
      setCurrentColor((prev) => pickNextColor(colors, prev.id));
    }, intervalMs);
    return () => clearInterval(colorTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimed, intervalMs]);

  useEffect(() => {
    if (!isTimed) return undefined;
    const countdown = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [isTimed]);

  useEffect(() => {
    if (isTimed && timeLeft === 0) {
      finish({});
    }
  }, [isTimed, timeLeft, finish]);

  useEffect(() => () => clearTimeout(blankTimeoutRef.current), []);

  const handleTap = useCallback(() => {
    if (isTimed) {
      if (!tappedThisCueRef.current) {
        tappedThisCueRef.current = true;
        setTaps((t) => t + 1);
      }
      return;
    }
    if (phase !== 'cue') return;

    const reactionMs = performance.now() - cueStartRef.current;
    setReps((r) => r + 1);
    if (isReactSprint) setTimes((t) => [...t, reactionMs]);
    setPhase('blank');

    blankTimeoutRef.current = setTimeout(() => {
      setCurrentColor((prev) => pickNextColor(colors, prev.id));
      cueStartRef.current = performance.now();
      setPhase('cue');
    }, SPEED_SETTINGS[speed].intervalMs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isTimed, isReactSprint, colors, speed]);

  return { phase, currentColor, reps, taps, timeLeft, handleTap };
}
