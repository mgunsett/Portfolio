import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { MotionBox } from "./Motion";
import { BRAND } from "../config/brand";
import { useColorMode } from "@chakra-ui/react";

const ProfessionalProfile = ({ number = "01" }) => {
  const { colorMode } = useColorMode();
  const bg = colorMode === "dark" ? "surface" : "modalbg";
  return (
    <Box id="perfil" position="relative" bgColor={bg} mt={28}>

      <Box
          w={{ base: "80%" , md: "70%" }}
          h="2px"
          bgGradient="linear(to-r, transparent, green , transparent)"
          mb={12}
          m={'auto'}
        />

      <MotionBox
        as="section"
        py={28}
        px={{ base: 6, md: 12, lg: 24 }}
        mt={{ base: 4, md: 12 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box maxW="6xl" mx="auto">
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
            gap={12}
          >
            <GridItem colSpan={{ base: 1, md: 4 }}>
              <Flex align="center" gap={4} mb={6}>
                <Box
                  w={3}
                  h={3}
                  bg="yellow"
                  borderRadius="full"
                />
                <Text
                  fontSize="sm"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  fontWeight="semibold"
                  color="green"
                >
                  {number}
                </Text>
              </Flex>
              <Heading
                fontFamily={'"Syne", sans-serif'}
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="700"
                textTransform="uppercase"
                lineHeight="1.2"
              >
                Perfil
                <br />
                Profesional
              </Heading>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 8 }} >
              <Text fontSize={{ base: "md", md: "lg" }} mb={8} opacity={0.8} fontFamily={'space'}>
                Desarrollador front-end especializado en presencia digital para el
                deporte profesional. Trabajo junto a {BRAND.partner.name} y de forma
                directa con jugadores y representantes, construyendo sitios que no
                son solo una tarjeta de presentación: son una herramienta de
                difusión, negociación y marca personal.
              </Text>
              <Flex align="center" gap={{ base: 4, md: 8 }} pt={4}>
                {BRAND.stats.map((stat, i) => (
                  <Fragment key={stat.label}>
                    {i > 0 && <Box w={'0.5px'} h={12} bg="gray.600" />}
                    <Box>
                      <Text fontSize="4xl" fontWeight="bold" color="green">
                        {stat.value}
                      </Text>
                      <Text
                        fontFamily={'space'}
                        fontSize={{ base: "xs", md: "sm" }}
                        letterSpacing="0.08em"
                        textTransform="uppercase"
                        mt={1}
                      >
                        {stat.label}
                      </Text>
                    </Box>
                  </Fragment>
                ))}
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default ProfessionalProfile;
