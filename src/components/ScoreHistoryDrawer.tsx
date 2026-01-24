import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  CloseButton,
  Drawer,
} from "@chakra-ui/react";
import { FiRotateCcw } from "react-icons/fi";
import { ScoreEntry } from "../types/game";

interface ScoreHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  history: ScoreEntry[];
  onUndo: (scoreId: string) => void;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ScoreHistoryDrawer({
  isOpen,
  onClose,
  playerName,
  history,
  onUndo,
}: ScoreHistoryDrawerProps) {
  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement="bottom"
    >
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content maxH="60vh">
          <Drawer.Header borderBottomWidth="1px">
            <Flex justify="space-between" align="center" w="100%">
              <Drawer.Title>{playerName} - Score History</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Flex>
          </Drawer.Header>
          <Drawer.Body>
            {sortedHistory.length === 0 ? (
              <Text color="fg.muted" textAlign="center" py={8}>
                No scores yet
              </Text>
            ) : (
              <VStack gap={2} align="stretch">
                {sortedHistory.map((entry) => (
                  <Flex
                    key={entry.id}
                    justify="space-between"
                    align="center"
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <Box>
                      <Text
                        fontWeight="semibold"
                        color={entry.amount >= 0 ? "green.600" : "red.600"}
                      >
                        {entry.amount >= 0 ? "+" : ""}
                        {entry.amount}
                      </Text>
                      <Text fontSize="sm" color="fg.muted">
                        {formatTime(entry.timestamp)}
                      </Text>
                    </Box>
                    <IconButton
                      aria-label="Undo score"
                      size="sm"
                      variant="ghost"
                      colorPalette="red"
                      onClick={() => onUndo(entry.id)}
                    >
                      <FiRotateCcw />
                    </IconButton>
                  </Flex>
                ))}
              </VStack>
            )}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
