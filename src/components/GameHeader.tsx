import { Flex, Heading, Button, Image, IconButton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

interface GameHeaderProps {
  onReset: () => void;
}

export function GameHeader({ onReset }: GameHeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleColorMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Flex justify="space-between" align="center">
      <Flex align="center" gap={3}>
        <Image src="/icon-192.png" alt="Quick Five" boxSize="40px" />
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
        <Button size="sm" variant="outline" onClick={onReset}>
          New Game
        </Button>
      </Flex>
    </Flex>
  );
}
