import { Badge, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { MotionFlex, MotionBox } from "./Motion";
import matiAvatar from "../assets/mati_avatar.webp";

/**
 * Avatar apoyado sobre la esquina superior izquierda de la card.
 *
 * La geometría sale del render: el antebrazo apoya al 31% de la altura del
 * avatar, o sea que el 69% restante del cuerpo cuelga por debajo del punto de
 * apoyo. Para que ese punto caiga sobre el borde superior y los pies lleguen
 * a la base de la card, el avatar tiene que medir 1 / 0.69 ≈ 136% del alto de
 * la card; el excedente (~36%) es la cabeza y los hombros asomando por arriba.
 *
 * `w="auto"` deja que el ancho salga del aspect ratio, y `right="82%"` hace
 * que solo el antebrazo pise la card: el cuerpo cae en el margen que le
 * reserva la grilla (ver `pl` en PlayersShowcase). Debajo de xl no hay margen
 * lateral suficiente, así que no se muestra.
 */
const LeaningAvatar = () => (
  <Image
    src={matiAvatar}
    alt=""
    aria-hidden="true"
    display={{ base: "none", xl: "block" }}
    position="absolute"
    right="82%"
    bottom={0}
    h="136%"
    w="auto"
    maxW="none"
    zIndex={3}
    pointerEvents="none"
    filter="drop-shadow(0 18px 30px rgba(0, 0, 0, 0.55))"
  />
);

/**
 * Card de un caso de jugador.
 *
 * En status "coming" mantiene exactamente el mismo esqueleto y proporciones,
 * con un overlay de "Próximamente": la grilla nunca se ve incompleta mientras
 * se termina de reunir el material de un caso.
 *
 * `withAvatar` reserva el efecto del avatar apoyado para una sola card de la
 * grilla (la primera): repetido en todas perdería la gracia.
 */
const PlayerCard = ({ player, onOpen, withAvatar = false }) => {
  const isComing = player.status === "coming";
  const headlineMetric = player.metrics?.[0];

  return (
    <MotionFlex
      as={isComing ? "div" : "button"}
      type={isComing ? undefined : "button"}
      onClick={isComing ? undefined : () => onOpen(player)}
      aria-label={isComing ? undefined : `Ver caso de ${player.player.name}`}
      direction="column"
      textAlign="left"
      border="1px solid"
      borderColor="green"
      position="relative"
      overflow={withAvatar ? "visible" : "hidden"}
      cursor={isComing ? "default" : "pointer"}
      initial="rest"
      whileHover={isComing ? "rest" : "hover"}
      animate="rest"
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Cover */}
      <Box position="relative" w="100%" sx={{ aspectRatio: "4 / 5" }} bg="black" overflow="hidden">
        {player.cover ? (
          <MotionBox
            w="100%"
            h="100%"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={player.cover}
              alt={`Landing page de ${player.player.name}`}
              w="100%"
              h="100%"
              objectFit="cover"
              loading="lazy"
            />
          </MotionBox>
        ) : (
          // Sin imagen todavía: iniciales sobre el fondo, en vez de un hueco gris.
          <Flex w="100%" h="100%" align="center" justify="center" bg="surface">
            <Heading
              fontSize="6xl"
              color="green"
              opacity={0.5}
              letterSpacing="-0.02em"
            >
              {player.player.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </Heading>
          </Flex>
        )}

        {/* Degradado para que el texto de abajo sea legible sobre cualquier foto */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-t, blackAlpha.800, transparent 55%)"
          pointerEvents="none"
        />

        {player.player.number && (
          <Text
            position="absolute"
            top={3}
            right={4}
            fontSize="4xl"
            fontWeight="bold"
            color="yellow"
            opacity={0.9}
            lineHeight="1"
          >
            {player.player.number}
          </Text>
        )}

        {isComing && (
          <Flex
            position="absolute"
            inset={0}
            align="center"
            justify="center"
            bg="blackAlpha.700"
          >
            <Badge
              bg="yellow"
              color="#0B0B0B"
              px={4}
              py={2}
              fontSize="xs"
              letterSpacing="0.15em"
              textTransform="uppercase"
            >
              Próximamente
            </Badge>
          </Flex>
        )}

        {/* Datos del jugador sobre el cover */}
        <Box position="absolute" bottom={0} left={0} right={0} p={{ base: 4, md: 5 }}>
          <Text
            fontSize="xs"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="yellow"
            mb={1}
          >
            {[player.player.position, player.player.club].filter(Boolean).join(" · ")}
          </Text>
          <Heading
            as="h3"
            fontFamily='"Syne", sans-serif'
            fontSize={{ base: "xl", md: "2xl" }}
            textTransform="uppercase"
            color="beige"
            lineHeight="1.1"
          >
            {player.player.name}
          </Heading>
        </Box>
      </Box>

      {/* Pie: métrica destacada + CTA */}
      <Flex
        justify="space-between"
        align="center"
        gap={4}
        p={{ base: 4, md: 5 }}
        flex="1"
      >
        {headlineMetric ? (
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="green" lineHeight="1">
              {headlineMetric.value}
            </Text>
            <Text fontSize="xs" opacity={0.75} fontFamily="space" mt={1}>
              {headlineMetric.label}
            </Text>
          </Box>
        ) : (
          <Text fontSize="xs" opacity={0.6} fontFamily="space">
            {player.year}
          </Text>
        )}

        {!isComing && (
          <Text
            fontSize="sm"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
            color="green"
            whiteSpace="nowrap"
          >
            Ver caso →
          </Text>
        )}
      </Flex>

      {/* Último en el DOM: se apoya por delante del cover */}
      {withAvatar && <LeaningAvatar />}
    </MotionFlex>
  );
};

export default PlayerCard;
