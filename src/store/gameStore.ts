import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Player, ScoreEntry } from "../types/game";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function createPlayer(name: string): Player {
  return {
    id: generateId(),
    name,
    totalScore: 0,
    history: [],
  };
}

function createScoreEntry(amount: number): ScoreEntry {
  return {
    id: generateId(),
    amount,
    timestamp: Date.now(),
  };
}

interface GameStore {
  players: Player[];
  addPlayer: (name: string) => void;
  removePlayer: (playerId: string) => void;
  updatePlayerName: (playerId: string, name: string) => void;
  addScore: (playerId: string, amount: number) => void;
  removeScore: (playerId: string, scoreId: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      players: [createPlayer("Player 1"), createPlayer("Player 2")],

      addPlayer: (name) =>
        set((state) => ({
          players: [...state.players, createPlayer(name)],
        })),

      removePlayer: (playerId) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== playerId),
        })),

      updatePlayerName: (playerId, name) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === playerId ? { ...p, name } : p
          ),
        })),

      addScore: (playerId, amount) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === playerId
              ? {
                  ...p,
                  totalScore: p.totalScore + amount,
                  history: [...p.history, createScoreEntry(amount)],
                }
              : p
          ),
        })),

      removeScore: (playerId, scoreId) =>
        set((state) => ({
          players: state.players.map((p) => {
            if (p.id !== playerId) return p;
            const scoreEntry = p.history.find((h) => h.id === scoreId);
            if (!scoreEntry) return p;
            return {
              ...p,
              totalScore: p.totalScore - scoreEntry.amount,
              history: p.history.filter((h) => h.id !== scoreId),
            };
          }),
        })),

      resetGame: () =>
        set({
          players: [createPlayer("Player 1"), createPlayer("Player 2")],
        }),
    }),
    {
      name: "quick-five-game",
    }
  )
);
