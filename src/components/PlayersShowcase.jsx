import { Box, Flex, Grid, GridItem, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { MotionBox } from "./Motion";
import SectionDivider from "./SectionDivider";
import SectionHeader from "./SectionHeader";
import PlayersRail from "./PlayersRail";
import PlayerCaseModal from "./PlayerCaseModal";
import { featuredPlayers } from "../data/players";
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
          {featuredPlayers.length > 0 ? (
            <Grid templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }} gap={{ base: 8, md: 12 }}>
              <GridItem colSpan={{ base: 1, md: 12 }}>
                <Flex align="flex-end" gap={{ base: 3, md: 5 }}>
                  <Image
                    src={matiAvatar}
                    alt=""
                    aria-hidden="true"
                    display={{ base: "block", xl: "none" }}
                    h={{ base: "185px", md: "230px" }}
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
                      number="02"
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

              <GridItem colSpan={{ base: 2, md: 12 }}>
                <Box pl={{ base: 0, xl: 52, "2xl": 56 }} pt={{ base: 0, xl: 16 }}>
                  <PlayersRail players={featuredPlayers} onOpen={handleOpen} />
                </Box>
              </GridItem>
            </Grid>
          ) : (
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
