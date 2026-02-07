import { VStack } from "@chakra-ui/react";
import { PlayerCard } from "./PlayerCard";
import { useGameStore } from "../store/gameStore";

export function PlayerList() {
  const players = useGameStore((state) => state.players);

  return (
    <VStack gap={4} align="stretch">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </VStack>
  );
}
