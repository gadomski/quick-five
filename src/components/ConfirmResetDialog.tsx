import { useRef } from "react";
import { Button, Dialog, Portal } from "@chakra-ui/react";

interface ConfirmResetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmOne: () => void;
  onConfirmTwo: () => void;
  title: string;
  message: string;
  confirmOneText?: string;
  confirmTwoText?: string;
  cancelText?: string;
}

export function ConfirmResetDialog({
  isOpen,
  onClose,
  onConfirmOne,
  onConfirmTwo,
  title,
  message,
  confirmOneText = "Confirm One",
  confirmTwoText = "Confirm Two",
  cancelText = "Cancel",
}: ConfirmResetDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleConfirmOne = () => {
    onConfirmOne();
    onClose();
  };

  const handleConfirmTwo = () => {
    onConfirmTwo();
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
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{message}</Dialog.Body>
            <Dialog.Footer>
              <Button ref={cancelRef} variant="outline" onClick={onClose}>
                {cancelText}
              </Button>
              <Button colorPalette="red" onClick={handleConfirmOne} ml={3}>
                {confirmOneText}
              </Button>
              <Button colorPalette="red" onClick={handleConfirmTwo} ml={3}>
                {confirmTwoText}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
