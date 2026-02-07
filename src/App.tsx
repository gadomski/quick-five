import { Container, VStack } from "@chakra-ui/react";
import { GameHeader } from "./components/GameHeader";
import { PlayerList } from "./components/PlayerList";
import { AddPlayerButton } from "./components/AddPlayerButton";
import Footer from "./components/Footer";

function App() {
  return (
    <Container maxW="container.md" py={4} pt={4}>
      <VStack gap={4} align="stretch">
        <GameHeader />
        <PlayerList />
        <AddPlayerButton />
        <Footer />
      </VStack>
    </Container>
  );
}

export default App;
