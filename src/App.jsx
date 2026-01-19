import React from 'react';
import { GameStateProvider } from './context/GameStateContext';
import { AudioProvider } from './context/AudioContext';
import GameContainer from './components/layout/GameContainer';
// Layout and Levels will be imported here later

function App() {
  return (
    <GameStateProvider>
      <AudioProvider>
        <GameContainer />
      </AudioProvider>
    </GameStateProvider>
  );
}

export default App;
