import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LobbyScreen from './components/organisms/LobbyScreen';
import GameRoom from './components/GameRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/game/:roomCode" element={<GameRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;