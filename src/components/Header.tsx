import {
  Heading,
  Button,
  Image,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { ConfirmResetDialog } from "./ConfirmResetDialog";
import { ColorModeButton } from "./ui/color-mode";
import { useGameStore } from "../store/gameStore";

export default function GameHeader() {
  const { open, onOpen, onClose } = useDisclosure();
  const mode = useGameStore((state) => state.mode);

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

      <ConfirmResetDialog isOpen={open} onClose={onClose} />
    </>
  );
}
