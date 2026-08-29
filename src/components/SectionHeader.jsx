import { Box, Flex, Heading, Text } from "@chakra-ui/react";

/**
 * Encabezado de sección: punto amarillo + número + título en Syne uppercase.
 * Mismo patrón visual que ya usan Perfil, Proyectos y Contacto.
 */
const SectionHeader = ({ number, title, subtitle, dotColor = "yellow" }) => (
  <Box>
    <Flex align="center" gap={4} mb={6}>
      <Box w={3} h={3} bg={dotColor} borderRadius="full" />
      <Text
        fontSize="sm"
        letterSpacing="0.2em"
        textTransform="uppercase"
        fontWeight="semibold"
        color="green"
      >
        {number}
      </Text>
    </Flex>

    <Heading
      fontFamily={'"Syne", sans-serif'}
      fontSize={{ base: "3xl", md: "4xl" }}
      fontWeight="700"
      textTransform="uppercase"
      lineHeight="1.2"
    >
      {title}
    </Heading>
    {subtitle && (
      <Text mt={4} fontSize={{ base: "md", md: "lg" }} opacity={0.8} fontFamily="space">
        {subtitle}
      </Text>
    )}
  </Box>
);

export default SectionHeader;
