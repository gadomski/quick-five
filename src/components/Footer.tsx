import { Stack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Stack>
      <Text fontSize="xs" color="fg.muted" textAlign="center" mt={8}>
        Stealing Luke's job since 2026
      </Text>
      <Text fontSize="xs" color="fg.muted" textAlign="center">
        v{__APP_VERSION__} ({__BUILD_DATE__})
      </Text>
    </Stack>
  );
}
