import { Stack, Text } from "@chakra-ui/react";
import { ChangelogButton } from "./ChangelogButton";

export default function Footer() {
  return (
    <Stack align="center">
      <Text fontSize="xs" color="fg.muted" textAlign="center" mt={8}>
        Stealing Luke's job since 2026
      </Text>
      <ChangelogButton fontSize="xs" color="fg.muted" />
    </Stack>
  );
}
