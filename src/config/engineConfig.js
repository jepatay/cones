// Tunable knobs for the reflex engine. Change these numbers to retune feel
// without touching any game logic.
export const SPEED_SETTINGS = {
  slow: { label: 'Slow', intervalMs: 3000 },
  medium: { label: 'Medium', intervalMs: 2000 },
  fast: { label: 'Fast', intervalMs: 1000 },
};

export const SPEED_ORDER = ['slow', 'medium', 'fast'];

export const CONE_COUNTS = [4, 8, 12, 16];

export const DURATIONS = [30, 60, 90];

export const DEFAULT_CONFIG = {
  coneCount: 4,
  activeColors: ['red', 'orange', 'yellow', 'green'],
  speed: 'medium',
  duration: 30,
};
