import React from 'react';
import { GameState } from '../types/game';
import { Gavel } from 'lucide-react';

interface VotingPhaseProps {
  gameState: GameState;
}

export default function VotingPhase({ gameState }: VotingPhaseProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Gavel className="w-6 h-6" />
          Voting Phase
        </h2>
        <div className="text-xl font-semibold">
          {gameState.timeRemaining}s
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-300">
          Vote for who you think is a member of the Mafia:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {gameState.players
            .filter((p) => p.isAlive)
            .map((player) => (
              <button
                key={player.id}
                className="bg-gray-700/50 hover:bg-gray-700 rounded-lg p-4 transition-colors"
              >
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-gray-400">0 votes</div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}