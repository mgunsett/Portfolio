import { Box, Flex, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import PlayerCard from "./PlayerCard";

/**
 * Ancho de cada card en el carrusel mobile. El 22% que sobra deja asomar la
 * card siguiente: es lo que le avisa al visitante que la fila sigue, sin
 * necesidad de una flecha ni de un texto que lo explique.
 */
const CARD_W = "78%";

/**
 * El padding lateral de la sección, repetido acá porque el carrusel se sale de
 * él (`mx` negativo) para que el scroll llegue al borde de la pantalla y las
 * cards no queden encajonadas.
 */
const SIDE_PAD = 6;

/**
 * Los casos: carrusel horizontal en mobile, grilla a partir de md.
 *
 * En mobile cada card apilada ocupaba una pantalla entera y recorrer tres casos
 * era un scroll largo con poca recompensa. En fila con scroll-snap la sección
 * mide una pantalla en total y comparar dos landings es un gesto lateral; la
 * información completa igual está a un tap, en el modal.
 *
 * De md en adelante el mismo contenedor pasa a `grid` y el snap deja de
 * aplicar, así que no hay dos árboles de cards que mantener en paralelo.
 */
const PlayersRail = ({ players, onOpen }) => {
  const railRef = useRef(null);
  const [active, setActive] = useState(0);

  // Card activa = la que quedó más cerca del canto izquierdo. Se mide sobre el
  // DOM en vez de dividir por un ancho fijo porque el ancho es porcentual y el
  // gap cambia por breakpoint.
  const handleScroll = () => {
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
  };

  const goTo = (i) =>
    railRef.current?.children[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });

  return (
    <>
      <Box
        ref={railRef}
        onScroll={handleScroll}
        display={{ base: "flex", md: "grid" }}
        gridTemplateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={{ base: 5, md: 10, lg: 8 }}
        overflowX={{ base: "auto", md: "visible" }}
        mx={{ base: -SIDE_PAD, md: 0 }}
        px={{ base: SIDE_PAD, md: 0 }}
        sx={{
          scrollSnapType: "x mandatory",
          // Sin esto el snap pega la card contra el borde de la pantalla y se
          // come el padding de la sección.
          scrollPaddingInlineStart: "var(--chakra-space-6)",
          // La barra de scroll nativa arruina el borde inferior de las cards;
          // los puntos de abajo cumplen su función de orientación.
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {players.map((p, i) => (
          <Box
            key={p.slug}
            flex={{ base: "0 0 " + CARD_W, md: "1 1 auto" }}
            minW={0}
            sx={{ scrollSnapAlign: "start" }}
          >
            <PlayerCard player={p} onOpen={onOpen} withAvatar={i === 0} />
          </Box>
        ))}
      </Box>

      {players.length > 1 && (
        <Flex display={{ base: "flex", md: "none" }} align="center" gap={2} mt={8}>
          {players.map((p, i) => (
            <Box
              key={p.slug}
              as="button"
              type="button"
              onClick={() => goTo(i)}
              aria-label={"Ver el caso de " + p.player.name}
              aria-current={i === active ? "true" : undefined}
              h="4px"
              w={i === active ? "28px" : "10px"}
              borderRadius="full"
              bg={i === active ? "yellow" : "green"}
              opacity={i === active ? 1 : 0.35}
              transition="width 0.3s ease, opacity 0.3s ease"
            />
          ))}

          <Text
            ml="auto"
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
    </>
  );
};

export default PlayersRail;
