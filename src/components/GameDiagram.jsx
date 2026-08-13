// Simple picture for each game, aimed at a kid reading it before they play.
// One color, one cone, one arrow — the picture shows the single thing that
// matters, and the caption says it in plain words.
const RED = '#E8341E';
const ORANGE = '#F5820C';
const YELLOW = '#F5C400';
const GREEN = '#8CC63F';
const DIM = '#9aa1ad';
const INK = '#f3f4f6';
const SURFACE_2 = '#171b22';
const ACCENT = '#3a6df0';

function RepeatBadge({ cx, cy }) {
  return (
    <>
      <circle cx={cx} cy={cy} r="15" fill={SURFACE_2} stroke="currentColor" strokeWidth="2" />
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize="17" fill="currentColor">&#8635;</text>
    </>
  );
}

function Swatch({ x, y, size = 72, color, repeat }) {
  return (
    <>
      <rect x={x} y={y} width={size} height={size} rx="16" fill={color} />
      {repeat && <RepeatBadge cx={x + size - 2} cy={y + 2} />}
    </>
  );
}

function Cone({ cx, baseY, size = 100, color }) {
  const halfW = size * 0.4;
  const topW = size * 0.1;
  const top = baseY - size;
  const stripeY = baseY - size * 0.4;
  return (
    <>
      <polygon points={`${cx - halfW},${baseY} ${cx + halfW},${baseY} ${cx + topW},${top} ${cx - topW},${top}`} fill={color} />
      <rect x={cx - halfW * 0.62} y={stripeY - 5} width={halfW * 1.24} height="10" rx="2" fill="#fff" opacity="0.85" />
      <rect x={cx - halfW - 6} y={baseY} width={(halfW + 6) * 2} height="8" rx="3" fill={DIM} opacity="0.6" />
    </>
  );
}

function Arrow({ x, y1, y2, markerId }) {
  return <line x1={x} y1={y1} x2={x} y2={y2} stroke="currentColor" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#${markerId})`} />;
}

function ArrowMarker({ id }) {
  return (
    <marker id={id} markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
      <polygon points="0,0 10,5 0,10" fill="currentColor" />
    </marker>
  );
}

