import {
  Box,
  Grid,
  GridItem,
  Flex,
  Heading,
  Text,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { MotionBox } from "./Motion.jsx";
import { MdMailOutline, MdWhatsapp  } from "react-icons/md";
import { FaLinkedin  } from "react-icons/fa";




const Contacto = () => {

  const { colorMode } = useColorMode();

  const shadowBox = colorMode === "dark" ? '0 4px 8px rgba(255, 255, 255, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.2)';
  const colorbg = colorMode === "dark" ? "#161515ce" : "beige";

  const email = "matiasgunsett@gmail.com";
  const subject = encodeURIComponent("Consulta desde tu Portfolio");
  const body = encodeURIComponent(
    "Hola Matias,\n\nTe contacto porque vi tu portfolio y me gustaría conversar sobre..."
  );

  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <Box id="contacto" position="relative" mb={10}>
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
                    href={mailtoLink}
                    p={6}
                    border="1px solid"
                    bg={colorbg}
                    borderColor="transparent"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4 }}
                    _hover={{ textDecoration: "none", boxShadow: shadowBox }}
                >
                <Flex align="center" gap={4}>
                  <Flex 
                  w="48px" 
                  h="48px" 
                  align="center" 
                  justify="center" 
                  bg="green"
                  >
                        <MdMailOutline fontSize={'22px'} color="white" />
                  </Flex>
                  <Box>
                    <Text
                      fontSize="sm"
                      textTransform="uppercase"
                      fontWeight="medium"
                      mb={1}
                      letterSpacing="wide"
                      color="green"
                    >
                      Email
                    </Text>
                    <Text fontSize="lg" fontWeight="semibold">
                      matiasgunsett@gmail.com
                    </Text>
                  </Box>
                </Flex>
              </MotionBox>

              {/* WHATSAPP */}
              <MotionBox
                as={Link}
                href="https://wa.link/710hd7"
                target="_blank"
                rel="noopener noreferrer"
                p={6}
                border="1px solid"
                bg={colorbg}
                borderColor="transparent"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                _hover={{ textDecoration: "none", boxShadow: shadowBox }}
              >
                <Flex align="center" gap={4}>
                  <Flex
                    w="48px"
                    h="48px"
                    align="center"
                    justify="center"  
                    bg="yellow"
                  >
                    <MdWhatsapp fontSize={'22px'} color="black" />
                  </Flex>

                  <Box>
                    <Text
                      fontSize="sm"
                      textTransform="uppercase"
                      fontWeight="medium"
                      mb={1}
                      letterSpacing="wide"
                      color="green"
                    >
                      WhatsApp
                    </Text>
                    <Text fontSize="lg" fontWeight="semibold">
                      +54 342 595-7222
                    </Text>
                  </Box>
                </Flex>
              </MotionBox>

              {/* LINKEDIN */}
              <MotionBox
                as={Link}
                href="https://linkedin.com/in/matiasgunsett"
                target="_blank"
                rel="noopener noreferrer"
                p={6}
                border="1px solid"
                bg={colorbg}
                borderColor="transparent"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                _hover={{ textDecoration: "none", boxShadow: shadowBox }}
              >
                <Flex align="center" gap={4}>
                  <Flex
                    w="48px"
                    h="48px"
                    align="center"
                    justify="center"  
                    bg='green'
                  >
                    <FaLinkedin fontSize={'22px'} color= 'white' />
                  </Flex>

                  <Box>
                    <Text
                      fontSize="sm"
                      textTransform="uppercase"
                      fontWeight="medium"
                      mb={1}
                      letterSpacing="wide"
                      color="green"
                    >
                      LinkedIn
                    </Text>
                    <Text fontSize="lg" fontWeight="semibold">
                      linkedin.com/in/matiasgunsett
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
