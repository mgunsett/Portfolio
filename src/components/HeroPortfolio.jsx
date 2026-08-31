import { Box, Heading, Text, Stack, Flex, useColorMode } from "@chakra-ui/react";
import { MotionBox } from "./Motion";
import { HeroSideArt, HeroMobileArt, HeroHalo } from "./HeroArt";
import { useHeroParallax } from "../hooks/useHeroParallax";
import { Eyebrow, HeroActions, HeroMetaStrip } from "./HeroKit";
import { BRAND } from "../config/brand";

const EYEBROW_TEXT = "Front-End Developer · React.js";

const ACTIONS = [
  { label: "Ver proyectos", sectionId: "proyectos", variant: "primary" },
  { label: "Contacto", sectionId: "contacto", variant: "secondary" },
];

/** Las métricas del perfil se muestran como "3+ Años de experiencia". */
const STATS = BRAND.stats.map(({ value, label }) => `${value} ${label}`);

/**
 * Hero de la página principal: Matías como Front-End Developer.
 *
 * Comparte imagen, parallax y tipografía con el Hero de Sportfolio, pero apoya
 * el panel del lado opuesto y habla del perfil general en vez del servicio
 * deportivo, que queda nombrado como especialidad y se explora en /sportfolio.
 */
const HeroPortfolio = () => {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const parallax = useHeroParallax();

  return (
    <Box
      id="home"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent={{ md: "flex-end" }}
      px={{ base: 6, md: 12, lg: 40 }}
      py={{ base: 12, md: 0 }}
      pt={{ base: 24, md: 0 }}
      position="relative"
      overflow="hidden"
    >
      <HeroSideArt
        dark={dark}
        style={parallax}
        side="left"
        alt="Matías Gunsett, desarrollador front-end, trabajando"
      />
      <HeroMobileArt dark={dark} />
      <HeroHalo side="left" />

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
        gap={6}
      >
        <Eyebrow text={EYEBROW_TEXT} center />

        <Heading
          fontSize={{ base: "6xl", sm: "7xl" }}
          lineHeight="0.95"
          letterSpacing="-0.02em"
          textShadow={dark ? "0 4px 24px rgba(0,0,0,0.7)" : "0 4px 24px rgba(245,240,230,0.85)"}
        >
          MATÍAS
          <br />
          <Box as="span" color="green">GUNSETT</Box>
        </Heading>

        <Stack spacing={5} align="center" w="100%">
          <Flex align="center" gap={3} justify="center">
            <Box w="24px" h="3px" bg="yellow" flexShrink={0} />
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              letterSpacing="0.1em"
              textTransform="uppercase"
              fontWeight="semibold"
            >
              Interfaces y Aplicaciones Web a Medida
            </Text>
            <Box w="24px" h="3px" bg="yellow" flexShrink={0} />
          </Flex>

          <Text fontSize="xs" letterSpacing="0.15em" textTransform="uppercase" opacity={0.65}>
            Especialidad · {BRAND.role}
          </Text>

          <HeroMetaStrip items={STATS} center />

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
        <Stack spacing={7} maxW={{ md: "50%", lg: "48%" }} ml="auto" textAlign={{ md: "right" }}>
          <Flex justify={{ md: "flex-end" }}>
            <Eyebrow text={EYEBROW_TEXT} />
          </Flex>

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
            Interfaces y Aplicaciones Web a Medida
          </Text>

          <Text fontSize="sm" letterSpacing="0.15em" textTransform="uppercase" opacity={0.65} mt={-3}>
            Especialidad · {BRAND.role}
          </Text>

          <Flex justify={{ md: "flex-end" }}>
            <HeroMetaStrip items={STATS} />
          </Flex>

          <Flex justify={{ md: "flex-end" }}>
            <HeroActions actions={ACTIONS} />
          </Flex>
        </Stack>
      </MotionBox>
    </Box>
  );
};

export default HeroPortfolio;
