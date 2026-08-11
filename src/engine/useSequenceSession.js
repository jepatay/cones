import { useCallback, useEffect, useRef, useState } from 'react';
import { intervalMsForSpeed } from '../config/engineConfig';
import { pickNextColor } from './colorPicker';

const BLANK_GAP_MS = 150;

/**
 * Sequence Recall: replay a growing pattern of colors, then the player
 * attempts it from memory on the physical cones and self-reports whether
 * they nailed it or missed. There's no sensor on the cones, so this is the
 * one place a tap is unavoidable — it's confirming a completed physical
 * attempt, not reacting to a single cue.
 */
export function useSequenceSession({ colors, speed, onEnd }) {
  const intervalMs = intervalMsForSpeed(speed);
  const [sequence, setSequence] = useState(() => [pickNextColor(colors, null)]);
  const [phase, setPhase] = useState('playback'); // 'playback' | 'yourTurn'
  const [playbackValue, setPlaybackValue] = useState(null);

  const endedRef = useRef(false);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const finish = useCallback((longestRound) => {
    if (endedRef.current) return;
    endedRef.current = true;
    onEndRef.current({ longestRound });
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;
    let i = 0;

    const showStep = () => {
      if (cancelled) return;
      if (i >= sequence.length) {
        setPlaybackValue(null);
        setPhase('yourTurn');
        return;
      }
      setPlaybackValue(sequence[i]);
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        setPlaybackValue(null);
        i += 1;
        timeoutId = setTimeout(showStep, BLANK_GAP_MS);
      }, intervalMs);
    };

    setPhase('playback');
    showStep();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [sequence, intervalMs]);

  const nailedIt = useCallback(() => {
    setSequence((prev) => [...prev, pickNextColor(colors, prev[prev.length - 1].id)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  const missedIt = useCallback(() => {
    finish(sequence.length - 1);
  }, [finish, sequence.length]);

  const endNow = useCallback(() => {
    finish(sequence.length - 1);
  }, [finish, sequence.length]);

  return {
    phase,
    playbackValue,
    currentRound: sequence.length,
    nailedIt,
    missedIt,
    endNow,
  };
}
