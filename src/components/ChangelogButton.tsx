import { useState } from "react";
import { Button, type ButtonProps, Dialog, Portal } from "@chakra-ui/react";
import { Prose } from "./ui/prose";
import Markdown from "react-markdown";
import changelog from "../../CHANGELOG.md?raw";

export function ChangelogButton(props: ButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button {...props} variant="plain" onClick={() => setOpen(true)}>
        v{__APP_VERSION__} ({__BUILD_DATE__})
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
              <Dialog.Body>
                <Prose size={"md"}>
                  <Markdown>{changelog}</Markdown>
                </Prose>
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
