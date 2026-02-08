import { create } from "zustand";
import { persist } from "zustand/middleware";
import { arrayMove } from "@dnd-kit/sortable";
import { Player, ScoreEntry } from "../types/game";

type GameMode = "quick-five" | "quick-pigs";

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
  clearScores: (playerId: string) => void;
  reorderPlayers: (activeId: string, overId: string) => void;
  resetGame: () => void;
  mode: GameMode;
  setMode: (mode: GameMode) => void;
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

      clearScores: (playerId) =>
        set((state) => ({
          players: state.players.map((p) => {
            if (p.id !== playerId) return p;
            return {
              ...p,
              totalScore: 0,
              history: [],
            };
          }),
        })),

      reorderPlayers: (activeId, overId) =>
        set((state) => {
          const oldIndex = state.players.findIndex((p) => p.id === activeId);
          const newIndex = state.players.findIndex((p) => p.id === overId);
          return { players: arrayMove(state.players, oldIndex, newIndex) };
        }),

      resetGame: () =>
        set({
          players: [createPlayer("Player 1"), createPlayer("Player 2")],
        }),
      mode: "quick-five",
      setMode: (mode) => set({ mode }),
    }),
    {
      name: "quick-five-game",
    }
  )
);
