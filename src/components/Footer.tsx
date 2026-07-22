import { Button, Link, Stack, Text } from "@chakra-ui/react";
import { ChangelogButton } from "./ChangelogButton";
import { useGameStore } from "../store/gameStore";

export default function Footer() {
  const mode = useGameStore((store) => store.mode);
  const setMode = useGameStore((store) => store.setMode);

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
    </Stack>
  );
}
