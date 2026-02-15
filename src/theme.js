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
    green: "#2D5A47",
    yellow: "#E8D5A3",
    beige: "#f8f6f1",
    claro: "#f8eedd",
    background: "#0B0B0B",
    surface: "#111111",
    grey: "#888888",
    modalbg: "#f8f6f1d8",
  },
  fonts: {
    heading: '"Syne", sans-serif',
    body: '"Syne", sans-serif',
    space: '"Space Grotesk", sans-serif',
  },
});

export default theme;
