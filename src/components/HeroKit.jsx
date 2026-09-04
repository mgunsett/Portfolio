import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { scrollToSection } from "../utils/scrollToSection";
import { useColorMode } from "@chakra-ui/react";
const useDarkMode = () => {
  const { colorMode } = useColorMode();
  return colorMode === "dark";
};

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
export const Eyebrow = ({ text, center, color }) => (
  <Flex align="center" gap={4} justify={center ? "center" : "flex-start"}>
    <Box w={{ base: "20px", md: "40px" }} h="1px" bg={color ?? "green"} flexShrink={0} />
    <Text
      fontSize={{ base: "xs", md: "sm" }}
      letterSpacing={{ base: "0.15em", md: "0.3em" }}
      textTransform="uppercase"
      color={color ?? "green"}
    >
      {text}
    </Text>
    {center && (
      <Box w="20px" h="1px" bg={color ?? "green"} display={{ base: "block", md: "none" }} flexShrink={0} />
    )}
  </Flex>
);

/**
 * Franja de datos bajo el título: pares valor/etiqueta separados por una barra.
 * En el Hero deportivo lleva los clubes; en el del Portfolio, las métricas.
 *
 * `limit` recorta la lista y `more` es el remate que avisa que hay más detrás.
 * Los dos son opcionales a propósito: la franja de clubes se corta en tres para
 * no comerse dos renglones, pero el Portfolio muestra sus tres métricas enteras
 * y ahí un "y más..." sería mentira.
 */
export const HeroMetaStrip = ({ lead, items, center, limit, more }) => {
  const accent = useDarkMode() ? "yellow" : "green";

  if (!items || items.length === 0) return null;

  const shown = limit ? items.slice(0, limit) : items;
  const hasMore = Boolean(more) && shown.length < items.length;

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
          <Text
            fontSize="xs"
            letterSpacing="0.2em"
            color={accent}
            textTransform="uppercase"
            opacity={0.6}
          >
            {lead}
          </Text>
          <Box w="2px" h={4} bg={accent} />
        </>
      )}

      {shown.map((item) => (
        <Text
          key={item}
          fontSize="xs"
          color={accent}
          textTransform="uppercase"
          opacity={0.75}
          fontFamily="space"
        >
          {item}
        </Text>
      ))}

      {hasMore && (
        <Text fontSize="xs" opacity={0.6} fontFamily="space">
          {more}
        </Text>
      )}
    </Flex>
  );
};
