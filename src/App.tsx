import { Container, VStack, Text } from "@chakra-ui/react";
import { GameHeader } from "./components/GameHeader";
import { PlayerList } from "./components/PlayerList";
import { AddPlayerButton } from "./components/AddPlayerButton";

function App() {
  return (
    <Container maxW="container.md" py={4} pt={4}>
      <VStack gap={4} align="stretch">
        <GameHeader />
        <PlayerList />
        <AddPlayerButton />
        <Text fontSize="xs" color="fg.muted" textAlign="center" mt={8}>
          Stealing Luke's job since 2026
        </Text>
      </VStack>
    </Container>
  );
}

export default App;
