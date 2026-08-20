import { Box } from "@chakra-ui/react";

/** Divisor degradado que separa las secciones de la home. */
const SectionDivider = (props) => (
  <Box
    w={{ base: "80%", md: "70%" }}
    h="2px"
    bgGradient="linear(to-r, transparent, green, transparent)"
    m="auto"
    {...props}
  />
);

export default SectionDivider;
