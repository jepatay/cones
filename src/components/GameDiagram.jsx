// Circle-and-arrow explainer for each game mode, shown on its config
// screen. Circle = color cue, arrow+clock = changes automatically (never a
// tap), triangle = the physical cone, slashed circle = freeze/No-Go.
const RED = '#E8341E';
const ORANGE = '#F5820C';
const YELLOW = '#F5C400';
const GREEN = '#8CC63F';
const DIM = '#9aa1ad';
const SURFACE_2 = '#171b22';
const ACCENT = '#3a6df0';

const DIAGRAMS = {
  'call-touch': {
    viewBox: '0 0 340 180',
    caption: 'Colors keep changing on the timer, forever — touch the matching cone each time. Runs until you exit.',
    content: (
      <>
        <defs>
          <marker id="diagArr1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0,0 8,4 0,8" fill="currentColor" /></marker>
        </defs>
        <circle cx="50" cy="36" r="18" fill={RED} />
        <circle cx="150" cy="36" r="18" fill={GREEN} />
        <circle cx="250" cy="36" r="18" fill={YELLOW} />
        <line x1="72" y1="36" x2="128" y2="36" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr1)" />
        <line x1="172" y1="36" x2="228" y2="36" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr1)" />
        <line x1="272" y1="36" x2="310" y2="36" stroke="currentColor" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />
        <text x="322" y="41" fontSize="16" fill={DIM}>&hellip;</text>
        <line x1="150" y1="58" x2="150" y2="92" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr1)" />
        <polygon points="135,132 165,132 150,100" fill={DIM} opacity="0.4" />
        <rect x="133" y="132" width="34" height="5" rx="2" fill={DIM} opacity="0.55" />
        <text x="150" y="160" textAnchor="middle" fontSize="12" fill={DIM}>touch the matching cone</text>
        <text x="150" y="174" textAnchor="middle" fontSize="11" fill={ACCENT}>no set length — exit whenever</text>
      </>
    ),
  },
  'beat-clock': {
    viewBox: '0 0 340 100',
    caption: 'Same automatic flashing as Call & Touch, but a countdown ends the session for you.',
    content: (
      <>
        <defs>
          <marker id="diagArr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0,0 8,4 0,8" fill="currentColor" /></marker>
        </defs>
        <circle cx="50" cy="36" r="18" fill={ORANGE} />
        <circle cx="150" cy="36" r="18" fill={RED} />
        <circle cx="250" cy="36" r="18" fill={GREEN} />
        <line x1="72" y1="36" x2="128" y2="36" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr2)" />
        <line x1="172" y1="36" x2="228" y2="36" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr2)" />
        <rect x="30" y="78" width="280" height="10" rx="5" fill={SURFACE_2} stroke="currentColor" strokeWidth="1.2" />
        <rect x="30" y="78" width="170" height="10" rx="5" fill={ACCENT} opacity="0.75" />
        <text x="150" y="12" textAnchor="middle" fontSize="11" fill={ACCENT}>30 / 60 / 90s, your choice</text>
      </>
    ),
  },
  'react-sprint': {
    viewBox: '0 0 340 170',
    caption: 'Same engine, but it stops itself at a target rep count (10/20/30) — a defined sprint set instead of open-ended.',
    content: (
      <>
        <defs>
          <marker id="diagArr3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0,0 8,4 0,8" fill="currentColor" /></marker>
        </defs>
        <circle cx="50" cy="36" r="18" fill={GREEN} />
        <circle cx="150" cy="36" r="18" fill={ORANGE} />
        <circle cx="250" cy="36" r="18" fill={RED} />
        <line x1="72" y1="36" x2="128" y2="36" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr3)" />
        <line x1="172" y1="36" x2="228" y2="36" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr3)" />
        <rect x="120" y="70" width="100" height="34" rx="8" fill={SURFACE_2} stroke="currentColor" strokeWidth="1.4" />
        <text x="170" y="92" textAnchor="middle" fontSize="14" fontFamily="ui-monospace,Menlo,Consolas,monospace" fill="#f3f4f6">9 / 10</text>
        <line x1="170" y1="104" x2="170" y2="124" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr3)" />
        <text x="170" y="144" textAnchor="middle" fontSize="12" fill={DIM}>session ends at your target rep count</text>
      </>
    ),
  },
  'sequence-recall': {
    viewBox: '0 0 340 200',
    caption: "The only mode with a real tap — not to react, but to self-report a finished physical attempt (there's no sensor on the cones).",
    content: (
      <>
        <defs>
          <marker id="diagArr4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0,0 8,4 0,8" fill="currentColor" /></marker>
        </defs>
        <text x="14" y="30" fontSize="11" fill={DIM}>watch</text>
        <circle cx="90" cy="26" r="13" fill={RED} />
        <circle cx="130" cy="26" r="13" fill={YELLOW} />
        <circle cx="170" cy="26" r="13" fill={RED} />
        <line x1="103" y1="26" x2="117" y2="26" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#diagArr4)" />
        <line x1="143" y1="26" x2="157" y2="26" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#diagArr4)" />

        <text x="14" y="76" fontSize="11" fill={DIM}>repeat</text>
        <polygon points="80,90 100,90 90,66" fill={DIM} opacity="0.4" />
        <polygon points="120,90 140,90 130,66" fill={DIM} opacity="0.4" />
        <polygon points="160,90 180,90 170,66" fill={DIM} opacity="0.4" />
        <line x1="90" y1="40" x2="90" y2="64" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 4" />
        <line x1="130" y1="40" x2="130" y2="64" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 4" />
        <line x1="170" y1="40" x2="170" y2="64" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 4" />

        <rect x="55" y="120" width="105" height="34" rx="17" fill={SURFACE_2} stroke={GREEN} strokeWidth="1.6" />
        <text x="107" y="142" textAnchor="middle" fontSize="12" fill={GREEN}>&#10003; nailed it</text>
        <path d="M107,120 C107,90 40,70 40,40" fill="none" stroke={GREEN} strokeWidth="1.6" markerEnd="url(#diagArr4)" />

        <rect x="180" y="120" width="105" height="34" rx="17" fill={SURFACE_2} stroke={RED} strokeWidth="1.6" />
        <text x="232" y="142" textAnchor="middle" fontSize="12" fill={RED}>&#10005; missed it</text>
        <line x1="232" y1="154" x2="232" y2="176" stroke={RED} strokeWidth="1.6" markerEnd="url(#diagArr4)" />
        <text x="232" y="192" textAnchor="middle" fontSize="11" fill={DIM}>session ends</text>
      </>
    ),
  },
  'double-call': {
    viewBox: '0 0 340 170',
    caption: 'Two colors shown together, not in sequence — touch both cones. Needs at least 2 active colors.',
    content: (
      <>
        <defs>
          <marker id="diagArr5" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0,0 8,4 0,8" fill="currentColor" /></marker>
        </defs>
        <circle cx="110" cy="34" r="19" fill={YELLOW} />
        <circle cx="230" cy="34" r="19" fill={GREEN} />
        <text x="170" y="40" textAnchor="middle" fontSize="16" fill={DIM}>+</text>
        <text x="170" y="12" textAnchor="middle" fontSize="11" fill={ACCENT}>shown together, not in sequence</text>
        <line x1="110" y1="56" x2="110" y2="92" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr5)" />
        <line x1="230" y1="56" x2="230" y2="92" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr5)" />
        <polygon points="95,132 125,132 110,100" fill={DIM} opacity="0.4" />
        <rect x="93" y="132" width="34" height="5" rx="2" fill={DIM} opacity="0.55" />
        <polygon points="215,132 245,132 230,100" fill={DIM} opacity="0.4" />
        <rect x="213" y="132" width="34" height="5" rx="2" fill={DIM} opacity="0.55" />
        <text x="170" y="164" textAnchor="middle" fontSize="12" fill={DIM}>touch both cones</text>
      </>
    ),
  },
  'go-no-go': {
    viewBox: '0 0 340 160',
    caption: 'You pick which color is No-Go in setup — it gets the slash overlay live too, not just in this diagram.',
    content: (
      <>
        <defs>
          <marker id="diagArr6" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0,0 8,4 0,8" fill="currentColor" /></marker>
        </defs>
        <circle cx="50" cy="36" r="18" fill={GREEN} />
        <circle cx="150" cy="36" r="18" fill={RED} />
        <circle cx="150" cy="36" r="18" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <line x1="139" y1="25" x2="161" y2="47" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="250" cy="36" r="18" fill={YELLOW} />
        <line x1="72" y1="36" x2="128" y2="36" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr6)" />
        <line x1="172" y1="36" x2="228" y2="36" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr6)" />

        <line x1="50" y1="58" x2="50" y2="90" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr6)" />
        <polygon points="35,128 65,128 50,96" fill={DIM} opacity="0.4" />
        <text x="50" y="150" textAnchor="middle" fontSize="11" fill={DIM}>go &mdash; touch</text>

        <line x1="150" y1="58" x2="150" y2="90" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr6)" />
        <circle cx="150" cy="112" r="16" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <line x1="139" y1="101" x2="161" y2="123" stroke="currentColor" strokeWidth="2.4" />
        <text x="150" y="150" textAnchor="middle" fontSize="11" fill={DIM}>no-go &mdash; freeze</text>

        <line x1="250" y1="58" x2="250" y2="90" stroke="currentColor" strokeWidth="2" markerEnd="url(#diagArr6)" />
        <polygon points="235,128 265,128 250,96" fill={DIM} opacity="0.4" />
        <text x="250" y="150" textAnchor="middle" fontSize="11" fill={DIM}>go &mdash; touch</text>
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
