import { Box, Heading, Text, Stack, Button, Flex, useColorMode } from "@chakra-ui/react";
import { MotionBox, MotionImage } from "./Motion";
import { useMotionValue, useTransform } from "framer-motion";
import fondoPortfolio from "../assets/fondo_portfolio.webp";
import { useEffect } from "react";
import { BRAND } from "../config/brand";
import { playersSummary } from "../data/players";

// Colores base del tema, necesarios en los degradados (no se pueden usar tokens dentro de gradients)
const BG_DARK = "#0B0B0B";
const BG_LIGHT = "#F5F0E6";

// Máscaras de difuminado del panel derecho: se aplican en dos capas anidadas
// (vertical en el contenedor, horizontal en el interior) para no depender de mask-composite.
const FADE_VERTICAL =
  "linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)";
const FADE_HORIZONTAL =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 7%, rgba(0,0,0,0.7) 16%, #000 62%)";
// Máscara del fondo mobile: elipse suave que disuelve los cuatro bordes
const FADE_RADIAL =
  "radial-gradient(ellipse 85% 60% at 50% 42%, #000 0%, rgba(0,0,0,0.8) 45%, transparent 80%)";

// Velos que integran la imagen con el fondo del tema activo
const VEIL_SIDE_DARK = `linear-gradient(to right, ${BG_DARK} 0%, rgba(11,11,11,0.6) 28%, rgba(11,11,11,0.1) 68%, rgba(11,11,11,0.35) 100%)`;
const VEIL_SIDE_LIGHT = `linear-gradient(to right, ${BG_LIGHT} 0%, rgba(245, 240, 230, 0.29) 18%, rgba(245,240,230,0.4) 68%, rgba(245, 240, 230, 0.18) 100%)`;
const VEIL_FULL_DARK = `radial-gradient(ellipse 70% 55% at 50% 45%, rgba(11,11,11,0.55) 0%, rgba(11,11,11,0.8) 100%)`;
const VEIL_FULL_LIGHT = `radial-gradient(ellipse 70% 55% at 50% 45%, rgba(245, 240, 230, 0.19) 0%, rgba(245, 240, 230, 0.42) 100%)`;

/**
 * Imagen principal del Hero en desktop: panel a la derecha que ocupa todo el alto,
 * difuminado hacia el fondo del tema en el borde izquierdo y en top/bottom.
 */
const HeroSideArt = ({ dark, style }) => (
  <Box
    display={{ base: "none", md: "block" }}
    position="absolute"
    top={0}
    bottom={0}
    right={0}
    w={{ md: "58%", lg: "64%" }}
    zIndex={0}
    pointerEvents="none"
    overflow="hidden"
    sx={{ maskImage: FADE_VERTICAL, WebkitMaskImage: FADE_VERTICAL }}
  >
    <Box
      position="absolute"
      inset={0}
      overflow="hidden"
      sx={{ maskImage: FADE_HORIZONTAL, WebkitMaskImage: FADE_HORIZONTAL }}
    >
      <MotionImage
        src={fondoPortfolio}
        alt="Matías Gunsett trabajando en un vestuario de fútbol"
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition="50% 42%"
        
        filter={dark ? "saturate(1.05)" :  "saturate(1.05)"}
        fetchPriority="high"
        style={style}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      />
      <Box position="absolute" inset={0} bgImage={dark ? VEIL_SIDE_DARK : 'transparent'} />
    </Box>
  </Box>
);

/**
 * Misma imagen en mobile, pero como fondo a sangre detrás de todo el contenido:
 * opacidad baja + velo para que el texto siga siendo legible en ambos modos.
 */
const HeroMobileArt = ({ dark }) => (
  <Box
    display={{ base: "block", md: "none" }}
    position="absolute"
    inset={0}
    zIndex={0}
    pointerEvents="none"
    aria-hidden="true"
    overflow="hidden"
    sx={{ maskImage: FADE_RADIAL, WebkitMaskImage: FADE_RADIAL }}
  >
    <Box
      as="img"
      src={fondoPortfolio}
      alt=""
      w="100%"
      h="100%"
      objectFit="cover"
      objectPosition="50% 40%"
      opacity={dark ? 0.4 : 0.24}
      filter={dark ? "saturate(1.05)" : "brightness(1.2) contrast(0.85) saturate(0.85)"}
    />
    <Box position="absolute" inset={0} bgImage={dark ? VEIL_FULL_DARK : VEIL_FULL_LIGHT} />
  </Box>
);

// Botones de acción reutilizados en mobile y desktop
const HeroActions = ({ onProjects, onContact, full }) => (
  <Flex gap={4} w={full ? "100%" : "auto"} pt={{ base: 1, md: 0 }}>
    <Button
      bg="green"
      color="beige"
      size="lg"
      px={8}
      h={{ base: 14, md: 12 }}
      flex={full ? 1 : "initial"}
      borderRadius="xl"
      boxShadow="0 10px 30px -10px rgba(45,90,71,0.6)"
      _hover={{ bg: "green", opacity: 0.9, transform: "translateY(-2px)" }}
      _active={{ transform: "translateY(0)" }}
      transition="all 0.2s ease"
      onClick={onProjects}
    >
      Ver casos
    </Button>
    <Button
      bg="yellow"
      color="black"
      size="lg"
      px={8}
      h={{ base: 14, md: 12 }}
      flex={full ? 1 : "initial"}
      borderRadius="xl"
      boxShadow="0 10px 30px -12px rgba(232,213,163,0.7)"
      _hover={{ bg: "yellow", opacity: 0.9, transform: "translateY(-2px)" }}
      _active={{ transform: "translateY(0)" }}
      transition="all 0.2s ease"
      onClick={onContact}
    >
      Contacto
    </Button>
  </Flex>
);

