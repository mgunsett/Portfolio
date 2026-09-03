import { Badge, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MotionBox, MotionFlex, MotionImage } from "./Motion";
import PhoneFrame, { ISLAND_SAFE_TOP } from "./PhoneFrame";
import matiAvatar from "../assets/mati_avatar.webp";

/**
 * Ancho del mockup. De acá sale el alto de la card, el tamaño del avatar
 * apoyado y el hueco que le reserva la grilla, así que si se toca hay que
 * revisar `pl` / `pt` en PlayersShowcase.
 */
const PHONE_MAX_W = "260px";

/**
 * Avatar apoyado sobre la esquina superior izquierda del teléfono.
 *
 * La geometría sale del render: el antebrazo apoya al 31% de la altura del
 * avatar, o sea que el 69% restante del cuerpo cuelga por debajo del punto de
 * apoyo. Para que ese punto caiga sobre el borde superior del teléfono y los
 * pies lleguen a su base, el avatar tiene que medir ~136% del alto del
 * teléfono; el excedente (~36%) es la cabeza y los hombros asomando por
 * arriba.
 *
 * Se mide contra el teléfono y no contra la card entera a propósito: con el
 * encabezado arriba, ese 136% sobre la card completa dispararía el avatar a
 * casi 1000px de alto.
 *
 * `w="auto"` deja que el ancho salga del aspect ratio, y `right="82%"` hace
 * que solo el antebrazo pise el teléfono: el cuerpo cae en el margen que le
 * reserva la grilla. Debajo de xl no hay margen lateral suficiente; ahí el
 * avatar aparece una sola vez, junto al encabezado de la sección.
 */
const LeaningAvatar = () => (
  <MotionImage
    src={matiAvatar}
    alt=""
    aria-hidden="true"
    display={{ base: "none", xl: "block" }}
    position="absolute"
    right="72%"
    bottom={0}
    h="130%"
    w="auto"
    maxW="none"
    zIndex={3}
    pointerEvents="none"
    filter="drop-shadow(0 18px 30px rgba(0, 0, 0, 0.55))"
  />
);

const CardHeader = ({ player, showCta }) => (
  <Flex
    direction="column"
    justify="flex-end"
    alignItems="center"
    flex="1"
    w="100%"
    mb={{ base: 2, md: 6, xl: 6}}
    ml={{ base: 0, xl: "-8%" }}
  >
    <Flex direction="column" alignItems="center" gap={1}>
      <Text
        fontSize="8px"
        letterSpacing="0.2em"
        textTransform="uppercase"
        fontWeight="semibold"
        color="green"
        mb={2}
      >
        {[player.player.position, player.player.club].filter(Boolean).join(" · ")}
      </Text>
      <Heading
        as="h3"
        fontFamily='"Syne", sans-serif'
        fontSize={{ base: "md", md: "lg" }}
        textTransform="uppercase"
        lineHeight="1.1"
      >
        {player.player.name}
      </Heading>
    </Flex>
      {/* La línea y su punto: el remate que apunta al mockup de abajo. */}
      <Flex
        direction="column"
        justify="center"
        alignItems="center"
        borderTop="1px solid"
        borderColor="green" 
        w="140px"
        mt={4}
      >
        <Box
          w="1px"
          h="40px"
          bg="green"
        />
        <Box  
          w="6px"
          h="6px"
          borderRadius="full"
          bg="yellow"
        />
      </Flex>
  </Flex>
);

const ScreenshotPhone = ({ player, isComing }) => {
  const screenRef = useRef(null);
  const shotRef = useRef(null);
  const [scrollable, setScrollable] = useState(0);

  useEffect(() => {
    const screen = screenRef.current;
    const shot = shotRef.current;
    if (!screen || !shot) return;

    const measure = () =>
      setScrollable(
        Math.max(0, shot.offsetHeight + ISLAND_SAFE_TOP - screen.offsetHeight)
      );

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(screen);
    observer.observe(shot);
    return () => observer.disconnect();
  }, [player.cover]);

  return (
    <PhoneFrame maxW="none" screenRef={screenRef}>
      {player.cover ? (
        <>
          <Image
            src={player.cover}
            alt=""
            aria-hidden="true"
            position="absolute"
            inset={0}
            w="100%"
            h="100%"
            objectFit="cover"
            transform="scale(1.2)"
            filter="blur(28px) saturate(1.15)"
            opacity={0.75}
            loading="lazy"
          />
          <MotionImage
            ref={shotRef}
            src={player.cover}
            alt={"Home mobile de la landing de " + player.player.name}
            position="absolute"
            top={ISLAND_SAFE_TOP + "px"}
            left={0}
            w="100%"
            h="auto"
            minH={"calc(100% - " + ISLAND_SAFE_TOP + "px)"}
            objectFit="cover"
            objectPosition="top center"
            transformOrigin="top center"
            loading="lazy"
            sx={
              // El fundido del canto inferior solo tiene sentido en la captura
              // larga, donde ese borde entra en cuadro recién al final del
              // scroll del hover. En una que ya llega al canto de la pantalla se
              // comería 40px de diseño contra el fondo.
              scrollable > 0
                ? {
                    maskImage:
                      "linear-gradient(to bottom, #000 calc(100% - 40px), transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 calc(100% - 40px), transparent 100%)",
                  }
                : undefined
            }
            variants={{
              rest: { y: 0, scale: 1 },
              hover: scrollable > 0 ? { y: -scrollable } : { scale: 1.06 },
            }}
            transition={{
              duration: scrollable > 0 ? 1.8 : 0.6,
              ease: "easeInOut",
            }}
          />
        </>
      ) : (
        // Sin captura todavía: iniciales sobre el fondo, en vez de un hueco gris.
        <Flex w="100%" h="100%" align="center" justify="center" bg="surface">
          <Heading fontSize="5xl" color="green" opacity={0.5} letterSpacing="-0.02em">
            {player.player.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </Heading>
        </Flex>
      )}

      {isComing && (
        <Flex
          position="absolute"
          inset={0}
          align="center"
          justify="center"
          bg="blackAlpha.700"
          zIndex={3}
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
    </PhoneFrame>
  );
};

const PlayerCard = ({ player, onOpen, withAvatar = false }) => {
  const isComing = player.status === "coming";

  return (
    <MotionFlex
      as={isComing ? "div" : "button"}
      type={isComing ? undefined : "button"}
      onClick={isComing ? undefined : () => onOpen(player)}
      aria-label={isComing ? undefined : "Ver caso de " + player.player.name}
      direction="column"
      textAlign="left"
      position="relative"
      w="100%"
      h="100%"
      cursor={isComing ? "default" : "pointer"}
      initial="rest"
      whileHover={isComing ? "rest" : "hover"}
      animate="rest"
    >
      <CardHeader player={player} showCta={!isComing} />
      <MotionBox
        position="relative"
        w="100%"
        maxW={PHONE_MAX_W}
        mx="auto"
        variants={{ rest: { y: 0 }, hover: { y: -8 } }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Halo verde de marca detrás del teléfono */}
        <Box
          position="absolute"
          inset={0}
          bg="green"
          opacity={0.25}
          filter="blur(70px)"
          borderRadius="full"
          pointerEvents="none"
          zIndex={0}
        />

        <ScreenshotPhone player={player} isComing={isComing} />

        {/* Último en el DOM: se apoya por delante del teléfono */}
        {withAvatar && <LeaningAvatar />}
      </MotionBox>
    </MotionFlex>
  );
};

export default PlayerCard;
