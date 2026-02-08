import { useState } from "react";
import { ButtonGroup, Flex, Input, Button } from "@chakra-ui/react";
import { useGameStore } from "../store/gameStore";
import { LeaderboardButton } from "./LeaderboardButton";

export function ActionButtons() {
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

  if (isAdding) {
    return (
      <Flex gap={2}>
        <Input
          placeholder="Player name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <Button onClick={handleSubmit}>Add</Button>
        <Button
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

  return (
    <ButtonGroup w="full" variant="outline">
      <Button flex="1" onClick={() => setIsAdding(true)}>
        + Add Player
      </Button>
      <LeaderboardButton flex="1" />
    </ButtonGroup>
  );
}
