import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { MotionBox, MotionImage } from "./Motion";
import SectionDivider from "./SectionDivider";
import SectionHeader from "./SectionHeader";
import mockupScreen from "../assets/mockup_screen1.webp";

/**
 * Features que rodean el mockup. `side` define en qué columna cae
 * (izquierda: apiladas arriba/abajo; derecha: centrada) y hacia qué lado
 * apunta su conector visual.
 */
const FEATURES = [
  {
    title: "Resultados actualizados",
    text: "Último partido y próximo rival",
    side: "left",
  },
  {
    title: "Videos",
    text: "Highlights y jugadas destacadas",
    side: "right",
  },
  {
    title: "Estadísticas",
    text: "Perfil y atributos del jugador",
    side: "left",
  },
  {
    title: "Versión mobile",
    text: "Diseño optimizado para dispositivos móviles",
    side: "right",
  },
];

/** Recuadro de feature con un conector fino + punto que "apunta" hacia la imagen central. */
const FeatureCard = ({ title, text, side, delay }) => {
  const isLeft = side === "left";

  return (
    <MotionBox
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      borderLeft={ isLeft ? "none" : "1px solid" }
      borderRight={ isLeft ? "1px solid" : "none" }
      borderColor="green"
      p={{ base: 5, md: 4 }}
      position="relative"
      w="100%"
    >
      {/* Conector hacia la imagen: solo en desktop, donde el layout es orbital */}
      <Box
        display={{ base: "none", md: "block" }}
        position="absolute"
        top="50%"
        {...(isLeft ? { right: "-33px" } : { left: "-33px" })}
        transform="translateY(-50%)"
        w="32px"
        h="1px"
        bg="green"
      >
        <Box
          position="absolute"
          top="50%"
          {...(isLeft ? { right: 0 } : { left: 0 })}
          transform="translateY(-50%)"
          w="6px"
          h="6px"
          borderRadius="full"
          bg="yellow"
        />
      </Box>
      <Flex direction="column"  textAlign={isLeft ? "right" : "left"}>
        <Text fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wide" color="green" mb={2}>
          {title}
        </Text>
        <Text fontSize="sm" opacity={0.85} fontFamily="space">
          {text}
        </Text>
      </Flex> 
    </MotionBox>
  );
};

/**
 * Preview de una landing terminada, previo a la grilla de casos.
 * El mockup queda como epicentro (con halo de luz detrás) y las 4 features
 * lo rodean en formación orbital: dos apiladas a la izquierda, dos a la
 * derecha, cada una conectada a la imagen por una línea + punto de acento.
 */
const LandingPreview = () => {
  const leftFeatures = FEATURES.filter((f) => f.side === "left");
  const rightFeatures = FEATURES.filter((f) => f.side === "right");

  return (
    <Box id="preview" position="relative">
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
          <SectionHeader
            number="00"
            title={
              <>
                Así se ve
                <br />
                una landing
              </>
            }
            subtitle="Antes de los casos: esto es lo que un jugador se lleva. Pensada para desktop y mobile, con su información siempre al día."
          />

          <Grid
            mt={{ base: 12, md: 16 }}
            templateColumns={{ base: "1fr", md: "230px 1fr 230px" }}
            gap={{ base: 8, md: 8 }}
          >
            <GridItem order={{ base: 2, md: 1 }}>
              <Flex direction="column" justify="space-between" h="100%" gap={{ base: 6, md: 16 }} mr={16  }>
                <FeatureCard {...leftFeatures[0]} delay={0.1} />
                <FeatureCard {...leftFeatures[1]} delay={0.3} />
              </Flex>
            </GridItem>

            <GridItem order={{ base: 1, md: 2 }} position="relative">
              {/* Halo de luz: la imagen como epicentro */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w={{ base: "260px", md: "420px" }}
                h={{ base: "260px", md: "420px" }}
                bg="green"
                opacity={0.3}
                filter="blur(100px)"
                borderRadius="full"
                pointerEvents="none"
                zIndex={0}
              />
              <MotionImage
                src={mockupScreen}
                alt="Vista previa de una landing page para futbolista, en desktop, mobile y detalle de resultados, estadísticas y videos"
                position="relative"
                zIndex={1}
                w="100%"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              />
            </GridItem>

            <GridItem order={{ base: 3, md: 3 }}>
              <Flex direction="column" justify="space-between" h="100%" gap={{ base: 6, md: 16 }}>
                <FeatureCard {...rightFeatures[0]} delay={0.2} />
                <FeatureCard {...rightFeatures[1]} delay={0.4} />
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default LandingPreview;
