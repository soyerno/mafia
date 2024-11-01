import React, { useState } from 'react';
import { Shield, Users, Plus } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Avatar from '../atoms/Avatar';
import GameSettingsForm from '../molecules/GameSettingsForm';
import { GameSettings } from '../../types/game';
import { validateUsername } from '../../utils/validation';

const generateRoomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 8 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
};

export default function LobbyScreen() {
  const [mode, setMode] = useState<'menu' | 'create' | 'join'>('menu');
  const [playerName, setPlayerName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [settings, setSettings] = useState<GameSettings>({
    mafiaCount: 2,
    doctorEnabled: true,
    detectiveEnabled: true,
    nightDuration: 30,
    dayDuration: 120,
    allowConsecutiveHeals: false,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setPlayerName(name);
    setNameError(validateUsername(name));
  };

  const handleCreateGame = () => {
    const error = validateUsername(playerName);
    if (error) {
      setNameError(error);
      return;
    }
    // TODO: Implement room creation with Socket.IO
    console.log('Creating game with settings:', settings);
  };

  const handleJoinGame = () => {
    const error = validateUsername(playerName);
    if (error) {
      setNameError(error);
      return;
    }
    if (!roomCode) {
      return;
    }
    // TODO: Implement room joining with Socket.IO
    console.log('Joining game:', roomCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Mafia Game</h1>
          <p className="text-gray-400">A game of deception and deduction</p>
        </div>

        {mode === 'menu' && (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              {playerName && !nameError && (
                <Avatar name={playerName} size="lg" />
              )}
              <Input
                label="Your Name"
                icon={Users}
                value={playerName}
                onChange={handleNameChange}
                placeholder="Enter your name"
                error={nameError}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button
                onClick={() => setMode('create')}
                icon={Plus}
                fullWidth
                disabled={!playerName || !!nameError}
              >
                Create Game
              </Button>
              <Button
                onClick={() => setMode('join')}
                variant="secondary"
                fullWidth
                disabled={!playerName || !!nameError}
              >
                Join Game
              </Button>
            </div>
          </div>
        )}

        {mode === 'create' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar name={playerName} />
              <div>
                <h3 className="font-medium">{playerName}</h3>
                <p className="text-sm text-gray-400">Game Host</p>
              </div>
            </div>
            <GameSettingsForm
              settings={settings}
              onSettingsChange={setSettings}
            />
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setMode('menu')}
                variant="ghost"
              >
                Back
              </Button>
              <Button onClick={handleCreateGame}>Create Room</Button>
            </div>
          </div>
        )}

        {mode === 'join' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar name={playerName} />
              <div>
                <h3 className="font-medium">{playerName}</h3>
                <p className="text-sm text-gray-400">Player</p>
              </div>
            </div>
            <Input
              label="Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="Enter room code"
              maxLength={8}
            />
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setMode('menu')}
                variant="ghost"
              >
                Back
              </Button>
              <Button
                onClick={handleJoinGame}
                disabled={!roomCode}
              >
                Join Room
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}