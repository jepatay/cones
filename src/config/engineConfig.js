// Tunable knobs for the reflex engine. Change these numbers to retune feel
// without touching any game logic. Every mode is fully hands-off: colors
// change automatically on a timer, since players react by touching a
// physical cone, not the screen.
export const SPEED_LEVELS = [
  { id: '1', label: '1', seconds: 4.0 },
  { id: '2', label: '2', seconds: 3.0 },
  { id: '3', label: '3', seconds: 2.0 },
  { id: '4', label: '4', seconds: 1.5 },
  { id: '5', label: '5', seconds: 1.0 },
];

export function getSpeedById(id) {
  return SPEED_LEVELS.find((s) => s.id === id);
}

export function intervalMsForSpeed(id) {
  return getSpeedById(id).seconds * 1000;
}

export const CONE_COUNTS = [4, 8, 12, 16];

export const DURATIONS = [30, 60, 90];

export const REP_COUNTS = [10, 20, 30];

export const DEFAULT_CONFIG = {
  coneCount: 4,
  activeColors: ['red', 'orange', 'yellow', 'green'],
  speed: '3',
  duration: 30, // Beat the Clock
  repCount: 20, // React & Sprint
  noGoColor: 'red', // Go / No-Go
};
