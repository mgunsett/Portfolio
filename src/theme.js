import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: props => ({
      body: {
        bg: props.colorMode === "dark" ? "#0B0B0B" : "#F5F0E6",
        color: props.colorMode === "dark" ? "#F5F0E6" : "#0B0B0B",
      },
    }),
  },
  colors: {
    green: "#0F766E",
    yellow: "#e9ce62",
    beige: "#F5F0E6",
    background: "#0B0B0B",
    surface: "#111111",
  },
  fonts: {
    heading: '"Syne", sans-serif',
    body: '"Syne", sans-serif',
    space: '"Space Grotesk", sans-serif',
  },
});

export default theme;
