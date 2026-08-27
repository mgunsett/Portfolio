import { Box, Flex, Grid, GridItem, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { MotionBox } from "./Motion";
import SectionDivider from "./SectionDivider";
import SectionHeader from "./SectionHeader";
import PlayerCard from "./PlayerCard";
import PlayerCaseModal from "./PlayerCaseModal";
import { players } from "../data/players";
import { BRAND } from "../config/brand";

const PlayersShowcase = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);

  const handleOpen = (player) => {
    setSelected(player);
    onOpen();
  };

  const handleClose = () => {
    onClose();
    setSelected(null);
  };

  return (
    // overflowX="clip" (y no "hidden") recorta el avatar apoyado si el margen
    // lateral se queda corto, sin crear un contenedor de scroll horizontal.
    <Box id="casos" position="relative" overflowX="clip">
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
          {players.length > 0 ? (
            <Grid templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }} gap={{ base: 8, md: 12 }}>
              <GridItem colSpan={{ base: 1, md: 12 }}>
                <SectionHeader
                  number="01"
                  title={
                    <>
                      Landing Pages
                      <br />
                      para Futbolistas
                    </>
                  }
                />
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 12 }}>
                {/*
                  A partir de xl la grilla se corre a la derecha y baja: ese
                  hueco es el que ocupa el avatar apoyado en el teléfono de la
                  primera card (pl = cuerpo, pt = cabeza y hombros asomando por
                  arriba). De paso achica las cards, que con pocos casos
                  quedaban desproporcionadas frente al espacio vacío de la
                  derecha.

                  Los valores salen de la geometría de PlayerCard: con un
                  teléfono de 260px de ancho (PHONE_MAX_W) el avatar mide ~766px
                  de alto, sobresale ~276px hacia la izquierda del teléfono y
                  ~203px por encima. pl/pt son esas medidas redondeadas hacia
                  arriba, así que si cambia PHONE_MAX_W hay que recalcularlos.
                */}
                {/*
                  El salto a dos columnas es en `md` y no en `sm`: con el
                  teléfono como card, a 500px de ancho cada columna quedaba en
                  ~198px y la métrica se le encimaba al CTA. En un celular real
                  entra un solo mockup a 260px, que además se lee.
                */}
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                  gap={{ base: 14, md: 10, lg: 8 }}
                  pl={{ base: 0, xl: 52, "2xl": 56 }}
                  pt={{ base: 0, xl: 52 }}
                >
                  {players.map((p, i) => (
                    <PlayerCard
                      key={p.slug}
                      player={p}
                      onOpen={handleOpen}
                      withAvatar={i === 0}
                    />
                  ))}
                </Grid>
              </GridItem>
            </Grid>
          ) : (
            // Sin casos cargados todavía: el pitch ya lo hizo LandingPreview arriba,
            // acá solo queda anunciar que están en camino.
            <Flex align="center" gap={4}>
              <Box w="40px" h="1px" bg="green" />
              <Text fontSize="sm" letterSpacing="0.15em" textTransform="uppercase" opacity={0.7}>
                Casos en publicación
              </Text>
            </Flex>
          )}
        </Box>
      </MotionBox>

      <PlayerCaseModal isOpen={isOpen} onClose={handleClose} player={selected} />
    </Box>
  );
};

export default PlayersShowcase;
