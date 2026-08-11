import { useCallback, useEffect, useRef, useState } from 'react';
import { intervalMsForSpeed } from '../config/engineConfig';

/**
 * Shared timer-driven engine for every hands-off mode (Call & Touch, Beat
 * the Clock, React & Sprint, Double Call, Go/No-Go). A cue is shown, and
 * after `speed`'s interval elapses it's replaced by whatever `pickNext`
 * returns — no tap required, since the player reacts on a physical cone.
 *
 * endMode: 'none' (runs until endNow() is called) | 'duration' (seconds) |
 * 'repCount' (number of completed cues).
 */
export function useAutoAdvance({ speed, endMode, endValue, pickNext, initialValue, onEnd }) {
  const intervalMs = intervalMsForSpeed(speed);

  const [value, setValue] = useState(initialValue);
  const [reps, setReps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(endMode === 'duration' ? endValue : null);

  const valueRef = useRef(initialValue);
  const repsRef = useRef(0);
  const timeLeftRef = useRef(endValue);
  const endedRef = useRef(false);
  // onEnd/pickNext are recreated every render by the caller; read the latest
  // via ref so `finish` (and the interval effect below) can stay stable
  // instead of tearing down and rebuilding the timers on every tick.
  const onEndRef = useRef(onEnd);
  const pickNextRef = useRef(pickNext);
  onEndRef.current = onEnd;
  pickNextRef.current = pickNext;

  const finish = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    onEndRef.current({ reps: repsRef.current });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      repsRef.current += 1;
      setReps(repsRef.current);

      if (endMode === 'repCount' && repsRef.current >= endValue) {
        clearInterval(timer);
        finish();
        return;
      }

      const next = pickNextRef.current(valueRef.current);
      valueRef.current = next;
      setValue(next);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs, endMode, endValue, finish]);

  useEffect(() => {
    if (endMode !== 'duration') return undefined;
    // Side effects (the finish() call, clearing the interval) live in the
    // setInterval callback itself, not in a setState updater function —
    // React may invoke updater functions outside the normal commit cycle,
    // so they need to stay pure.
    timeLeftRef.current = endValue;
    const countdown = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        clearInterval(countdown);
        finish();
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [endMode, endValue, finish]);

  const endNow = useCallback(() => finish(), [finish]);

  return { value, reps, timeLeft, intervalMs, endNow };
}
