import { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

interface AddScoreInputProps {
  onSubmit: (amount: number) => void;
}

export function AddScoreInput({ onSubmit }: AddScoreInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const amount = parseInt(value, 10);
    if (!isNaN(amount) && amount !== 0) {
      onSubmit(amount);
      setValue("");
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setValue("");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        w="100%"
        h="44px"
        variant="outline"
        onClick={() => setIsOpen(true)}
      >
        + Add Score
      </Button>
    );
  }

  return (
    <Flex gap={2}>
      <Input
        type="text"
        inputMode="numeric"
        pattern="-?[0-9]*"
        placeholder="Enter score"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
          setValue("");
          setIsOpen(false);
        }}
      >
        Cancel
      </Button>
    </Flex>
  );
}
