import { Link, Stack, Text } from "@chakra-ui/react";
import { ChangelogButton } from "./ChangelogButton";

export default function Footer() {
  return (
    <Stack align="center">
      <Text fontSize="xs" color="fg.muted" textAlign="center">
        Stealing Luke's job since 2026
      </Text>
      <Text fontSize="xs" color="fg.muted" textAlign="center">
        Found a bug, or want to request a feature? Open a{" "}
        <Link
          href="https://github.com/gadomski/quick-five/issues"
          target="_blank"
        >
          Github issue
        </Link>
        .
      </Text>
      <ChangelogButton fontSize="xs" color="fg.muted" />
    </Stack>
  );
}
