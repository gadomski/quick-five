import {
  Heading,
  Button,
  Image,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { ConfirmDialog } from "./ConfirmDialog";
import { useGameStore } from "../store/gameStore";
import { ColorModeButton } from "./ui/color-mode";

export default function GameHeader() {
  const { open, onOpen, onClose } = useDisclosure();
  const resetGame = useGameStore((state) => state.resetGame);

  return (
    <>
      <HStack justify="space-between" align="center">
        <HStack align="center" gap={3}>
          <Image src="icon-192.png" alt="Quick Five" boxSize="40px" />
          <Heading size="xl">Quick Five</Heading>
        </HStack>
        <HStack gap={2}>
          <ColorModeButton />
          <Button size="sm" variant="outline" onClick={onOpen}>
            New game
          </Button>
        </HStack>
      </HStack>

      <ConfirmDialog
        isOpen={open}
        onClose={onClose}
        onConfirm={resetGame}
        title="New game"
        message="Are you sure you want to start a new game? All scores will be lost."
        confirmText="Start new name"
      />
    </>
  );
}
