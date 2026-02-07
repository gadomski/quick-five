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
