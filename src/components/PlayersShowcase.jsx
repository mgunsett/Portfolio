import { Box, Flex, Grid, GridItem, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { MotionBox } from "./Motion";
import SectionDivider from "./SectionDivider";
import SectionHeader from "./SectionHeader";
import PlayersRail from "./PlayersRail";
import PlayerCaseModal from "./PlayerCaseModal";
import { players } from "../data/players";
import matiAvatar from "../assets/mati_avatar.webp";

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
                {/*
                  Hasta xl el avatar presenta la sección desde acá: apoya el
                  antebrazo sobre la línea vertical del encabezado, que es el
                  mismo gesto que en xl hace sobre el canto del teléfono de la
                  primera card. Por eso los dos usos son excluyentes —nunca hay
                  dos avatares en pantalla— y por eso la línea existe: sin algo
                  vertical donde apoyarse, la pose queda flotando.

                  Asoma desde afuera del padding de la sección (`ml` negativo)
                  para no comerle ancho al título, que en un celular angosto
                  entra justo.
                */}
                <Flex align="flex-end" gap={{ base: 3, md: 5 }}>
                  <Image
                    src={matiAvatar}
                    alt=""
                    aria-hidden="true"
                    display={{ base: "block", xl: "none" }}
                    h={{ base: "185px", md: "250px" }}
                    w="auto"
                    maxW="none"
                    ml={{ base: -6, md: -4 }}
                    flexShrink={0}
                    filter="drop-shadow(0 18px 30px rgba(0, 0, 0, 0.55))"
                  />

                  <Box
                    borderLeft={{ base: "1px solid", xl: "none" }}
                    borderColor="green"
                    pl={{ base: 5, xl: 0 }}
                  >
                    <SectionHeader
                      number="01"
                      title={
                        <>
                          Destacados
                        </>
                      }
                      subtitle="Algunas de las Landing's más visitadas actualmente"
                    />
                  </Box>
                </Flex>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 12 }}>
                {/*
                  A partir de xl el bloque de casos se corre a la derecha y
                  baja: ese hueco es el que ocupa el avatar apoyado en el
                  teléfono de la primera card (pl = cuerpo, pt = cabeza y
                  hombros asomando por arriba). De paso achica las cards, que
                  con pocos casos quedaban desproporcionadas frente al espacio
                  vacío de la derecha.

                  Los valores salen de la geometría de PlayerCard: con un
                  teléfono de 260px de ancho (PHONE_MAX_W) el avatar mide ~766px
                  de alto, sobresale ~276px hacia la izquierda del teléfono y
                  ~203px por encima. El `pt` es esa medida menos el encabezado
                  de la card (~92px), que ya empuja el teléfono hacia abajo; si
                  cambia PHONE_MAX_W o el alto del encabezado, hay que
                  recalcularlos.
                */}
                <Box pl={{ base: 0, xl: 52, "2xl": 56 }} pt={{ base: 0, xl: 28 }}>
                  <PlayersRail players={players} onOpen={handleOpen} />
                </Box>
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
