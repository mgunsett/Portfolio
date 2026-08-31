import { Box, Heading, Text, Stack, Flex, useColorMode } from "@chakra-ui/react";
import { MotionBox } from "./Motion";
import { HeroAvatar, HeroHalo } from "./HeroArt";
import { useHeroParallax } from "../hooks/useHeroParallax";
import { Eyebrow, HeroActions, HeroMetaStrip } from "./HeroKit";
import { BRAND } from "../config/brand";

const EYEBROW_TEXT = "Front-End Developer · React.js";
const CLAIM = "Interfaces y Aplicaciones Web a Medida";
const AVATAR_ALT = "Ilustración 3D de Matías Gunsett programando en su notebook";

const ACTIONS = [
  { label: "Ver proyectos", sectionId: "proyectos", variant: "primary" },
  { label: "Contacto", sectionId: "contacto", variant: "secondary" },
];

/** Las métricas del perfil se muestran como "3+ Años de experiencia". */
const STATS = BRAND.stats.map(({ value, label }) => `${value} ${label}`);

/**
 * Hero de la página principal: Matías como Front-End Developer.
 *
 * El avatar (blob verde + figura) no es un fondo — es parte de la
 * composición. En mobile
 * parte el nombre en dos (MATÍAS arriba, GUNSETT abajo) y se planta en el
 * medio; en desktop se apoya a la izquierda como figura contenida, con el
 * texto alineado a la derecha. El Hero de Sportfolio sigue con la foto de
 * fondo a sangre (HeroSideArt), para que las dos páginas no se lean iguales.
 */
const HeroPortfolio = () => {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const parallax = useHeroParallax();

  // El parallax del panel lateral escala 1.1 para tapar los bordes del recorte;
  // acá la figura va suelta, así que solo nos quedamos con el desplazamiento.
  const avatarParallax = { ...parallax, scale: 1 };

  return (
    <Box
      id="home"
      minH="100vh"
      display="flex"
      alignItems="center"
      px={{ base: 6, md: 8, lg: 16, xl: 24 }}
      py={{ base: 10, md: 0 }}
      pt={{ base: 24, md: 0 }}
      position="relative"
      overflow="hidden"
    >
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
        maxW="520px"
        mx="auto"
        position="relative"
        zIndex={1}
        gap={5}
      >
        <Eyebrow text={EYEBROW_TEXT} center />

        {/* Un único Heading envuelve nombre + avatar: partirlo en dos headings
            dejaría "MATÍAS" y "GUNSETT" como títulos sueltos. El avatar va con
            alt vacío porque acá es parte del logotipo, no información nueva. */}
        <Heading
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          w="100%"
          fontSize="clamp(2.5rem, 12.5vw, 4.25rem)"
          lineHeight="0.9"
          letterSpacing="-0.02em"
          textShadow={dark ? "0 4px 24px rgba(0,0,0,0.7)" : "0 4px 24px rgba(245,240,230,0.85)"}
        >
          <Box as="span">MATÍAS</Box>

          <HeroAvatar w="min(68vw, 290px)" dark={dark} />

          <Box as="span" color="green">GUNSETT</Box>
        </Heading>

        <Stack spacing={4} align="center" w="100%">
          <Flex align="center" gap={3} justify="center">
            <Box w="24px" h="3px" bg="yellow" flexShrink={0} />
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              letterSpacing="0.1em"
              textTransform="uppercase"
              fontWeight="semibold"
            >
              {CLAIM}
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
      <Flex
        display={{ base: "none", md: "flex" }}
        w="100%"
        maxW="1100px"
        mx="auto"
        align="center"
        gap={{ md: 6, lg: 8, xl: 10 }}
        position="relative"
        zIndex={1}
      >
        <MotionBox
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          flexShrink={0}
        >
          <HeroAvatar
            w={{
              md: "clamp(220px, 32vw, 340px)",
              lg: "clamp(300px, 34vw, 420px)",
              xl: "clamp(380px, 32vw, 460px)",
            }}
            style={avatarParallax}
            alt={AVATAR_ALT}
            dark={dark}
          />
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          flex="1"
          minW={0}
        >
          <Stack spacing={7} textAlign="right">
            <Flex justify="flex-end">
              <Eyebrow text={EYEBROW_TEXT} />
            </Flex>

            <Heading
              fontSize={{ md: "5xl", lg: "6xl", xl: "7xl" }}
              lineHeight="1"
              letterSpacing="-0.02em"
            >
              MATÍAS <br />
              <Box as="span" color="green">GUNSETT</Box>
            </Heading>

            <Text
              fontSize={{ md: "sm", lg: "md", xl: "xl" }}
              letterSpacing="0.12em"
              textTransform="uppercase"
              fontWeight="semibold"
            >
              {CLAIM}
            </Text>

            <Text fontSize="sm" letterSpacing="0.15em" textTransform="uppercase" opacity={0.65} mt={-3}>
              Especialidad · {BRAND.role}
            </Text>

            <Flex justify="flex-end">
              <HeroMetaStrip items={STATS} />
            </Flex>

            <Flex justify="flex-end">
              <HeroActions actions={ACTIONS} />
            </Flex>
          </Stack>
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default HeroPortfolio;
