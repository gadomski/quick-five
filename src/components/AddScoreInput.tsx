import { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { useGameStore } from "../store/gameStore";
import { ConfirmDialog } from "./ConfirmDialog";
import { useDisclosure } from "@chakra-ui/react";

interface AddScoreInputProps {
  onSubmit: (amount: number) => void;
  onClearScores: () => void;
}

export function AddScoreInput({ onSubmit, onClearScores }: AddScoreInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const mode = useGameStore((store) => store.mode);
  const {
    open: confirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure();

  const handleSubmit = () => {
    const amount = parseInt(value, 10);
    if (!isNaN(amount) && amount !== 0) {
      onSubmit(amount);
      setValue("");
      setIsOpen(false);
    }
  };

  const handleBacon = () => {
    onClearScores();
    setValue("");
    setIsOpen(false);
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
    <>
      <Flex gap={2}>
        <Input
          type="text"
          inputMode="numeric"
          pattern="-?[0-9]*"
          placeholder="Enter score"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <Button onClick={handleSubmit}>Add</Button>
        {mode === "quick-pigs" && (
          <Button
            colorPalette={"red"}
            variant={"subtle"}
            onClick={onConfirmOpen}
          >
            Bacon
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={() => {
            setValue("");
            setIsOpen(false);
          }}
        >
          Cancel
        </Button>
      </Flex>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={onConfirmClose}
        onConfirm={() => handleBacon()}
        title="Makin' bacon"
        message={`Did they really make bacon?`}
        confirmText="Make that bacon"
      />
    </>
  );
}
