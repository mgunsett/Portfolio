import { Badge, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MotionBox, MotionFlex, MotionImage } from "./Motion";
import PhoneFrame from "./PhoneFrame";
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
 * bloque de datos debajo, ese 136% sobre la card completa dispararía el avatar
 * a casi 1000px de alto.
 *
 * `w="auto"` deja que el ancho salga del aspect ratio, y `right="82%"` hace
 * que solo el antebrazo pise el teléfono: el cuerpo cae en el margen que le
 * reserva la grilla. Debajo de xl no hay margen lateral suficiente, así que no
 * se muestra.
 */
const LeaningAvatar = () => (
  <MotionImage
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
 * Teléfono con el screenshot del home mobile de la landing en la pantalla.
 *
 * La captura entra a ancho completo y alto natural. Si es más larga que la
 * pantalla —lo esperable en un screenshot de página completa— el sobrante se
 * mide con un ResizeObserver y en hover la imagen se desplaza exactamente esa
 * distancia: se ve como si alguien scrolleara el sitio.
 *
 * `objectFit="contain"` y no "cover" porque el recorte acá es caro: las
 * capturas son más anchas que una pantalla 19.5:9 y con "cover" se perdían los
 * costados del diseño (títulos cortados al medio). Contain las muestra
 * enteras; el sobrante de abajo lo tapa una copia borroneada de la misma
 * captura, así no queda una franja negra con costura visible.
 *
 * En esas capturas cortas no hay recorrido para scrollear, así que el hover cae
 * de vuelta a un zoom suave.
 */
const ScreenshotPhone = ({ player, isComing }) => {
  const screenRef = useRef(null);
  const shotRef = useRef(null);
  const [scrollable, setScrollable] = useState(0);

  useEffect(() => {
    const screen = screenRef.current;
    const shot = shotRef.current;
    if (!screen || !shot) return;

    const measure = () =>
      setScrollable(Math.max(0, shot.offsetHeight - screen.offsetHeight));

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
          {/* Fondo ambiente: la misma captura, borroneada, para rellenar el
              sobrante que deja "contain" sin que se note el corte. */}
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
            top={0}
            left={0}
            w="100%"
            h="auto"
            objectFit="contain"
            objectPosition="top center"
            transformOrigin="top center"
            loading="lazy"
            sx={{
              // La máscara se mide sobre el alto real de la imagen, así que el
              // degradado cae justo donde termina la captura y se funde con el
              // fondo borroneado. En una captura larga queda fuera de pantalla
              // hasta que el hover termina de scrollear.
              maskImage:
                "linear-gradient(to bottom, #000 calc(100% - 40px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 calc(100% - 40px), transparent 100%)",
            }}
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

/**
 * Card de un caso de jugador: el teléfono es la card.
 *
 * En vez de un cover recortado a 4:5, se muestra el home mobile real de la
 * landing dentro de un mockup de iPhone, y los datos del jugador van debajo
 * para no tapar el diseño que se está mostrando.
 *
 * Acá va el screenshot y no el sitio en vivo a propósito: son tres landings
 * completas, y embeberlas en la grilla costaría una carga de sitio por card
 * (varios segundos en negro mientras corren sus animaciones de entrada) y
 * contaría una visita en el analytics de cada jugador por cada hover, que es
 * justo la métrica que la card publica. El sitio en vivo va en el modal, donde
 * el usuario ya hizo clic (ver PlayerCaseModal).
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
      aria-label={isComing ? undefined : "Ver caso de " + player.player.name}
      direction="column"
      textAlign="left"
      position="relative"
      w="100%"
      cursor={isComing ? "default" : "pointer"}
      initial="rest"
      whileHover={isComing ? "rest" : "hover"}
      animate="rest"
    >
      {/*
        Escenario del teléfono: además del mockup contiene el dorsal fantasma y
        el avatar apoyado, que se miden contra esta caja y no contra la card.
      */}
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
          inset="-14%"
          bg="green"
          opacity={0.25}
          filter="blur(70px)"
          borderRadius="full"
          pointerEvents="none"
          zIndex={0}
        />

        {/*
          Dorsal fantasma: se apoya sobre el canto superior del teléfono, sin
          pasarse de su ancho. Si se sale hacia la derecha lo tapa el teléfono
          de la card siguiente, que pinta después.
        */}
        {player.player.number && (
          <Text
            position="absolute"
            bottom="calc(100% - 26px)"
            right="6px"
            fontFamily='"Syne", sans-serif'
            fontSize={{ base: "6xl", md: "7xl" }}
            fontWeight="bold"
            lineHeight="0.8"
            color="yellow"
            opacity={0.3}
            zIndex={0}
            pointerEvents="none"
          >
            {player.player.number}
          </Text>
        )}

        <ScreenshotPhone player={player} isComing={isComing} />

        {/* Último en el DOM: se apoya por delante del teléfono */}
        {withAvatar && <LeaningAvatar />}
      </MotionBox>

      {/* Datos del jugador, alineados al canto izquierdo del teléfono */}
      <Box w="100%" maxW={PHONE_MAX_W} mx="auto" mt={{ base: 6, md: 7 }}>
        <Text
          fontSize="xs"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color="yellow"
          mb={2}
        >
          {[player.player.position, player.player.club].filter(Boolean).join(" · ")}
        </Text>

        {/*
          `minH` de dos renglones: los nombres largos ("Ronaldo Martinez")
          cortan en dos líneas y si no, la regla verde y la métrica de esa card
          quedaban más abajo que las del resto de la fila.
        */}
        <Heading
          as="h3"
          fontFamily='"Syne", sans-serif'
          fontSize={{ base: "xl", md: "2xl" }}
          textTransform="uppercase"
          color="beige"
          lineHeight="1.1"
          minH="2.2em"
        >
          {player.player.name}
        </Heading>

        <Flex
          mt={4}
          pt={4}
          borderTop="1px solid"
          borderColor="green"
          justify="space-between"
          align="center"
          gap={3}
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
            <Flex
              align="center"
              gap={1}
              fontSize="sm"
              fontWeight="semibold"
              letterSpacing="wide"
              textTransform="uppercase"
              color="green"
              whiteSpace="nowrap"
            >
              Ver caso
              <MotionBox
                as="span"
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                →
              </MotionBox>
            </Flex>
          )}
        </Flex>
      </Box>
    </MotionFlex>
  );
};

export default PlayerCard;
