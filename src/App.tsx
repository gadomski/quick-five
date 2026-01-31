import { useReducer, useEffect } from "react";
import { Container, VStack, Text } from "@chakra-ui/react";
import { Capacitor } from "@capacitor/core";
import { GameState, GameAction, Player, ScoreEntry } from "./types/game";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { GameHeader } from "./components/GameHeader";
import { PlayerList } from "./components/PlayerList";
import { AddPlayerButton } from "./components/AddPlayerButton";

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

const initialState: GameState = {
  players: [createPlayer("Player 1"), createPlayer("Player 2")],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "ADD_PLAYER":
      return {
        ...state,
        players: [...state.players, createPlayer(action.name)],
      };

    case "REMOVE_PLAYER":
      return {
        ...state,
        players: state.players.filter((p) => p.id !== action.playerId),
      };

    case "UPDATE_PLAYER_NAME":
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.playerId ? { ...p, name: action.name } : p
        ),
      };

    case "ADD_SCORE": {
      const entry = createScoreEntry(action.amount);
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.playerId
            ? {
                ...p,
                totalScore: p.totalScore + action.amount,
                history: [...p.history, entry],
              }
            : p
        ),
      };
    }

    case "UNDO_SCORE": {
      return {
        ...state,
        players: state.players.map((p) => {
          if (p.id !== action.playerId) return p;
          const scoreEntry = p.history.find((h) => h.id === action.scoreId);
          if (!scoreEntry) return p;
          return {
            ...p,
            totalScore: p.totalScore - scoreEntry.amount,
            history: p.history.filter((h) => h.id !== action.scoreId),
          };
        }),
      };
    }

    case "RESET_GAME":
      return {
        players: [createPlayer("Player 1"), createPlayer("Player 2")],
      };

    case "LOAD_STATE":
      return action.state;

    default:
      return state;
  }
}

function App() {
  const [savedState, setSavedState] = useLocalStorage<GameState | null>(
    "quick-five-game",
    null
  );
  const [state, dispatch] = useReducer(gameReducer, savedState || initialState);

  useEffect(() => {
    setSavedState(state);
  }, [state, setSavedState]);

  const handleAddPlayer = (name: string) => {
    dispatch({ type: "ADD_PLAYER", name });
  };

  const handleRemovePlayer = (playerId: string) => {
    dispatch({ type: "REMOVE_PLAYER", playerId });
  };

  const handleUpdatePlayerName = (playerId: string, name: string) => {
    dispatch({ type: "UPDATE_PLAYER_NAME", playerId, name });
  };

  const handleAddScore = (playerId: string, amount: number) => {
    dispatch({ type: "ADD_SCORE", playerId, amount });
  };

  const handleUndoScore = (playerId: string, scoreId: string) => {
    dispatch({ type: "UNDO_SCORE", playerId, scoreId });
  };

  const handleResetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const isAndroid = Capacitor.getPlatform() === "android";

  return (
    <Container maxW="container.md" py={4} pt={isAndroid ? "48px" : 4}>
      <VStack gap={4} align="stretch">
        <GameHeader onReset={handleResetGame} />
        <PlayerList
          players={state.players}
          onAddScore={handleAddScore}
          onRemovePlayer={handleRemovePlayer}
          onUpdatePlayerName={handleUpdatePlayerName}
          onUndoScore={handleUndoScore}
        />
        <AddPlayerButton onAdd={handleAddPlayer} />
        <Text fontSize="xs" color="fg.muted" textAlign="center" mt={8}>
          Stealing Luke's job since 2026
        </Text>
      </VStack>
    </Container>
  );
}

export default App;
