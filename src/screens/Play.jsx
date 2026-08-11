import PlayAuto from './PlayAuto';
import PlayDoubleCall from './PlayDoubleCall';
import PlayGoNoGo from './PlayGoNoGo';
import PlaySequence from './PlaySequence';

export default function Play({ gameId, config, onEnd }) {
  if (gameId === 'double-call') return <PlayDoubleCall config={config} onEnd={onEnd} />;
  if (gameId === 'go-no-go') return <PlayGoNoGo config={config} onEnd={onEnd} />;
  if (gameId === 'sequence-recall') return <PlaySequence config={config} onEnd={onEnd} />;
  return <PlayAuto gameId={gameId} config={config} onEnd={onEnd} />;
}
