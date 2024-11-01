import React from 'react';
import { Users, Play, Settings } from 'lucide-react';
import { GameState, GameSettings, Player } from '../types/game';
import Avatar from './atoms/Avatar';
import Button from './atoms/Button';
import GameSettingsForm from './molecules/GameSettingsForm';

interface WaitingRoomProps {
  gameState: GameState;
  settings: GameSettings;
  currentPlayer: Player;
  onSettingsChange: (settings: GameSettings) => void;
  onStartGame: () => void;
}

export default function WaitingRoom({
  gameState,
  settings,
  currentPlayer,
  onSettingsChange,
  onStartGame,
}: WaitingRoomProps) {
  const canStartGame = gameState.players.length >= 4;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Players */}
      <div className="space-y-6">
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Players ({gameState.players.length})
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {gameState.players.map((player) => (
              <div
                key={player.id}
                className="bg-gray-700/50 rounded-lg p-4 flex items-center gap-3"
              >
                <Avatar name={player.name} size="sm" />
                <div>
                  <div className="font-medium">{player.name}</div>
                  {player.isHost && (
                    <div className="text-sm text-yellow-500">Host</div>
                  )}
                </div>
              </div>
            ))}
            {Array.from(
              { length: Math.max(0, 8 - gameState.players.length) },
              (_, i) => (
                <div
                  key={`empty-${i}`}
                  className="bg-gray-700/20 rounded-lg p-4 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-700/30" />
                  <div className="text-gray-500">Waiting for player...</div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Game Status */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Game Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Room Code:</span>
              <span className="font-mono font-bold">{gameState.roomCode}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Players Needed:</span>
              <span>
                {gameState.players.length < 4
                  ? `${4 - gameState.players.length} more needed`
                  : 'Ready to start!'}
              </span>
            </div>
            {currentPlayer.isHost && (
              <Button
                onClick={onStartGame}
                icon={Play}
                fullWidth
                disabled={!canStartGame}
              >
                Start Game
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Game Settings */}
      {currentPlayer.isHost ? (
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Game Settings
          </h2>
          <GameSettingsForm
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
        </div>
      ) : (
        <div className="bg-gray-800/50 rounded-xl p-6 flex items-center justify-center">
          <div className="text-center">
            <Settings className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Waiting for Host</h3>
            <p className="text-gray-400">
              The host is configuring game settings...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}