import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