const EYEBROW_TEXT = "Landing Pages · Fútbol Profesional";

const Eyebrow = ({ center }) => (
  <Flex align="center" gap={4} justify={center ? "center" : "flex-start"}>
    <Box w={{ base: "20px", md: "40px" }} h="1px" bg="green" flexShrink={0} />
    <Text
      fontSize={{ base: "xs", md: "sm" }}
      letterSpacing={{ base: "0.15em", md: "0.3em" }}
      textTransform="uppercase"
      color="green"
    >
      {EYEBROW_TEXT}
    </Text>
    {center && <Box w="20px" h="1px" bg="green" display={{ base: "block", md: "none" }} flexShrink={0} />}
  </Flex>
);

/**
 * Prueba social bajo el Hero: clubes de los jugadores con caso publicado.
 * Se oculta solo mientras no haya casos cargados, para no mostrar un vacío.
 */
const ClubsStrip = ({ center }) => {
  if (playersSummary.clubs.length === 0) return null;

  return (
    <Flex
      align="center"
      gap={{ base: 2, md: 4 }}
      wrap="wrap"
      justify={center ? "center" : "flex-start"}
      pt={2}
    >
      <Text fontSize="xs" letterSpacing="0.2em" textTransform="uppercase" opacity={0.6}>
        {playersSummary.count} {playersSummary.count === 1 ? "jugador" : "jugadores"}
      </Text>
      <Box w="1px" h={4} bg="whiteAlpha.400" />
      {playersSummary.clubs.map((club) => (
        <Text key={club} fontSize="xs" textTransform="uppercase" opacity={0.75} fontFamily="space">
          {club}
        </Text>
      ))}
    </Flex>
  );
};

const Hero = () => {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax suave: solo desplazamiento y un leve escalado, para que el recorte
  // nunca deje ver los bordes duros del panel.
  const translateX = useTransform(mouseX, [-0.5, 0.5], [14, -14]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;

      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  //Scroll a secciones
  const scrollToSectionSlow = (sectionId, duration = 1600) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const goProjects = () => scrollToSectionSlow("casos");
  const goContact = () => scrollToSectionSlow("contacto");

  return (
    <Box
      id="home"
      minH="100vh"
      display="flex"
      alignItems="center"
      px={{ base: 6, md: 12, lg: 40 }}
      py={{ base: 12, md: 0 }}
      position="relative"
      overflow="hidden"
    >
      {/* Imagen principal: panel derecho en desktop, fondo a sangre en mobile */}
      <HeroSideArt dark={dark} style={{ x: translateX, y: translateY, scale: 1.1 }} />
      <HeroMobileArt dark={dark} />

      {/* Halos de color para profundidad: van sobre la imagen para fundirla con el tema */}
      <Box
        position="absolute"
        top={{ base: "-8%", md: "0%" }}
        right={{ base: "-25%", md: "5%" }}
        w={{ base: "320px", md: "520px" }}
        h={{ base: "320px", md: "520px" }}
        bg="#fff8f8af"
        opacity={0.18}
        filter="blur(90px)"
        borderRadius="full"
        pointerEvents="none"
        zIndex={0}
      />
      

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
        <Eyebrow center />

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
              Webs para Futbolistas Profesionales
            </Text>
            <Box w="24px" h="3px" bg="yellow" flexShrink={0} />
          </Flex>

          <Text fontSize="xs" letterSpacing="0.15em" textTransform="uppercase" opacity={0.65}>
            {BRAND.roleSecondary}
          </Text>

          <ClubsStrip center />

          <HeroActions onProjects={goProjects} onContact={goContact} full />
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
          <Eyebrow />

          <Heading fontSize={{ md: "6xl", lg: "7xl", xl: "8xl" }} lineHeight="1">
            MATÍAS <br />
            <Box as="span" color="green">GUNSETT</Box>
          </Heading>

          <Flex align="center" gap={4}>
            
            <Text fontSize={{ md: "md", lg: "lg", xl: "xl" }} letterSpacing="0.12em" textTransform="uppercase" fontWeight="semibold">
              Webs para Deportistas Profesionales
            </Text>
          </Flex>

          <Text fontSize="sm" letterSpacing="0.15em" textTransform="uppercase" opacity={0.65} mt={-3}>
            {BRAND.roleSecondary}
          </Text>

          <ClubsStrip />

          <HeroActions onProjects={goProjects} onContact={goContact} />
        </Stack>
      </MotionBox>
    </Box>
  );
};

export default Hero;
