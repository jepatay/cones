// The exact cone colors the player owns.
export const COLORS = [
  { id: 'red', label: 'Red', hex: '#E8341E' },
  { id: 'orange', label: 'Orange', hex: '#F5820C' },
  { id: 'yellow', label: 'Yellow', hex: '#F5C400' },
  { id: 'green', label: 'Green', hex: '#8CC63F' },
];

export function getColorById(id) {
  return COLORS.find((c) => c.id === id);
}
