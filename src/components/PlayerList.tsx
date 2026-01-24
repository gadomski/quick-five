import { VStack } from "@chakra-ui/react";
import { Player } from "../types/game";
import { PlayerCard } from "./PlayerCard";

interface PlayerListProps {
  players: Player[];
  onAddScore: (playerId: string, amount: number) => void;
  onRemovePlayer: (playerId: string) => void;
  onUpdatePlayerName: (playerId: string, name: string) => void;
  onUndoScore: (playerId: string, scoreId: string) => void;
}

export function PlayerList({
  players,
  onAddScore,
  onRemovePlayer,
  onUpdatePlayerName,
  onUndoScore,
}: PlayerListProps) {
  return (
    <VStack gap={4} align="stretch">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          onAddScore={(amount) => onAddScore(player.id, amount)}
          onRemove={() => onRemovePlayer(player.id)}
          onUpdateName={(name) => onUpdatePlayerName(player.id, name)}
          onUndoScore={(scoreId) => onUndoScore(player.id, scoreId)}
        />
      ))}
    </VStack>
  );
}
