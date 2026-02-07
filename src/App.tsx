import { ButtonGroup, Container, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import { PlayerList } from "./components/PlayerList";
import { AddPlayerButton } from "./components/AddPlayerButton";
import { LeaderboardButton } from "./components/LeaderboardButton";
import Footer from "./components/Footer";

function App() {
  return (
    <Container maxW="md" py={4}>
      <VStack gap={4} align="stretch">
        <Header />
        <PlayerList />
        <ButtonGroup w="full" variant={"outline"} flex="1">
          <AddPlayerButton flex="1" />
          <LeaderboardButton flex="1" />
        </ButtonGroup>
        <Footer />
      </VStack>
    </Container>
  );
}

export default App;
