import { Box, Heading, Text, Stack, Flex, useColorMode } from "@chakra-ui/react";
import { MotionBox } from "./Motion";
import { HeroAvatar, HeroHalo } from "./HeroArt";
import { useHeroParallax } from "../hooks/useHeroParallax";
import { Eyebrow, HeroActions, HeroMetaStrip } from "./HeroKit";
import { BRAND } from "../config/brand";
import "../style/style.css";

const EYEBROW_TEXT = "Portfolio";
const CLAIM = "Front-End Dev · React.js";
const AVATAR_ALT = "Ilustración 3D de Matías Gunsett programando en su notebook";

const ACTIONS = [
  { label: "Ver proyectos", sectionId: "proyectos", variant: "primary" },
  { label: "Contacto", sectionId: "contacto", variant: "secondary" },
];

const STATS = BRAND.stats.map(({ value, label }) => `${value} ${label}`);

const HeroPortfolio = () => {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const parallax = useHeroParallax();

  const avatarParallax = { ...parallax, scale: 1 };

  return (
    <Box
      id="home"
      minH="100vh"
      display="flex"
      alignItems="center"
      px={{ base: 6, md: 8, lg: 10, xl: 20 }}
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
        justifyContent="center"
        alignItems="center"
        w="100%"
        position="relative"
        zIndex={1}
        gap={8}
      >
        <Eyebrow text={EYEBROW_TEXT} center />
        <Heading
          className="hero-portfolio-heading-mobile"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={0}
          w="100%"
          mb={56}
          fontSize='75px'
          lineHeight="0.9"
          letterSpacing="-0.02em"
          textShadow={dark ? "0 4px 24px rgba(0,0,0,0.7)" : "0 4px 24px rgba(245,240,230,0.85)"}
        >
          <Box as="span" color='green'>MATÍAS</Box>
          <Box as="span">GUNSETT</Box>
        </Heading>
        <HeroAvatar  w="min(78vw, 420px)" dark={dark} />
        <Stack spacing={4} align="center" w="100%" mt={20}>
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
        maxW="1250px"
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
              md: "clamp(220px, 32vw, 400px)",
              lg: "clamp(300px, 34vw, 500px)",
              xl: "clamp(380px, 32vw, 600px)",
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
              fontSize={{ md: "6xl", lg: "7xl", xl: "8xl" }}
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
