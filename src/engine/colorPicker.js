// Never repeat the same color (or pair) twice in a row.
export function pickNextColor(colors, prevId) {
  if (colors.length === 1) return colors[0];
  let next = prevId;
  while (next === prevId) {
    next = colors[Math.floor(Math.random() * colors.length)].id;
  }
  return colors.find((c) => c.id === next);
}

function sameSet(a, b) {
  if (!a || !b) return false;
  return (a[0].id === b[0].id && a[1].id === b[1].id) || (a[0].id === b[1].id && a[1].id === b[0].id);
}

export function pickNextPair(colors, prevPair) {
  const tryPick = () => {
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  };
  let next = tryPick();
  while (colors.length > 2 && sameSet(next, prevPair)) {
    next = tryPick();
  }
  return next;
}
