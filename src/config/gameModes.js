// Every game mode the app knows about. Modes 4-6 are stubbed as "coming soon"
// so they slot into the same select/config/play flow once they're built.
export const GAME_MODES = [
  {
    id: 'call-touch',
    name: 'Call & Touch',
    tagline: 'See a color, tap when you react',
    icon: '👆',
    engine: 'tap',
    available: true,
  },
  {
    id: 'beat-clock',
    name: 'Beat the Clock',
    tagline: 'Colors keep coming — tap as many as you can',
    icon: '⏱️',
    engine: 'timed',
    available: true,
  },
  {
    id: 'react-sprint',
    name: 'React & Sprint',
    tagline: 'Same as Call & Touch, but we time every rep',
    icon: '⚡',
    engine: 'tap-timed',
    available: true,
  },
  {
    id: 'sequence-recall',
    name: 'Sequence Recall',
    tagline: 'Coming soon',
    icon: '🔢',
    engine: null,
    available: false,
  },
  {
    id: 'double-call',
    name: 'Double Call',
    tagline: 'Coming soon',
    icon: '✌️',
    engine: null,
    available: false,
  },
  {
    id: 'go-no-go',
    name: 'Go / No-Go',
    tagline: 'Coming soon',
    icon: '🚦',
    engine: null,
    available: false,
  },
];

export function getGameModeById(id) {
  return GAME_MODES.find((g) => g.id === id);
}
