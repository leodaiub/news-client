import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  disableTransitionOnChange: true,
};

const colors = {
  brand: {
    100: "#9054F7",
    // ...
    900: "#9054F7",
  },
};

const theme = extendTheme({
  config,
  colors,
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

export default theme;
