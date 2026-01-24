import { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

interface AddPlayerButtonProps {
  onAdd: (name: string) => void;
}

export function AddPlayerButton({ onAdd }: AddPlayerButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name.trim());
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
      <Button
        w="100%"
        h="44px"
        variant="outline"
        onClick={() => setIsAdding(true)}
      >
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
