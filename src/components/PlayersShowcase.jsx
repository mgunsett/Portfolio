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
    <Box id="casos" position="relative">
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
                <Grid
                  templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                  gap={6}
                >
                  {players.map((p) => (
                    <PlayerCard key={p.slug} player={p} onOpen={handleOpen} />
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
