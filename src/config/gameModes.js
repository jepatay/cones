// Every game mode the app knows about. All six are fully hands-off: colors
// change on a timer and the player reacts by touching a physical cone.
export const GAME_MODES = [
  {
    id: 'call-touch',
    name: 'Call & Touch',
    tagline: 'Colors change automatically, touch the matching cone',
    icon: '👆',
    engine: 'auto',
    minColors: 1,
    available: true,
  },
  {
    id: 'beat-clock',
    name: 'Beat the Clock',
    tagline: 'Same, but racing a countdown',
    icon: '⏱️',
    engine: 'auto',
    minColors: 1,
    available: true,
  },
  {
    id: 'react-sprint',
    name: 'React & Sprint',
    tagline: 'A fixed set of reps — sprint through the whole thing',
    icon: '⚡',
    engine: 'auto',
    minColors: 1,
    available: true,
  },
  {
    id: 'sequence-recall',
    name: 'Sequence Recall',
    tagline: 'Watch a growing pattern, then repeat it on the cones',
    icon: '🔢',
    engine: 'sequence',
    minColors: 2,
    available: true,
  },
  {
    id: 'double-call',
    name: 'Double Call',
    tagline: 'Two colors at once — touch both cones',
    icon: '✌️',
    engine: 'double',
    minColors: 2,
    available: true,
  },
  {
    id: 'go-no-go',
    name: 'Go / No-Go',
    tagline: 'Go on most colors, freeze on the No-Go color',
    icon: '🚦',
    engine: 'go-no-go',
    minColors: 2,
    available: true,
  },
];

export function getGameModeById(id) {
  return GAME_MODES.find((g) => g.id === id);
}
