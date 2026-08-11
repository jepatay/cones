import { useState } from 'react';
import { DEFAULT_CONFIG } from './config/engineConfig';
import { getGameModeById } from './config/gameModes';
import GameSelect from './screens/GameSelect';
import GameConfig from './screens/GameConfig';
import Play from './screens/Play';
import Summary from './screens/Summary';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('select'); // select | config | play | summary
  const [gameId, setGameId] = useState(null);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [sessionResult, setSessionResult] = useState(null);

  const handleSelectGame = (id) => {
    setGameId(id);
    setConfig(DEFAULT_CONFIG);
    setScreen('config');
  };

  const handleStart = (newConfig) => {
    setConfig(newConfig);
    setScreen('play');
  };

  const handleSessionEnd = (result) => {
    setSessionResult(result);
    setScreen('summary');
  };

  const handlePlayAgain = () => {
    setSessionResult(null);
    setScreen('play');
  };

  const handleBackToGames = () => {
    setGameId(null);
    setSessionResult(null);
    setScreen('select');
  };

  if (screen === 'select') {
    return <GameSelect onSelect={handleSelectGame} />;
  }

  const gameMode = getGameModeById(gameId);

  if (screen === 'config') {
    return (
      <GameConfig
        gameMode={gameMode}
        initialConfig={config}
        onStart={handleStart}
        onBack={handleBackToGames}
      />
    );
  }

  if (screen === 'play') {
    return <Play gameId={gameId} config={config} onEnd={handleSessionEnd} />;
  }

  return (
    <Summary
      gameId={gameId}
      result={sessionResult}
      onPlayAgain={handlePlayAgain}
      onBackToGames={handleBackToGames}
    />
  );
}
