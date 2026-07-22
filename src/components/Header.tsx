import {
  Heading,
  Button,
  Image,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { ConfirmResetDialog } from "./ConfirmResetDialog";
import { useGameStore } from "../store/gameStore";
import { ColorModeButton } from "./ui/color-mode";

export default function GameHeader() {
  const { open, onOpen, onClose } = useDisclosure();
  const mode = useGameStore((state) => state.mode);
  const resetGame = useGameStore((state) => state.resetGame);
  const resetScores = useGameStore((state) => state.resetScores);

  const image =
    mode === "quick-five" ? (
      <Image src="icon-192.png" alt="Quick Five" boxSize="40px" />
    ) : (
      <Image
        src="quick-pigs/pigs-icon-192.png"
        alt="Quick Pigs"
        boxSize="40px"
      />
    );
  const title = mode === "quick-five" ? "Quick Five" : "Quick Pigs";

  return (
    <>
      <HStack justify="space-between" align="center">
        <HStack align="center" gap={3}>
          {image}
          <Heading size="xl">{title}</Heading>
        </HStack>
        <HStack gap={2}>
          <ColorModeButton />
          <Button size="sm" variant="outline" onClick={onOpen}>
            New game
          </Button>
        </HStack>
      </HStack>

      <ConfirmResetDialog
        isOpen={open}
        onClose={onClose}
        onConfirmOne={resetGame}
        onConfirmTwo={resetScores}
        title="New game"
        message="Reset Players or Scores, data will be lost. Choose one!"
        confirmOneText="Clear Players"
        confirmTwoText="Clear Scores"
      />
    </>
  );
}
