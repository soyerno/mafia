import React from 'react';
import { GameState } from '../types/game';
import { Moon, Target, Heart, Search } from 'lucide-react';

interface NightActionsProps {
  gameState: GameState;
}

export default function NightActions({ gameState }: NightActionsProps) {
  const currentPlayer = gameState.players[0]; // TODO: Get actual current player

  const renderRoleActions = () => {
    switch (currentPlayer.role) {
      case 'mafia':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" />
              Choose your target
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gameState.players
                .filter((p) => p.isAlive && p.id !== currentPlayer.id)
                .map((player) => (
                  <button
                    key={player.id}
                    className="bg-gray-700/50 hover:bg-gray-700 rounded-lg p-3 transition-colors"
                  >
                    {player.name}
                  </button>
                ))}
            </div>
          </div>
        );

      case 'doctor':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-500" />
              Choose who to protect
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gameState.players
                .filter((p) => p.isAlive)
                .map((player) => (
                  <button
                    key={player.id}
                    className="bg-gray-700/50 hover:bg-gray-700 rounded-lg p-3 transition-colors"
                  >
                    {player.name}
                  </button>
                ))}
            </div>
          </div>
        );

      case 'detective':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-500" />
              Choose who to investigate
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gameState.players
                .filter((p) => p.isAlive && p.id !== currentPlayer.id)
                .map((player) => (
                  <button
                    key={player.id}
                    className="bg-gray-700/50 hover:bg-gray-700 rounded-lg p-3 transition-colors"
                  >
                    {player.name}
                  </button>
                ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-400">
              Shhh... It's night time. Wait for others to take their actions.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Moon className="w-6 h-6" />
          Night Phase
        </h2>
        <div className="text-xl font-semibold">
          {gameState.timeRemaining}s
        </div>
      </div>
      {renderRoleActions()}
    </div>
  );
}