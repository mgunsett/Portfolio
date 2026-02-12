import {
  Box,
  Container,
  Grid,
  GridItem,
  Flex,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { MotionBox } from "./Motion.jsx";


const Contacto = () => {
  return (
    <Box position="relative">
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
            <GridItem colSpan={{ base: 1, md: 5 }}>
              <Flex align="center" gap={4} mb={6}>
                <Box
                  w={3}
                  h={3}
                  bg="green"
                  borderRadius="full"
                />
                <Text
                  fontSize="sm"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  fontWeight="semibold"
                  color="green"
                >
                  05
                </Text>
              </Flex>
              <Heading
                fontFamily={'"Syne", sans-serif'}
                fontSize={["3xl", "4xl"]}
                fontWeight="700"
                textTransform="uppercase"
                lineHeight="1.2"
              >
                HABLEMOS
              </Heading>
              <Text mt={4} color="var(--color-text)" fontSize="lg">
                ¿Tenés un proyecto en mente? Me encantaría escuchar tu idea y explorar cómo puedo ayudarte a hacerla realidad.
                </Text>
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 7 }} pl={{ md: 12 }}>
                <Flex direction="column" gap={6}>
                {/* EMAIL */}
                <MotionBox
                    as={Link}
                    href="mailto:alejandro@mendez.dev"
                    p={6}
                    border="1px solid"
                    bg="var(--color-surface)"
                    borderColor="transparent"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    _hover={{ textDecoration: "none" }}
                >
                <Flex align="center" gap={4}>
                    <Flex
                        w="48px"
                        h="48px"
                        align="center"
                        justify="center"
                        bg="var(--color-green)"
                    >
                    <Box
                      as="svg"
                      w="20px"
                      h="20px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      color="var(--color-background)"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </Box>
                  </Flex>

                  <Box>
                    <Text
                      fontSize="sm"
                      textTransform="uppercase"
                      fontWeight="medium"
                      mb={1}
                      letterSpacing="wide"
                      color="var(--color-green)"
                    >
                      Email
                    </Text>
                    <Text fontSize="lg" fontWeight="semibold">
                      alejandro@mendez.dev
                    </Text>
                  </Box>
                </Flex>
              </MotionBox>

              {/* WHATSAPP */}
              <MotionBox
                as={Link}
                href="https://wa.me/5491112345678"
                target="_blank"
                rel="noopener noreferrer"
                p={6}
                border="1px solid"
                bg="var(--color-surface)"
                borderColor="transparent"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                _hover={{ textDecoration: "none" }}
              >
                <Flex align="center" gap={4}>
                  <Flex
                    w="48px"
                    h="48px"
                    align="center"
                    justify="center"
                    bg="var(--color-yellow)"
                  >
                    <Box
                      as="svg"
                      w="20px"
                      h="20px"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      color="var(--color-text)"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </Box>
                  </Flex>

                  <Box>
                    <Text
                      fontSize="sm"
                      textTransform="uppercase"
                      fontWeight="medium"
                      mb={1}
                      letterSpacing="wide"
                      color="var(--color-green)"
                    >
                      WhatsApp
                    </Text>
                    <Text fontSize="lg" fontWeight="semibold">
                      +54 9 11 1234-5678
                    </Text>
                  </Box>
                </Flex>
              </MotionBox>

              {/* LINKEDIN */}
              <MotionBox
                as={Link}
                href="https://linkedin.com/in/alejandromendez"
                target="_blank"
                rel="noopener noreferrer"
                p={6}
                border="1px solid"
                bg="var(--color-surface)"
                borderColor="transparent"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                _hover={{ textDecoration: "none" }}
              >
                <Flex align="center" gap={4}>
                  <Flex
                    w="48px"
                    h="48px"
                    align="center"
                    justify="center"
                    bg="var(--color-green)"
                  >
                    <Box
                      as="svg"
                      w="20px"
                      h="20px"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      color="var(--color-background)"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </Box>
                  </Flex>

                  <Box>
                    <Text
                      fontSize="sm"
                      textTransform="uppercase"
                      fontWeight="medium"
                      mb={1}
                      letterSpacing="wide"
                      color="var(--color-green)"
                    >
                      LinkedIn
                    </Text>
                    <Text fontSize="lg" fontWeight="semibold">
                      linkedin.com/in/alejandromendez
                    </Text>
                  </Box>
                </Flex>
              </MotionBox>
            </Flex>
          </GridItem>
        </Grid>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default Contacto;
