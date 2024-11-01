import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GamePhase, GameSettings, GameState, Player } from '../types/game';
import { Moon, Sun, Users, Shield, Gavel } from 'lucide-react';
import PlayerList from './PlayerList';
import GameChat from './GameChat';
import NightActions from './NightActions';
import VotingPhase from './VotingPhase';
import GameOver from './GameOver';
import WaitingRoom from './WaitingRoom';

const mockPlayer: Player = {
  id: '1',
  name: 'TestPlayer',
  isAlive: true,
  isHost: true,
};

const defaultGameState: GameState = {
  roomCode: 'ABCD1234',
  phase: 'lobby',
  status: 'waiting',
  players: [],
  timeRemaining: 0,
};

const defaultSettings: GameSettings = {
  mafiaCount: 2,
  doctorEnabled: true,
  detectiveEnabled: true,
  nightDuration: 30,
  dayDuration: 120,
  allowConsecutiveHeals: false,
};

export default function GameRoom() {
  const { roomCode } = useParams();
  const [gameState, setGameState] = useState<GameState>({
    ...defaultGameState,
    roomCode: roomCode || 'UNKNOWN',
  });
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(mockPlayer);

  const getPhaseIcon = (phase: GamePhase) => {
    switch (phase) {
      case 'night':
        return <Moon className="w-6 h-6" />;
      case 'day':
        return <Sun className="w-6 h-6" />;
      case 'voting':
        return <Gavel className="w-6 h-6" />;
      default:
        return <Users className="w-6 h-6" />;
    }
  };

  const handleStartGame = () => {
    // TODO: Implement Socket.IO game start
    console.log('Starting game with settings:', settings);
  };

  const handleSettingsChange = (newSettings: GameSettings) => {
    setSettings(newSettings);
    // TODO: Emit settings change to server
  };

  // TODO: Connect to Socket.IO and handle game state updates
  useEffect(() => {
    // Socket connection and event listeners will go here
  }, [roomCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-black/30 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold">Mafia Game</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-800 rounded-lg px-4 py-2">
              Room: {gameState.roomCode}
            </div>
            {gameState.status !== 'waiting' && (
              <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2">
                {getPhaseIcon(gameState.phase)}
                <span className="font-medium">
                  {gameState.timeRemaining}s
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      {gameState.status === 'waiting' ? (
        <WaitingRoom
          gameState={gameState}
          settings={settings}
          currentPlayer={currentPlayer}
          onSettingsChange={handleSettingsChange}
          onStartGame={handleStartGame}
        />
      ) : (
        <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Player List */}
          <div className="lg:col-span-1">
            <PlayerList players={gameState.players} />
          </div>

          {/* Center Column - Game Actions */}
          <div className="lg:col-span-2 space-y-6">
            {gameState.phase === 'night' && (
              <NightActions gameState={gameState} />
            )}
            {gameState.phase === 'voting' && (
              <VotingPhase gameState={gameState} />
            )}
            {gameState.status === 'finished' && (
              <GameOver gameState={gameState} />
            )}
            <GameChat />
          </div>
        </main>
      )}
    </div>
  );
}