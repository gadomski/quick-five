import { Stack, Text } from "@chakra-ui/react";
import { ChangelogButton } from "./ChangelogButton";

export default function Footer() {
  return (
    <Stack align="center">
      <Text fontSize="xs" color="fg.muted" textAlign="center" mt={8}>
        Stealing Luke's job since 2026
      </Text>
      <ChangelogButton
        fontSize="xs"
        color="fg.muted"
        h="auto"
        p={0}
        minW={0}
      >
        v{__APP_VERSION__} ({__BUILD_DATE__})
      </ChangelogButton>
    </Stack>
  );
}
