import { Box, Heading, Text, Stack, Flex, useColorMode } from "@chakra-ui/react";
import { MotionBox } from "./Motion";
import { HeroSideArt, HeroMobileArt, HeroHalo } from "./HeroArt";
import { useHeroParallax } from "../hooks/useHeroParallax";
import { Eyebrow, HeroActions, HeroMetaStrip } from "./HeroKit";
import { BRAND } from "../config/brand";
import { playersSummary } from "../data/players";

const EYEBROW_TEXT = "Landing Pages · Fútbol Profesional";

const ACTIONS = [
  { label: "Ver casos", sectionId: "casos", variant: "primary" },
  { label: "Contacto", sectionId: "contacto", variant: "secondary" },
];

/** Prueba social: clubes de los jugadores con caso publicado. */
const clubsLead = () =>
  `${playersSummary.count} ${playersSummary.count === 1 ? "jugador" : "jugadores"}`;

/**
 * Hero de la página Sportfolio: la línea de servicio de landings para
 * futbolistas. El título es el mismo que el del Portfolio a propósito — es la
 * misma marca personal — pero el eyebrow, el claim y los CTAs son deportivos.
 */
const Hero = () => {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const parallax = useHeroParallax();

  return (
    <Box
      id="home"
      minH="100vh"
      display="flex"
      alignItems="center"
      px={{ base: 6, md: 12, lg: 40 }}
      py={{ base: 12, md: 0 }}
      pt={{ base: 24, md: 0 }}
      position="relative"
      overflow="hidden"
    >
      <HeroSideArt
        dark={dark}
        style={parallax}
        side="right"
        alt="Matías Gunsett trabajando en un vestuario de fútbol"
      />
      <HeroMobileArt dark={dark} />
      <HeroHalo side="right" />

      {/* ===================== MOBILE ===================== */}
      <MotionBox
        display={{ base: "flex", md: "none" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        w="100%"
        position="relative"
        zIndex={1}
        gap={80}
      >
        <Flex flexDirection="column" alignItems="center" textAlign="center" gap={2}>
          <Eyebrow text={EYEBROW_TEXT} center color={dark ? "beige" : "green"} />

          <Heading
            fontSize={{ base: "6xl", sm: "7xl" }}
            lineHeight="0.95"
            letterSpacing="-0.02em"
            color={dark ? "green" : "yellow"}
            textShadow={dark ? "0 4px 24px rgba(0,0,0,0.7)" : "none"}
            mb={20}
          >
            MATÍAS
          </Heading>
        </Flex>
        <Stack spacing={4} align="center" w="100%">
          <Heading
            fontSize={{ base: "6xl", sm: "7xl" }}
            lineHeight="0.95"
            letterSpacing="-0.02em"
            color={dark ? "beige" : "green"}
            textShadow={dark ? "0 4px 24px rgba(0,0,0,0.7)" : "0 4px 24px rgba(245,240,230,0.85)"}
          >
            GUNSETT
          </Heading>
          <Flex align="center" gap={0} justify="center">
            <Box w="24px" h="3px" bg={dark ? "yellow" : "black"} flexShrink={0} />
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              letterSpacing="0.1em"
              textTransform="uppercase"
              fontWeight="semibold"
            >
              Webs para Deportistas Profesionales
            </Text>
            <Box w="24px" h="3px" bg={dark ? "yellow" : "black"} flexShrink={0} />
          </Flex>
          <HeroActions actions={ACTIONS} full />
        </Stack>
      </MotionBox>

      {/* ===================== DESKTOP ===================== */}
      <MotionBox
        display={{ base: "none", md: "block" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        w="100%"
        position="relative"
        zIndex={1}
      >
        <Stack spacing={7} maxW={{ md: "50%", lg: "48%" }}>
          <Eyebrow text={EYEBROW_TEXT} />

          <Heading fontSize={{ md: "6xl", lg: "7xl", xl: "8xl" }} lineHeight="1">
            MATÍAS <br />
            <Box as="span" color="green">GUNSETT</Box>
          </Heading>

          <Text
            fontSize={{ md: "md", lg: "lg", xl: "xl" }}
            letterSpacing="0.12em"
            textTransform="uppercase"
            fontWeight="semibold"
          >
            Webs para Deportistas Profesionales
          </Text>

          <Text fontSize="sm" letterSpacing="0.15em" textTransform="uppercase" opacity={0.65} mt={-3}>
            {BRAND.roleSecondary}
          </Text>

          <HeroMetaStrip lead={clubsLead()} items={playersSummary.clubs} />

          <HeroActions actions={ACTIONS} />
        </Stack>
      </MotionBox>
    </Box>
  );
};

export default Hero;
