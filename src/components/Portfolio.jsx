import {
  Box,
  Grid,
  Flex,
  Text,
  Heading,
  Link,
  Badge,
  GridItem,
} from "@chakra-ui/react";
import { MotionBox, MotionFlex} from "./Motion.jsx";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { projects } from "../data/projects";

const Portfolio = () => {
  return (
    <Box position="relative" >
      <Box
          w={{ base: "80%" , md: "70%" }}
          h="2px"
          bgGradient="linear(to-r, transparent, green , transparent)"
          mb={12}
          m={'auto'}
          mt={10}
        />

      {/* Portfolio */}
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
            <GridItem colSpan={{ base: 1, md: 12 }}>
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
                  03
                </Text>
              </Flex>
              <Heading
                fontFamily={'"Syne", sans-serif'}
                fontSize={["3xl", "4xl"]}
                fontWeight="700"
                textTransform="uppercase"
                lineHeight="1.2"
              >
                PROYECTOS
              </Heading>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 12 }}>
            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
            >
            {projects.map((p, i) => (
              <MotionFlex
                key={i}
                direction="column"
                justifyContent={'space-between'}
                p={8}
                border="1px solid" 
                borderColor="green"
                position="relative"
                overflow="hidden"
                initial={{ y: 0 }}
                whileHover="hover"
                animate="rest"
                transition={{ duration: 0.3, ease: "easeOut" }}
                variants={{
                  rest: { y: 0 },
                  hover: { y: -6 }
                }}
              >
                {/* Animated left border */}
                <MotionBox
                  position="absolute"
                  left={0}
                  top="50%"
                  width="3px"
                  bg="green"
                  variants={{
                    rest: { height: 0, y: "-50%" },
                    hover: { height: "100%", y: "-50%" }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                {/* Top info */}
                <Flex justify="space-between" mb={4}>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    color="green"
                  >
                    {p.name}
                  </Text>
                  <Text fontSize="sm" opacity={0.6}>
                    {p.year}
                  </Text>
                </Flex>

                <Heading
                  as="h3"
                  fontFamily="Syne, sans-serif"
                  fontSize="lg"
                  fontWeight="bold"
                  textTransform="uppercase"
                  mb={4}
                >
                  {p.title}
                </Heading>

                <Text mb={6} opacity={0.8} fontSize="sm">
                  {p.description}
                </Text>

                {/* Tags */}
                <Flex wrap="wrap" gap={2} mb={6}>
                  {p.tech.map((tech, i) => (
                    <Badge
                      key={i}
                      fontSize="xs"
                      px={3}
                      py={1}
                      bg="#e9ce62"
                      color="#0B0B0B"
                      textTransform="none"
                    >
                      {tech}
                    </Badge>
                  ))}
                </Flex>

                {/* Link */}
                <Link
                  href={p.url}
                  target="_blank"
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  fontSize="sm"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  textTransform="uppercase"
                  color="#0F766E"
                  _hover={{ textDecoration: "none", opacity: 0.8 }}
                >
                  Ver proyecto
                  <ExternalLinkIcon />
                </Link>
              </MotionFlex>
            ))}
            </Grid>
            </GridItem>
            
          </Grid>
        </Box>
      </MotionBox>
    </Box>
  );
};
export default Portfolio;