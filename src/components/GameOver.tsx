import React from 'react';
import { GameState } from '../types/game';
import { Trophy, RotateCcw } from 'lucide-react';

interface GameOverProps {
  gameState: GameState;
}

export default function GameOver({ gameState }: GameOverProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 text-center">
      <div className="flex justify-center mb-6">
        <Trophy className="w-16 h-16 text-yellow-500" />
      </div>
      <h2 className="text-3xl font-bold mb-4">
        Game Over!{' '}
        {gameState.winner === 'mafia' ? 'Mafia Wins!' : 'Citizens Win!'}
      </h2>
      <p className="text-gray-300 mb-8">
        {gameState.winner === 'mafia'
          ? 'The Mafia has taken control of the town!'
          : 'The citizens have successfully eliminated all mafia members!'}
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 rounded-lg px-6 py-3 font-medium flex items-center gap-2 mx-auto">
        <RotateCcw className="w-5 h-5" />
        Play Again
      </button>
    </div>
  );
}