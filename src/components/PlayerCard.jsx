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
 * Encabezado de la card, arriba del teléfono.
 *
 * Toma el gesto de las features de LandingPreview —línea fina verde rematada
 * por un punto amarillo— pero acostado: acá la línea corre por debajo del texto
 * y a lo ancho de la card, así queda señalando el mockup que viene abajo en vez
 * de acompañar un texto al costado.
 *
 * Lleva lo mínimo indispensable para identificar el caso: posición, club y
 * nombre. Las métricas, el material y las tecnologías viven en el modal, que es
 * donde el visitante ya decidió prestar atención; repetirlos acá llenaba la
 * grilla de números compitiendo entre sí.
 *
 * Dos medidas lo sostienen:
 *
 * - `flex="1"` + `justify="flex-end"`: el bloque crece hasta llenar el alto que
 *   la grilla le da a la card y ancla su contenido abajo. Así un nombre que
 *   corta en dos renglones se come el aire de arriba y todos los teléfonos de
 *   la fila siguen arrancando a la misma altura, sin reservar renglones vacíos.
 *
 * - `mb` generoso: además de aire, es lo que mantiene el texto y la línea por
 *   encima del antebrazo del avatar, que en xl apoya justo sobre el canto
 *   superior del teléfono de la primera card.
 */
const CardHeader = ({ player, showCta }) => (
  <Flex
    direction="column"
    justify="flex-end"
    alignItems="center"
    flex="1"
    w="100%"
    mb={{ base: 10, md: 12, xl: 12}}
  >
    <Flex direction="column" alignItems="center" gap={1}>
      <Text
        fontSize="xs"
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
        fontSize={{ base: "xl", md: "2xl" }}
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
        w="160px"
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

/**
 * Teléfono con el screenshot del home mobile de la landing en la pantalla.
 *
 * La captura entra a ancho completo y alto natural, pero con un piso: nunca
 * mide menos que el alto libre de la pantalla. Ese piso está porque las
 * capturas no vienen todas en 9:19.5 —hay de 485x909 y de 422x909— y las más
 * anchas, a ancho completo, se quedaban cortas de alto y dejaban una franja de
 * fondo abajo, mientras la del ratio justo llenaba el mockup.
 *
 * Cuando una captura no llega, el `minH` estira la caja y `objectFit="cover"`
 * la escala por alto: se recortan unos cinco puntos porcentuales de cada
 * costado, bastante menos molesto que la banda vacía. Lo definitivo, igual, es
 * exportar las capturas ya en 9:19.5.
 *
 * Si la captura es más larga que la pantalla —lo esperable en un screenshot de
 * página completa— el sobrante se mide con un ResizeObserver y en hover la
 * imagen se desplaza exactamente esa distancia: se ve como si alguien
 * scrolleara el sitio. Ahí "cover" no recorta nada, porque la caja ya tiene el
 * aspecto natural de la imagen.
 *
 * En las capturas que no dan recorrido para scrollear, el hover cae de vuelta a
 * un zoom suave.
 *
 * La captura arranca `ISLAND_SAFE_TOP` más abajo del canto de la pantalla: es
 * una imagen fija, no un sitio que scrollea bajo la isla, así que si empezara
 * en 0 la Dynamic Island le comería el header. Ese aire lo rellena el fondo
 * borroneado, y el recorrido del hover lo suma para que la captura igual
 * termine mostrándose entera.
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

/**
 * Card de un caso de jugador: el teléfono es la card.
 *
 * En vez de un cover recortado a 4:5, se muestra el home mobile real de la
 * landing dentro de un mockup de iPhone. La ficha va arriba y en una sola
 * línea: abajo tapaba el diseño que se está mostrando y estiraba cada card a
 * una pantalla entera de alto en mobile.
 *
 * Acá va el screenshot y no el sitio en vivo a propósito: son tres landings
 * completas, y embeberlas en la grilla costaría una carga de sitio por card
 * (varios segundos en negro mientras corren sus animaciones de entrada) y
 * contaría una visita en el analytics de cada jugador por cada hover, que es
 * justo la métrica que el caso publica. El sitio en vivo va en el modal, donde
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

      {/*
        Escenario del teléfono: además del mockup contiene el avatar apoyado,
        que se mide contra esta caja y no contra la card.
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
