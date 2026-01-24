import { Flex, Heading, Button } from "@chakra-ui/react";

interface GameHeaderProps {
  onReset: () => void;
}

export function GameHeader({ onReset }: GameHeaderProps) {
  return (
    <Flex justify="space-between" align="center">
      <Heading size="xl">Quick Five</Heading>
      <Button size="sm" variant="outline" onClick={onReset}>
        New Game
      </Button>
    </Flex>
  );
}
