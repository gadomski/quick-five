import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  useDisclosure,
  Card,
  HStack,
} from "@chakra-ui/react";
import { FiList, FiX } from "react-icons/fi";
import { Player } from "../types/game";
import { AddScoreInput } from "./AddScoreInput";
import { ScoreHistoryDrawer } from "./ScoreHistoryDrawer";
import { ConfirmDialog } from "./ConfirmDialog";

interface PlayerCardProps {
  player: Player;
  onAddScore: (amount: number) => void;
  onRemove: () => void;
  onUpdateName: (name: string) => void;
  onUndoScore: (scoreId: string) => void;
}

export function PlayerCard({
  player,
  onAddScore,
  onRemove,
  onUpdateName,
  onUndoScore,
}: PlayerCardProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(player.name);
  const { open, onOpen, onClose } = useDisclosure();
  const {
    open: confirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const handleNameSubmit = () => {
    if (editedName.trim()) {
      onUpdateName(editedName.trim());
    } else {
      setEditedName(player.name);
    }
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    } else if (e.key === "Escape") {
      setEditedName(player.name);
      setIsEditingName(false);
    }
  };

  return (
    <>
      <Card.Root size={"sm"}>
        <Card.Body>
          <Card.Title mb={2}>
            <HStack justify="space-between" align="center">
              {isEditingName ? (
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={handleNameSubmit}
                  onKeyDown={handleNameKeyDown}
                  size="lg"
                  fontWeight="bold"
                  autoFocus
                  maxW="200px"
                />
              ) : (
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  cursor="pointer"
                  onClick={() => setIsEditingName(true)}
                  _hover={{ textDecoration: "underline" }}
                >
                  {player.name}
                </Text>
              )}
              <HStack gap={2}>
                <IconButton
                  aria-label="View score history"
                  size="sm"
                  variant="ghost"
                  onClick={onOpen}
                >
                  <FiList />
                </IconButton>
                <IconButton
                  aria-label="Remove player"
                  size="sm"
                  variant="ghost"
                  colorPalette="red"
                  onClick={onConfirmOpen}
                >
                  <FiX />
                </IconButton>
              </HStack>
            </HStack>
          </Card.Title>
          <Card.Description>
            <HStack justify={"space-between"}>
              <Text fontSize="xl" fontWeight="semibold">
                Total: {player.totalScore}
              </Text>
              {player.history.length > 0 && (
                <Text>
                  Last score: {player.history[player.history.length - 1].amount}
                </Text>
              )}
            </HStack>
          </Card.Description>
        </Card.Body>
        <Card.Footer>
          <AddScoreInput onSubmit={onAddScore} />
        </Card.Footer>
      </Card.Root>

      <ScoreHistoryDrawer
        isOpen={open}
        onClose={onClose}
        playerName={player.name}
        history={player.history}
        onUndo={onUndoScore}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={onConfirmClose}
        onConfirm={onRemove}
        title="Remove Player"
        message={`Are you sure you want to remove ${player.name}?`}
        confirmText="Remove"
      />
    </>
  );
}
