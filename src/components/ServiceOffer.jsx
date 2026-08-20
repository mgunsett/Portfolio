import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { MotionBox } from "./Motion";
import SectionDivider from "./SectionDivider";
import SectionHeader from "./SectionHeader";
import { whatsappLink } from "../config/brand";

/** Qué incluye una landing de jugador. */
const INCLUDES = [
  "Diseño exclusivo, sin plantillas",
  "Trayectoria y estadísticas de carrera",
  "Galería de video y fotos",
  "Optimizada para mobile y para compartir",
  "Contacto directo para clubes y representantes",
  "Dominio propio y puesta en línea",
];

/** El proceso, para que el cliente sepa exactamente en qué se mete. */
const STEPS = [
  {
    n: "01",
    title: "Brief",
    text: "Charla inicial con el jugador o su representante: objetivo, material disponible y a quién le habla la web.",
  },
  {
    n: "02",
    title: "Diseño",
    text: "Propuesta visual alineada a la identidad del jugador: colores, tipografías y estructura de la historia.",
  },
  {
    n: "03",
    title: "Desarrollo",
    text: "Construcción a medida, con foco en velocidad de carga y experiencia en el celular.",
  },
  {
    n: "04",
    title: "Publicación",
    text: "Salida en vivo, materiales listos para redes y seguimiento de las métricas de las primeras semanas.",
  },
];

const ServiceOffer = () => {
  return (
    <Box id="servicio" position="relative">
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
          <Grid templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }} gap={{ base: 10, md: 12 }}>
            <GridItem colSpan={{ base: 1, md: 5 }}>
              <SectionHeader
                number="02"
                title={
                  <>
                    Cómo
                    <br />
                    Trabajamos
                  </>
                }
                subtitle="De la primera charla a la web publicada, en cuatro pasos claros."
              />

              <Box
                as="a"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap={2}
                mt={8}
                fontSize="sm"
                fontWeight="semibold"
                letterSpacing="wide"
                textTransform="uppercase"
                color="green"
                _hover={{ opacity: 0.8 }}
              >
                Pedir presupuesto →
              </Box>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 7 }}>
              {/* Proceso */}
              <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={6} mb={12}>
                {STEPS.map((step) => (
                  <Box key={step.n} borderTop="2px solid" borderColor="green" pt={4}>
                    <Text fontSize="sm" fontWeight="bold" color="yellow" letterSpacing="0.2em" mb={2}>
                      {step.n}
                    </Text>
                    <Text
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontSize="md"
                      letterSpacing="wide"
                      mb={2}
                    >
                      {step.title}
                    </Text>
                    <Text fontSize="sm" opacity={0.8} fontFamily="space">
                      {step.text}
                    </Text>
                  </Box>
                ))}
              </Grid>

              {/* Qué incluye */}
              <Text
                fontSize="sm"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="green"
                fontWeight="semibold"
                mb={4}
              >
                Qué incluye
              </Text>
              <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={3}>
                {INCLUDES.map((item) => (
                  <Flex key={item} align="flex-start" gap={3}>
                    <Box w={2} h={2} bg="yellow" borderRadius="full" mt={2} flexShrink={0} />
                    <Text fontSize="sm" opacity={0.85} fontFamily="space">
                      {item}
                    </Text>
                  </Flex>
                ))}
              </Grid>
            </GridItem>
          </Grid>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default ServiceOffer;