const DIAGRAMS = {
  'call-touch': {
    viewBox: '0 0 200 300',
    caption: 'The screen picks a color all by itself. Run and touch the cone that matches. Then it picks a new color — get ready again!',
    content: (
      <>
        <defs><ArrowMarker id="d1" /></defs>
        <Swatch x={64} y={34} color={ORANGE} repeat />
        <Arrow x={100} y1={118} y2={168} markerId="d1" />
        <Cone cx={100} baseY={270} color={ORANGE} />
        <text x="100" y="294" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>Touch it!</text>
      </>
    ),
  },
  'beat-clock': {
    viewBox: '0 0 200 300',
    caption: "Just like Call & Touch — colors change all by themselves. But there's a timer! When it runs out, the game stops.",
    content: (
      <>
        <defs><ArrowMarker id="d2" /></defs>
        <rect x="40" y="10" width="120" height="14" rx="7" fill={SURFACE_2} stroke="currentColor" strokeWidth="1.4" />
        <rect x="40" y="10" width="80" height="14" rx="7" fill={ACCENT} />
        <Swatch x={64} y={40} color={RED} repeat />
        <Arrow x={100} y1={124} y2={168} markerId="d2" />
        <Cone cx={100} baseY={270} color={RED} />
        <text x="100" y="294" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>Touch it!</text>
      </>
    ),
  },
  'react-sprint': {
    viewBox: '0 0 200 300',
    caption: 'Just like Call & Touch — colors change all by themselves. But you only get a set number of turns, like 10. Finish them all and you’re done!',
    content: (
      <>
        <defs><ArrowMarker id="d3" /></defs>
        <rect x="65" y="8" width="70" height="26" rx="13" fill={SURFACE_2} stroke="currentColor" strokeWidth="1.4" />
        <text x="100" y="26" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="ui-monospace,Menlo,Consolas,monospace" fill={INK}>7 / 10</text>
        <Swatch x={64} y={44} color={GREEN} repeat />
        <Arrow x={100} y1={128} y2={168} markerId="d3" />
        <Cone cx={100} baseY={270} color={GREEN} />
        <text x="100" y="294" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>Touch it!</text>
      </>
    ),
  },
  'sequence-recall': {
    viewBox: '0 0 300 300',
    caption: 'Watch the colors light up, one after another. Remember the order! Then touch the cones in that same order. Get it right and one more color gets added. Get it wrong and the game ends.',
    content: (
      <>
        <defs><ArrowMarker id="d4" /></defs>
        <text x="90" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill={DIM}>1. WATCH</text>
        <rect x="65" y="26" width="50" height="50" rx="12" fill={RED} />
        <text x="90" y="94" textAnchor="middle" fontSize="12" fill={DIM}>1st</text>
        <rect x="155" y="26" width="50" height="50" rx="12" fill={YELLOW} />
        <text x="180" y="94" textAnchor="middle" fontSize="12" fill={DIM}>2nd</text>
        <line x1="117" y1="51" x2="153" y2="51" stroke="currentColor" strokeWidth="3" markerEnd="url(#d4)" />

        <text x="90" y="122" textAnchor="middle" fontSize="12" fontWeight="700" fill={DIM}>2. COPY IT</text>
        <line x1="90" y1="78" x2="90" y2="130" stroke="currentColor" strokeWidth="2" strokeDasharray="2 5" />
        <line x1="180" y1="78" x2="180" y2="130" stroke="currentColor" strokeWidth="2" strokeDasharray="2 5" />
        <Cone cx={90} baseY={200} size={70} color={RED} />
        <Cone cx={180} baseY={200} size={70} color={YELLOW} />

        <rect x="20" y="230" width="120" height="42" rx="21" fill={SURFACE_2} stroke={GREEN} strokeWidth="2" />
        <text x="80" y="256" textAnchor="middle" fontSize="15" fontWeight="700" fill={GREEN}>&#10003; Got it!</text>
        <rect x="160" y="230" width="120" height="42" rx="21" fill={SURFACE_2} stroke={RED} strokeWidth="2" />
        <text x="220" y="256" textAnchor="middle" fontSize="15" fontWeight="700" fill={RED}>&#10005; Oops!</text>
      </>
    ),
  },
  'double-call': {
    viewBox: '0 0 300 280',
    caption: 'Two colors show up at the exact same time. Touch both matching cones!',
    content: (
      <>
        <defs><ArrowMarker id="d5" /></defs>
        <RepeatBadge cx={150} cy={20} />
        <Swatch x={53} y={40} size={64} color={YELLOW} />
        <text x="150" y="80" textAnchor="middle" fontSize="26" fontWeight="700" fill={DIM}>+</text>
        <Swatch x={183} y={40} size={64} color={GREEN} />
        <Arrow x={85} y1={112} y2={158} markerId="d5" />
        <Arrow x={215} y1={112} y2={158} markerId="d5" />
        <Cone cx={85} baseY={260} size={90} color={YELLOW} />
        <Cone cx={215} baseY={260} size={90} color={GREEN} />
      </>
    ),
  },
  'go-no-go': {
    viewBox: '0 0 300 300',
    caption: 'Most colors mean GO — run and touch that cone! But your special STOP color means freeze — don’t move at all.',
    content: (
      <>
        <defs><ArrowMarker id="d6" /></defs>
        <Swatch x={53} y={20} size={64} color={GREEN} repeat />
        <Arrow x={85} y1={104} y2={148} markerId="d6" />
        <Cone cx={85} baseY={250} size={90} color={GREEN} />
        <text x="85" y="284" textAnchor="middle" fontSize="18" fontWeight="800" fill={GREEN}>GO!</text>

        <rect x="183" y="20" width="64" height="64" rx="16" fill={RED} />
        <line x1="188" y1="25" x2="242" y2="79" stroke="#fff" strokeWidth="5" opacity="0.9" />
        <Arrow x={215} y1={104} y2={148} markerId="d6" />
        <circle cx="215" cy="200" r="48" fill="none" stroke="currentColor" strokeWidth="7" />
        <line x1="182" y1="167" x2="248" y2="233" stroke="currentColor" strokeWidth="7" />
        <text x="215" y="284" textAnchor="middle" fontSize="18" fontWeight="800" fill={RED}>STOP!</text>
      </>
    ),
  },
};

export default function GameDiagram({ gameId }) {
  const diagram = DIAGRAMS[gameId];
  if (!diagram) return null;

  return (
    <figure className="diagram-card">
      <svg viewBox={diagram.viewBox} role="img" aria-label={diagram.caption}>
        {diagram.content}
      </svg>
      <figcaption>{diagram.caption}</figcaption>
    </figure>
  );
}
