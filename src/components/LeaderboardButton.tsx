import { useState } from "react";
import {
  Button,
  type ButtonProps,
  Dialog,
  Portal,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useGameStore } from "../store/gameStore";

export function LeaderboardButton(props: ButtonProps) {
  const [open, setOpen] = useState(false);
  const players = useGameStore((state) => state.players);

  const ranked = [...players].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <>
      <Button
        {...props}
        onClick={() => setOpen(true)}
        disabled={
          players.length === 0 ||
          players.every((player) => player.totalScore === 0)
        }
      >
        Leaderboard
      </Button>

      <Dialog.Root open={open} onOpenChange={(e) => !e.open && setOpen(false)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Leaderboard</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {ranked.length === 0 ? (
                  <Text>No players yet.</Text>
                ) : (
                  <VStack gap={2} align="stretch">
                    {ranked.map((player, index) => (
                      <HStack key={player.id} justify="space-between">
                        <Text>
                          {index + 1}. {player.name}
                        </Text>
                        <Text fontWeight="bold">{player.totalScore}</Text>
                      </HStack>
                    ))}
                  </VStack>
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
