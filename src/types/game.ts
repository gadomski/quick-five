export interface ScoreEntry {
  id: string;
  amount: number;
  timestamp: number;
}

export interface Player {
  id: string;
  name: string;
  totalScore: number;
  history: ScoreEntry[];
}

export interface GameState {
  players: Player[];
}

export type GameAction =
  | { type: "ADD_PLAYER"; name: string }
  | { type: "REMOVE_PLAYER"; playerId: string }
  | { type: "UPDATE_PLAYER_NAME"; playerId: string; name: string }
  | { type: "ADD_SCORE"; playerId: string; amount: number }
  | { type: "UNDO_SCORE"; playerId: string; scoreId: string }
  | { type: "RESET_GAME" }
  | { type: "LOAD_STATE"; state: GameState };
