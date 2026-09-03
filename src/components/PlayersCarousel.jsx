import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import PlayerPosterCard from "./PlayerPosterCard";
import { useDragScroll } from "../hooks/useDragScroll";

/**
 * Cuántas cards entran por pantalla. El resto de card que queda asomando es
 * intencional: es lo que avisa que la fila sigue, sin depender de que la flecha
 * se vea o de un texto que lo explique.
 */
const CARD_W = { base: "0 0 88%", md: "0 0 44%", lg: "0 0 29%" };

/** Padding lateral de la sección, repetido acá porque el riel se sale de él. */
const SIDE_PAD = 6;

const ArrowButton = ({ label, icon, onClick, isDisabled }) => (
  <IconButton
    aria-label={label}
    icon={icon}
    onClick={onClick}
    isDisabled={isDisabled}
    variant="ghost"
    size="sm"
    borderRadius="full"
    border="1px solid"
    borderColor="whiteAlpha.300"
    color="beige"
    _hover={{ bg: "green", borderColor: "green" }}
    _disabled={{ opacity: 0.25, cursor: "default", _hover: { bg: "transparent" } }}
  />
);

/**
 * Carrusel horizontal de casos, en todos los breakpoints.
 *
 * El scroll es nativo: así el touch conserva su inercia, la rueda del trackpad
 * funciona sola y el teclado puede tabular card por card. Encima de eso van las
 * tres formas de manejarlo que espera cada dispositivo: arrastre con el mouse,
 * flechas en desktop y puntos para saltar directo.
 *
 * La card activa se mide contra el DOM y no dividiendo por un ancho fijo,
 * porque el ancho es porcentual y el gap cambia por breakpoint.
 */
const PlayersCarousel = ({ players, onOpen }) => {
  const railRef = useRef(null);
  const { wasDragged, dragHandlers } = useDragScroll(railRef);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: true });

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    let closest = 0;
    let min = Infinity;
    Array.from(rail.children).forEach((el, i) => {
      const distance = Math.abs(el.offsetLeft - rail.scrollLeft);
      if (distance < min) {
        min = distance;
        closest = i;
      }
    });
    setActive((prev) => (prev === closest ? prev : closest));

    const max = rail.scrollWidth - rail.clientWidth;
    const next = { start: rail.scrollLeft <= 1, end: rail.scrollLeft >= max - 1 };
    setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }, []);

  // El observer cubre lo que el evento de scroll no ve: el primer render y los
  // cambios de breakpoint, donde cambia cuántas cards entran y por lo tanto si
  // todavía queda algo para desplazar.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [sync, players.length]);

  const step = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.children[0];
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({
      left: direction * ((card?.offsetWidth ?? rail.clientWidth * 0.85) + gap),
      behavior: "smooth",
    });
  };

  const goTo = (i) =>
    railRef.current?.children[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });

  // El arrastre termina en un click sobre la card; sin este filtro, mover el
  // carrusel abriría el modal del caso que quedó bajo el cursor.
  const handleOpen = (player) => {
    if (!wasDragged()) onOpen(player);
  };

  if (players.length === 0) return null;

  return (
    <Box>
      <Box
        ref={railRef}
        onScroll={sync}
        {...dragHandlers}
        display="flex"
        gap={{ base: 4, md: 6 }}
        overflowX="auto"
        mx={{ base: -SIDE_PAD, md: 0 }}
        px={{ base: SIDE_PAD, md: 0 }}
        py={2}
        cursor="grab"
        _active={{ cursor: "grabbing" }}
        sx={{
          scrollSnapType: "x mandatory",
          // Sin esto el snap pega la card contra el borde de la pantalla y se
          // come el padding de la sección.
          scrollPaddingInlineStart: { base: "var(--chakra-space-6)", md: "0px" },
          // Evita que el gesto lateral dispare el "atrás" del navegador.
          overscrollBehaviorX: "contain",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {players.map((player, i) => (
          <Box key={player.slug} flex={CARD_W} minW={0} sx={{ scrollSnapAlign: "start" }}>
            <PlayerPosterCard player={player} index={i} onOpen={handleOpen} />
          </Box>
        ))}
      </Box>

      {players.length > 1 && (
        <Flex align="center" gap={2} mt={6}>
          {players.map((player, i) => (
            <Box
              key={player.slug}
              as="button"
              type="button"
              onClick={() => goTo(i)}
              aria-label={"Ver el caso de " + player.player.name}
              aria-current={i === active ? "true" : undefined}
              h="4px"
              w={i === active ? "28px" : "10px"}
              borderRadius="full"
              bg={i === active ? "yellow" : "green"}
              opacity={i === active ? 1 : 0.35}
              transition="width 0.3s ease, opacity 0.3s ease"
            />
          ))}

          <Flex ml="auto" gap={2} display={{ base: "none", md: "flex" }}>
            <ArrowButton
              label="Ver casos anteriores"
              icon={<FiArrowLeft />}
              onClick={() => step(-1)}
              isDisabled={edges.start}
            />
            <ArrowButton
              label="Ver más casos"
              icon={<FiArrowRight />}
              onClick={() => step(1)}
              isDisabled={edges.end}
            />
          </Flex>

          <Text
            ml="auto"
            display={{ base: "block", md: "none" }}
            fontSize="xs"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="green"
            opacity={0.7}
          >
            Deslizá →
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default PlayersCarousel;
