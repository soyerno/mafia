import React from 'react';
import { Player } from '../types/game';
import { User, Crown, Skull } from 'lucide-react';

interface PlayerListProps {
  players: Player[];
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Players ({players.length})
      </h2>
      <div className="space-y-2">
        {players.map((player) => (
          <div
            key={player.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              player.isAlive
                ? 'bg-gray-700/50 hover:bg-gray-700/70'
                : 'bg-gray-800/30 text-gray-500'
            } transition-colors`}
          >
            <div className="flex items-center gap-2">
              {player.isHost && (
                <Crown className="w-4 h-4 text-yellow-500" />
              )}
              <span className="font-medium">{player.name}</span>
            </div>
            {!player.isAlive && <Skull className="w-4 h-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}