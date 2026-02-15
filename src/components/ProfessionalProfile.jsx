import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { MotionBox } from "./Motion";

const ProfessionalProfile = () => {
  return (
    <Box id="perfil" position="relative">
      <Box
        position="absolute"
        bottom={12}
        left={12}
        display={{ base: "none", lg: "block" }}
      >
        <Box
          w={24}
          h={24}
          borderLeft="2px solid"
          borderBottom="2px solid"
          borderColor="yellow"
        />
      </Box>

      <Box
          w={{ base: "80%" , md: "70%" }}
          h="2px"
          bgGradient="linear(to-r, transparent, green , transparent)"
          mb={12}
          m={'auto'}
          mt={10}
        />

      <MotionBox
        as="section"
        py={24}
        px={[6, 12, 24]}
        mt={12}
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
                  01
                </Text>
              </Flex>
              <Heading
                fontFamily={'"Syne", sans-serif'}
                fontSize={["3xl", "4xl"]}
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
              <Text id="profile-text" fontSize="lg" mb={8} fontFamily={'space'}>
                Profesional apasionado por la tecnología con experiencia en
                desarrollo web, aplicaciones móviles y diseño de interfaces. Mi
                enfoque combina conocimientos técnicos sólidos con una visión
                creativa orientada al usuario final.
              </Text>
              <Text fontSize="lg" mb={8} opacity={0.8} fontFamily={'space'}>
                Especializado en crear productos digitales que equilibran
                funcionalidad, rendimiento y estética. Trabajo colaborativamente
                con equipos multidisciplinarios para entregar soluciones que
                superen expectativas.
              </Text>
              <Flex align="center" gap={8} pt={4}>
                <Box>
                  <Text fontSize="4xl" fontWeight="bold" color="green">
                    3+
                  </Text>
                  <Text
                    fontFamily={'space'}
                    fontSize="sm"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                    mt={1}
                  >
                    Años experiencia
                  </Text>
                </Box>
                <Box
                  w={'0.5px'}
                  h={12}
                  bg="gray.600"
                />
                <Box>
                  <Text fontSize="4xl" fontWeight="bold" color="green">
                    10+
                  </Text>
                  <Text
                    fontFamily={'space'}
                    fontSize="sm"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                    mt={1}
                  >
                    Proyectos
                  </Text>
                </Box>
                <Box
                  w={'0.5px'}
                  h={12}
                  bg="gray.600"
                />
                <Box>
                  <Text fontSize="4xl" fontWeight="bold" color="green">
                    11+
                  </Text>
                  <Text
                    fontFamily={'space'}
                    fontSize="sm"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                    mt={1}
                  >
                    Clientes
                  </Text>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default ProfessionalProfile;
