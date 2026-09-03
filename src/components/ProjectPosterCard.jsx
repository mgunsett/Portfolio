import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
import { MotionBox, MotionFlex, MotionImage } from "./Motion";

/**
 * Proporción de la card. Las capturas son de la web en desktop (~16:9), así
 * que un recuadro 16:10 las recorta apenas por los costados —donde una landing
 * casi siempre tiene margen— en lugar de comerse el diseño.
 */
const CARD_RATIO = "16 / 10";

/**
 * Velo inferior, uno por modo de color. Arranca a media card para que el
 * nombre se lea sobre fondo sólido sin tapar la mitad de arriba de la captura,
 * que es la que vende.
 *
 * A diferencia de la card de jugadores —que es siempre oscura, tipo póster—
 * acá el velo sigue al tema de la página: en claro es beige con texto negro.
 * Las paradas son las mismas en ambos para que la transición no cambie la
 * composición, solo el color.
 */
const SCRIM_DARK =
  "linear(to-t, rgba(11,11,11,0.97) 0%, rgba(11,11,11,0.82) 38%, rgba(11,11,11,0.15) 72%, transparent 100%)";
const SCRIM_LIGHT =
  "linear(to-t, rgba(245,240,230,0.98) 0%, rgba(245,240,230,0.88) 38%, rgba(245,240,230,0.2) 72%, transparent 100%)";

/** Remate de marca: la regla verde que crece y el punto, como en los destacados. */
const BrandRule = ({ dotColor }) => (
  <Flex align="center" gap={2} w="100%" mt={2} mb={1}>
    <MotionBox
      h="1px"
      bg="green"
      flex="1"
      transformOrigin="left center"
      variants={{ rest: { scaleX: 0.18 }, hover: { scaleX: 1 } }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    />
    <Box w="5px" h="5px" borderRadius="full" bg={dotColor} flexShrink={0} />
  </Flex>
);

/** Pie de la card: índice, categoría, nombre del proyecto y la invitación a abrir. */
const ProjectFooter = ({ project, index, reduced, textColor, accent, ctaRest }) => (
  <MotionBox
    position="relative"
    px={{ base: 4, md: 5 }}
    pb={{ base: 4, md: 5 }}
    w="100%"
    variants={reduced ? undefined : { rest: { y: 0 }, hover: { y: -4 } }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    <Flex align="center" gap={2} mb={1.5}>
      <Text fontFamily="space" fontSize="10px" color={accent} opacity={0.75} letterSpacing="0.1em">
        {String(index + 1).padStart(2, "0")}
      </Text>
      <Text
        fontSize="9px"
        letterSpacing="0.2em"
        textTransform="uppercase"
        fontWeight="semibold"
        color="green"
        noOfLines={1}
      >
        {project.category}
      </Text>
    </Flex>

    <Heading
      as="h3"
      fontFamily='"Syne", sans-serif'
      fontSize={{ base: "lg", md: "xl" }}
      textTransform="uppercase"
      lineHeight="1.1"
      color={textColor}
      noOfLines={1}
    >
      {project.name}
    </Heading>

    <BrandRule dotColor={accent} />

    {/* La invitación se enciende con el hover. En touch no hay hover, así que
        de base queda visible a media opacidad en vez de desaparecer. */}
    <MotionBox
      variants={{ rest: { opacity: ctaRest, y: 0 }, hover: { opacity: 1, y: reduced ? 0 : -2 } }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Text
        fontFamily="space"
        fontSize="11px"
        letterSpacing="0.12em"
        textTransform="uppercase"
        color={textColor}
      >
        Ver proyecto →
      </Text>
    </MotionBox>
  </MotionBox>
);

/**
 * Card de la grilla de "Otros trabajos": la captura del sitio a sangre y, al
 * pie sobre el velo, el nombre del proyecto con su categoría.
 *
 * Comparte lenguaje con PlayerPosterCard —misma proporción, mismo velo, mismo
 * remate de marca— para que las dos secciones de trabajos se lean como una
 * familia. Se diferencian en el soporte: aquella vive en un carrusel y es
 * siempre oscura; esta va en grilla de tres columnas y sigue el modo de color.
 * El click abre el mismo ModalProyects de siempre.
 */
const ProjectPosterCard = ({ project, index, onOpen }) => {
  const reduced = useReducedMotion();

  const scrim = useColorModeValue(SCRIM_LIGHT, SCRIM_DARK);
  const textColor = useColorModeValue("background", "beige");
  // El amarillo de marca se apaga contra el beige, así que en claro el remate
  // lo toma el verde.
  const accent = useColorModeValue("green", "yellow");
  const restBorder = useColorModeValue("rgba(11,11,11,0.14)", "rgba(255,255,255,0.12)");
  const pillBg = useColorModeValue("rgba(245,240,230,0.72)", "rgba(11,11,11,0.6)");
  const ctaRest = useColorModeValue(0.6, 0.45);

  return (
    <MotionFlex
      as="button"
      type="button"
      onClick={() => onOpen(project)}
      aria-label={"Ver el proyecto " + project.name}
      direction="column"
      justify="flex-end"
      position="relative"
      w="100%"
      textAlign="left"
      cursor="pointer"
      overflow="hidden"
      borderRadius="16px"
      border="1px solid"
      bg="surface"
      sx={{ aspectRatio: CARD_RATIO }}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={{
        rest: { borderColor: restBorder },
        hover: { borderColor: "#2D5A47" },
      }}
      _focusVisible={{ outline: "2px solid", outlineColor: "green", outlineOffset: "3px" }}
    >
      {/* La captura llena la card y se ancla arriba, que es donde está el hero
          de cualquier landing. */}
      <MotionImage
        src={project.cover}
        alt={"Captura del sitio de " + project.name}
        draggable={false}
        loading="lazy"
        decoding="async"
        position="absolute"
        inset={0}
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition="top center"
        variants={reduced ? undefined : { rest: { scale: 1 }, hover: { scale: 1.07 } }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <Box position="absolute" inset={0} bgGradient={scrim} pointerEvents="none" />

      {/* Año: ubica el trabajo en el tiempo sin robarle lugar al nombre. */}
      <Text
        position="absolute"
        top={3}
        right={3}
        px={2.5}
        py={1}
        borderRadius="full"
        bg={pillBg}
        backdropFilter="blur(6px)"
        fontFamily="space"
        fontSize="10px"
        letterSpacing="0.1em"
        color={textColor}
      >
        {project.year}
      </Text>

      <ProjectFooter
        project={project}
        index={index}
        reduced={reduced}
        textColor={textColor}
        accent={accent}
        ctaRest={ctaRest}
      />
    </MotionFlex>
  );
};

export default ProjectPosterCard;
