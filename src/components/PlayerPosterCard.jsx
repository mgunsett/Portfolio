import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
import { MotionBox, MotionFlex, MotionImage } from "./Motion";

/**
 * Proporción de la card. Las capturas son de la web en desktop (~16:9), así
 * que un recuadro 16:10 las recorta apenas por los costados —donde una landing
 * casi siempre tiene margen— en lugar de comerse el diseño. De paso rima con
 * la pantalla del LaptopFrame que aparece dentro del modal.
 */
const CARD_RATIO = "16 / 10";

/**
 * Velo inferior. Arranca a media card para que el nombre se lea sobre negro
 * sólido sin tapar la mitad de arriba de la captura, que es la que vende.
 */
const SCRIM =
  "linear(to-t, rgba(11,11,11,0.97) 0%, rgba(11,11,11,0.82) 38%, rgba(11,11,11,0.15) 72%, transparent 100%)";

/** Remate de marca: la regla verde que crece y el punto amarillo, como en los destacados. */
const BrandRule = () => (
  <Flex align="center" gap={2} w="100%" mt={2} mb={1}>
    <MotionBox
      h="1px"
      bg="green"
      flex="1"
      transformOrigin="left center"
      variants={{ rest: { scaleX: 0.18 }, hover: { scaleX: 1 } }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    />
    <Box w="5px" h="5px" borderRadius="full" bg="yellow" flexShrink={0} />
  </Flex>
);

/** Pie de la card: índice, posición · club, nombre y la invitación a abrir. */
const PosterFooter = ({ player, index, reduced }) => {
  const { name, position, club } = player.player;

  return (
    <MotionBox
      position="relative"
      px={{ base: 4, md: 5 }}
      pb={{ base: 4, md: 5 }}
      w="100%"
      variants={reduced ? undefined : { rest: { y: 0 }, hover: { y: -4 } }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Flex align="center" gap={2} mb={1.5}>
        <Text fontFamily="space" fontSize="10px" color="yellow" opacity={0.7} letterSpacing="0.1em">
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
          {[position, club].filter(Boolean).join(" · ")}
        </Text>
      </Flex>

      <Heading
        as="h3"
        fontFamily='"Syne", sans-serif'
        fontSize={{ base: "lg", md: "xl" }}
        textTransform="uppercase"
        lineHeight="1.1"
        color="beige"
        noOfLines={1}
      >
        {name}
      </Heading>

      <BrandRule />

      {/* La invitación se enciende con el hover. En touch no hay hover, así que
          de base queda visible a media opacidad en vez de desaparecer. */}
      <MotionBox
        variants={{ rest: { opacity: 0.45, y: 0 }, hover: { opacity: 1, y: reduced ? 0 : -2 } }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Text
          fontFamily="space"
          fontSize="11px"
          letterSpacing="0.12em"
          textTransform="uppercase"
          color="beige"
        >
          Ver caso →
        </Text>
      </MotionBox>
    </MotionBox>
  );
};

/**
 * Card del carrusel de "Más proyectos": la captura de la landing a sangre y la
 * ficha del jugador al pie, sobre el velo.
 *
 * Es la contracara de PlayerCard —que muestra la versión mobile dentro de un
 * teléfono—: acá la web se ve en su formato desktop y sin marco, para que la
 * sección se lea distinta de un vistazo aunque el contenido sea del mismo tipo.
 * El click abre el mismo PlayerCaseModal que los destacados.
 */
const PlayerPosterCard = ({ player, index, onOpen }) => {
  const reduced = useReducedMotion();

  return (
    <MotionFlex
      as="button"
      type="button"
      onClick={() => onOpen(player)}
      aria-label={"Ver el caso de " + player.player.name}
      direction="column"
      justify="flex-end"
      position="relative"
      w="100%"
      textAlign="left"
      cursor="pointer"
      userSelect="none"
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
        rest: { borderColor: "rgba(255,255,255,0.12)" },
        hover: { borderColor: "#2D5A47" },
      }}
      _focusVisible={{ outline: "2px solid", outlineColor: "yellow", outlineOffset: "3px" }}
    >
      {/* La captura llena la card y se ancla arriba, que es donde está el hero
          de cualquier landing. `draggable` off: el arrastre nativo de la imagen
          le robaría el gesto al del carrusel. */}
      <MotionImage
        src={player.cover}
        alt={"Captura de la landing de " + player.player.name}
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

      <Box position="absolute" inset={0} bgGradient={SCRIM} pointerEvents="none" />

      {/* Año: ubica el trabajo en el tiempo sin robarle lugar al nombre. */}
      <Text
        position="absolute"
        top={3}
        right={3}
        px={2.5}
        py={1}
        borderRadius="full"
        bg="blackAlpha.600"
        backdropFilter="blur(6px)"
        fontFamily="space"
        fontSize="10px"
        letterSpacing="0.1em"
        color="beige"
      >
        {player.year}
      </Text>

      <PosterFooter player={player} index={index} reduced={reduced} />
    </MotionFlex>
  );
};

export default PlayerPosterCard;
