import { Container, VStack, Text } from "@chakra-ui/react";
import Header from "./components/Header";
import { PlayerList } from "./components/PlayerList";
import { AddPlayerButton } from "./components/AddPlayerButton";

function App() {
  return (
    <Container maxW="md" py={4}>
      <VStack gap={4} align="stretch">
        <Header />
        <PlayerList />
        <AddPlayerButton />
        <Text fontSize="xs" color="fg.muted" textAlign="center">
          Stealing Luke's job since 2026
        </Text>
      </VStack>
    </Container>
  );
}

export default App;
