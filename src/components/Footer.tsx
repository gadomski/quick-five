import { Button, useDisclosure, Link, Stack, Text } from "@chakra-ui/react";
import { ChangelogButton } from "./ChangelogButton";
import { useGameStore } from "../store/gameStore";
import { ConfirmDialog } from "./ConfirmDialog";

export default function Footer() {
  const { open, onOpen, onClose } = useDisclosure();

  const mode = useGameStore((store) => store.mode);
  const setMode = useGameStore((store) => store.setMode);
  const resetGame = useGameStore((state) => state.resetGame);

  return (
    <Stack align="center">
      <Button
        color="fg.muted"
        size="sm"
        variant={"plain"}
        onClick={() =>
          mode === "quick-five" ? setMode("quick-pigs") : setMode("quick-five")
        }
      >
        Switch to {mode === "quick-five" ? "pigs" : "dice"}
      </Button>

      <Text fontSize="xs" color="fg.muted" textAlign="center">
        Stealing Luke's job since 2026
      </Text>
      <Text fontSize="xs" color="fg.muted" textAlign="center">
        Found a bug or have a feature request? Open a{" "}
        <Link
          href="https://github.com/gadomski/quick-five/issues"
          target="_blank"
        >
          Github issue
        </Link>
        .
      </Text>
      <ChangelogButton fontSize="xs" color="fg.muted" variant={"plain"} />

      <Button size="sm" variant="outline" onClick={onOpen}>
        Clear players
      </Button>

      <ConfirmDialog
        isOpen={open}
        onClose={onClose}
        onConfirm={resetGame}
        title="Clear players"
        message="Are you sure you want to clear all players?"
        confirmText="Clear players"
      />
    </Stack>
  );
}
