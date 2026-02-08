import { Container, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import { PlayerList } from "./components/PlayerList";
import { ActionButtons } from "./components/ActionButtons";
import Footer from "./components/Footer";

function App() {
  return (
    <Container maxW="md" py={4}>
      <VStack gap={4} align="stretch">
        <Header />
        <PlayerList />
        <ActionButtons />
        <Footer />
      </VStack>
    </Container>
  );
}

export default App;
