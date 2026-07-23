import { useRef } from "react";
import { Button, Dialog, Portal } from "@chakra-ui/react";
import { LuTrash, LuUndo } from "react-icons/lu";
import { useGameStore } from "../store/gameStore";

interface ConfirmResetDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfirmResetDialog({
  isOpen,
  onClose,
}: ConfirmResetDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const resetScores = useGameStore((state) => state.resetScores);
  const resetGame = useGameStore((state) => state.resetGame);

  const handleResetScores = () => {
    resetScores();
    onClose();
  };

  const handleResetGame = () => {
    resetGame();
    onClose();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      initialFocusEl={() => cancelRef.current}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>New game</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Reset scores keeps the current players, reset game loses
              everything
            </Dialog.Body>
            <Dialog.Footer>
              <Button ref={cancelRef} variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleResetScores} ml={3}>
                <LuUndo /> Reset scores
              </Button>
              <Button onClick={handleResetGame} ml={3}>
                <LuTrash /> Reset game
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
