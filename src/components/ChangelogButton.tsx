import { useState } from "react";
import { Button, type ButtonProps, Dialog, Portal, Box } from "@chakra-ui/react";
import Markdown from "react-markdown";
import changelog from "../../CHANGELOG.md?raw";

export function ChangelogButton(props: ButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button {...props} variant="plain" onClick={() => setOpen(true)}>
        Changelog
      </Button>

      <Dialog.Root
        open={open}
        onOpenChange={(e) => !e.open && setOpen(false)}
        size="lg"
        scrollBehavior="inside"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Changelog</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Box css={{ "& h2": { mt: 4, mb: 2 }, "& h3": { mt: 2 } }}>
                  <Markdown>{changelog}</Markdown>
                </Box>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
