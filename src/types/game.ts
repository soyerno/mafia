export type PlayerRole = 'mafia' | 'citizen' | 'doctor' | 'detective';
export type GamePhase = 'lobby' | 'night' | 'day' | 'voting' | 'ended';
export type GameStatus = 'waiting' | 'in-progress' | 'finished';

export interface Player {
  id: string;
  name: string;
  role?: PlayerRole;
  isAlive: boolean;
  isHost: boolean;
}

export interface GameState {
  roomCode: string;
  phase: GamePhase;
  status: GameStatus;
  players: Player[];
  timeRemaining: number;
  winner?: 'mafia' | 'citizens';
}

export interface GameSettings {
  mafiaCount: number;
  doctorEnabled: boolean;
  detectiveEnabled: boolean;
  nightDuration: number;
  dayDuration: number;
  allowConsecutiveHeals: boolean;
}