import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  useDisclosure,
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
      <Box borderWidth="1px" borderRadius="lg" p={4} bg="bg.muted">
        <Flex justify="space-between" align="center" mb={2}>
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
          <Flex gap={2}>
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
          </Flex>
        </Flex>

        <Text fontSize="2xl" fontWeight="semibold" mb={4}>
          Total: {player.totalScore}
        </Text>

        <AddScoreInput onSubmit={onAddScore} />
      </Box>

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
