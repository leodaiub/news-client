"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { SWRConfig } from "swr";
import { fetcher } from "@/services";

export function Providers({ children }: any) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateIfStale: false,
        refreshInterval: 100000,
      }}
    >
      <CacheProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </SWRConfig>
  );
}
