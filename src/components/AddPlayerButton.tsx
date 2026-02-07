import { useState } from "react";
import { Flex, Input, Button, type ButtonProps } from "@chakra-ui/react";
import { useGameStore } from "../store/gameStore";

export function AddPlayerButton(props: ButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const addPlayer = useGameStore((state) => state.addPlayer);

  const handleSubmit = () => {
    if (name.trim()) {
      addPlayer(name.trim());
      setName("");
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setName("");
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <Button {...props} onClick={() => setIsAdding(true)}>
        + Add Player
      </Button>
    );
  }

  return (
    <Flex gap={2}>
      <Input
        placeholder="Player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        h="44px"
        autoFocus
      />
      <Button h="44px" colorPalette="blue" onClick={handleSubmit}>
        Add
      </Button>
      <Button
        h="44px"
        variant="ghost"
        onClick={() => {
          setName("");
          setIsAdding(false);
        }}
      >
        Cancel
      </Button>
    </Flex>
  );
}
