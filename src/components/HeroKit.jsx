import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { scrollToSection } from "../utils/scrollToSection";

/** Estilos de los dos botones del Hero, compartidos por las dos páginas. */
const VARIANTS = {
  primary: {
    bg: "green",
    color: "beige",
    boxShadow: "0 10px 30px -10px rgba(45,90,71,0.6)",
  },
  secondary: {
    bg: "yellow",
    color: "black",
    boxShadow: "0 10px 30px -12px rgba(232,213,163,0.7)",
  },
};

/**
 * Botonera del Hero. `actions` es una lista de { label, sectionId, variant },
 * así cada página define sus propios CTAs sin duplicar estilos.
 */
export const HeroActions = ({ actions, full }) => (
  <Flex gap={4} w={full ? "100%" : "auto"} pt={{ base: 1, md: 0 }}>
    {actions.map(({ label, sectionId, variant = "primary" }) => {
      const style = VARIANTS[variant] ?? VARIANTS.primary;

      return (
        <Button
          key={label}
          {...style}
          size="lg"
          px={8}
          h={{ base: 14, md: 12 }}
          flex={full ? 1 : "initial"}
          borderRadius="xl"
          _hover={{ bg: style.bg, opacity: 0.9, transform: "translateY(-2px)" }}
          _active={{ transform: "translateY(0)" }}
          transition="all 0.2s ease"
          onClick={() => scrollToSection(sectionId)}
        >
          {label}
        </Button>
      );
    })}
  </Flex>
);

/** Línea + texto en versalitas verde arriba del título. */
export const Eyebrow = ({ text, center }) => (
  <Flex align="center" gap={4} justify={center ? "center" : "flex-start"}>
    <Box w={{ base: "20px", md: "40px" }} h="1px" bg="green" flexShrink={0} />
    <Text
      fontSize={{ base: "xs", md: "sm" }}
      letterSpacing={{ base: "0.15em", md: "0.3em" }}
      textTransform="uppercase"
      color="green"
    >
      {text}
    </Text>
    {center && (
      <Box w="20px" h="1px" bg="green" display={{ base: "block", md: "none" }} flexShrink={0} />
    )}
  </Flex>
);

/**
 * Franja de datos bajo el título: pares valor/etiqueta separados por una barra.
 * En el Hero deportivo lleva los clubes; en el del Portfolio, las métricas.
 */
export const HeroMetaStrip = ({ lead, items, center }) => {
  if (!items || items.length === 0) return null;

  return (
    <Flex
      align="center"
      gap={{ base: 2, md: 4 }}
      wrap="wrap"
      justify={center ? "center" : "flex-start"}
      pt={2}
    >
      {lead && (
        <>
          <Text fontSize="xs" letterSpacing="0.2em" textTransform="uppercase" opacity={0.6}>
            {lead}
          </Text>
          <Box w="1px" h={4} bg="whiteAlpha.400" />
        </>
      )}

      {items.map((item) => (
        <Text key={item} fontSize="xs" textTransform="uppercase" opacity={0.75} fontFamily="space">
          {item}
        </Text>
      ))}
    </Flex>
  );
};
