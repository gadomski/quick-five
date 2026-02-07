import {
  Flex,
  Heading,
  Button,
  Image,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import { ConfirmDialog } from "./ConfirmDialog";
import { useGameStore } from "../store/gameStore";

export function GameHeader() {
  const { theme, setTheme } = useTheme();
  const { open, onOpen, onClose } = useDisclosure();
  const resetGame = useGameStore((state) => state.resetGame);

  const toggleColorMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={3}>
          <Image src="icon-192.png" alt="Quick Five" boxSize="40px" />
          <Heading size="xl">Quick Five</Heading>
        </Flex>
        <Flex gap={2}>
          <IconButton
            aria-label="Toggle color mode"
            variant="ghost"
            size="sm"
            onClick={toggleColorMode}
          >
            {theme === "dark" ? <LuSun /> : <LuMoon />}
          </IconButton>
          <Button size="sm" variant="outline" onClick={onOpen}>
            New Game
          </Button>
        </Flex>
      </Flex>

      <ConfirmDialog
        isOpen={open}
        onClose={onClose}
        onConfirm={resetGame}
        title="New Game"
        message="Are you sure you want to start a new game? All scores will be lost."
        confirmText="Start New Game"
      />
    </>
  );
}
