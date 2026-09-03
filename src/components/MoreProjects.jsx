import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { MotionBox } from "./Motion";
import SectionDivider from "./SectionDivider";
import SectionHeader from "./SectionHeader";
import PlayersCarousel from "./PlayersCarousel";
import PlayerCaseModal from "./PlayerCaseModal";
import { morePlayers } from "../data/players";

const ALL = "Todos";

/**
 * A partir de cuántos casos aparece el filtro. Con tres o cuatro cards, filtrar
 * es más trabajo que deslizar: los chips recién ganan su lugar cuando la fila
 * es lo bastante larga como para que buscar cueste.
 */
const FILTER_FROM = 5;

const FilterChip = ({ label, isActive, onClick }) => (
  <Box
    as="button"
    type="button"
    onClick={onClick}
    aria-pressed={isActive}
    px={3}
    py={1.5}
    borderRadius="full"
    border="1px solid"
    borderColor={isActive ? "green" : "whiteAlpha.300"}
    bg={isActive ? "green" : "transparent"}
    fontFamily="space"
    fontSize="xs"
    letterSpacing="0.08em"
    textTransform="uppercase"
    whiteSpace="nowrap"
    transition="background 0.25s ease, border-color 0.25s ease"
    _hover={{ borderColor: "green" }}
  >
    {label}
  </Box>
);

/**
 * "Más proyectos": el resto de los casos entregados, en un carrusel.
 *
 * Los destacados de arriba se llevan el despliegue —el mockup de teléfono, el
 * avatar apoyado—; acá la lectura es de catálogo: capturas grandes, una al lado
 * de la otra, para barrer varios trabajos en un gesto. El detalle es el mismo
 * PlayerCaseModal, así que abrir un caso de esta sección se siente idéntico a
 * abrir uno de los destacados.
 */
const MoreProjects = ({ number = "04" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState(ALL);

  const positions = useMemo(
    () => [...new Set(morePlayers.map((p) => p.player.position).filter(Boolean))],
    [],
  );

  const showFilter = morePlayers.length >= FILTER_FROM && positions.length > 1;
  const visible =
    !showFilter || filter === ALL
      ? morePlayers
      : morePlayers.filter((p) => p.player.position === filter);

  const handleOpen = (player) => {
    setSelected(player);
    onOpen();
  };

  const handleClose = () => {
    onClose();
    setSelected(null);
  };

  // Sin casos cargados la sección no se anuncia: mejor que no exista a que
  // muestre un carrusel vacío.
  if (morePlayers.length === 0) return null;

  return (
    <Box id="mas-proyectos" position="relative" overflowX="clip">
      <SectionDivider mt={10} mb={12} />

      <MotionBox
        as="section"
        py={{ base: 16, md: 24 }}
        px={{ base: 6, md: 12, lg: 24 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box maxW="6xl" mx="auto">
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "flex-end" }}
            justify="space-between"
            gap={6}
            mb={{ base: 8, md: 10 }}
          >
            <SectionHeader
              number={number}
              title="Más proyectos"
              subtitle="El resto de las webs entregadas. Tocá cualquiera para verla por dentro."
            />

            <Text
              fontFamily="space"
              fontSize="xs"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="green"
              flexShrink={0}
              pb={1}
            >
              {morePlayers.length} {morePlayers.length === 1 ? "caso" : "casos"}
            </Text>
          </Flex>

          {showFilter && (
            <Flex gap={2} mb={8} overflowX="auto" sx={{ scrollbarWidth: "none" }}>
              {[ALL, ...positions].map((label) => (
                <FilterChip
                  key={label}
                  label={label}
                  isActive={filter === label}
                  onClick={() => setFilter(label)}
                />
              ))}
            </Flex>
          )}

          {/* La key remonta el carrusel al cambiar el filtro: arranca de nuevo
              en la primera card en vez de quedar desplazado a mitad de una fila
              que ya no existe. */}
          <PlayersCarousel key={filter} players={visible} onOpen={handleOpen} />
        </Box>
      </MotionBox>

      <PlayerCaseModal isOpen={isOpen} onClose={handleClose} player={selected} />
    </Box>
  );
};

export default MoreProjects;
