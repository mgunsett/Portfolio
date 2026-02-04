import { Box, Heading, Text, Stack, Button, Flex } from "@chakra-ui/react";
import { MotionBox } from "./Motion";

const Hero = () => {
  return (
    <Box minH="100vh" display="flex" alignItems="center" px={[6, 12, 24]}>
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%" }}
      >
        <Stack spacing={8} maxW="5xl">
          <Flex align="center" gap={4}>
            <Box w="40px" h="1px" bg="green" />
            <Text
              fontSize="sm"
              letterSpacing="0.3em"
              textTransform="uppercase"
              color="green"
            >
              Portfolio profesional
            </Text>
          </Flex>

          <Heading fontSize={["5xl", "7xl", "8xl"]} lineHeight="1">
            MATÍAS <br />
            <Box as="span" color="green">
              GUNSETT
            </Box>
          </Heading>

          <Text
            fontSize="xl"
            letterSpacing="0.15em"
            textTransform="uppercase"
          >
            Front-End Developer · React
          </Text>

          <Text maxW="2xl" fontSize="lg" opacity={0.85}>
            Desarrollo interfaces modernas, escalables y optimizadas,
            combinando diseño, performance y experiencia de usuario.
          </Text>

          <Flex gap={6}>
            <Button bg="green" color="background">
              Ver proyectos
            </Button>
            <Button variant="ghost">Descargar CV</Button>
          </Flex>
        </Stack>
      </MotionBox>
    </Box>
  );
};

export default Hero;
