import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { MotionBox } from "./Motion";
import html from '../assets/icono-html.webp';
import css from '../assets/icono-css.webp';
import js from '../assets/icono-js.webp';
import react from '../assets/icono-react.webp';
import chakra from '../assets/icono-chakra.webp';
import saas from '../assets/icono-saas.webp';


const Habilidades = () => {
    return (
    <Box position="relative" bg={'#F5F0E8'}>
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
            <GridItem colSpan={{ base: 1, md: 12 }}>
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
                  02
                </Text>
              </Flex>
              <Heading
                fontFamily={'"Syne", sans-serif'}
                fontSize={["3xl", "4xl"]}
                fontWeight="700"
                textTransform="uppercase"
                lineHeight="1.2"
              >
                Habilidades  &  Tecnologias
              </Heading>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 6 }}>
              <Text
                fontSize="sm"
                letterSpacing="0.1em"
                color="green"
                textTransform="uppercase"
                fontWeight='semibold'
                fontFamily='space'
              >
                Front-End
                </Text>
                <Flex align="center" justify="flex-start" pt={4} wrap="wrap">
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={html} 
                        alt="HTML" 
                        w={8} 
                        h={10}
                        transition='transform 0.3s ease-in-out'
                        _hover={
                            {transform: 'scale(1.1)'}
                        }
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" textTransform="uppercase" mt={3} textAlign="center">
                            HTML
                        </Text>
                    </Flex>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={css} 
                        alt="CSS" 
                        w={8} 
                        h={10}
                        transition='transform 0.3s ease-in-out'
                        _hover={
                            {transform: 'scale(1.1)'}
                        }/>
                        <Text fontSize="xs" letterSpacing="0.08em" textTransform="uppercase" mt={3} textAlign="center">
                            CSS
                        </Text>
                    </Flex>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={js} 
                        alt="JavaScript" 
                        w={8} 
                        h={10}
                        transition='transform 0.3s ease-in-out'
                        _hover={
                            {transform: 'scale(1.1)'}
                        }
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            JavaScript
                        </Text>
                    </Flex>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={react} 
                        alt="React" 
                        w={8} 
                        h={10}
                        transition='transform 0.3s ease-in-out'
                        _hover={
                            {transform: 'scale(1.1)'}
                        }
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            React
                        </Text>
                    </Flex>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={chakra} 
                        alt="Chakra UI" 
                        w={10} 
                        h={10}
                         transition='transform 0.3s ease-in-out'
                        _hover={
                            {transform: 'scale(1.1)'}
                        }
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Chakra UI
                        </Text>
                    </Flex>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={saas} 
                        alt="Sass" 
                        w={10} 
                        h={10}
                         transition='transform 0.3s ease-in-out'
                        _hover={
                            {transform: 'scale(1.1)'}
                        }
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Sass
                        </Text>
                    </Flex>
                </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 6 }}>
              <Text
                fontSize="sm"
                letterSpacing="0.1em"
                color="green"
                textTransform="uppercase"
                fontWeight='semibold'
                fontFamily='space'
              >
                Backend
                </Text>
                <Flex align="center" justify="flex-start" pt={4} wrap="wrap">
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={html} 
                        alt="HTML" 
                        w={8} 
                        h={10}
                        transition='transform 0.3s ease-in-out'
                        _hover={
                            {transform: 'scale(1.1)'}
                        }
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" textTransform="uppercase" mt={3} textAlign="center">
                            HTML
                        </Text>
                    </Flex>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={css} 
                        alt="CSS" 
                        w={8} 
                        h={10}
                        transition='transform 0.3s ease-in-out'
                        _hover={
                            {transform: 'scale(1.1)'}
                        }/>
                        <Text fontSize="xs" letterSpacing="0.08em" textTransform="uppercase" mt={3} textAlign="center">
                            CSS
                        </Text>
                    </Flex>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={js} 
                        alt="JavaScript" 
                        w={8} 
                        h={10}
                        transition='transform 0.3s ease-in-out'
                        _hover={
                            {transform: 'scale(1.1)'}
                        }
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            JavaScript
                        </Text>
                    </Flex>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={react} 
                        alt="React" 
                        w={8} 
                        h={10}
                        transition='transform 0.3s ease-in-out'
                        _hover={
                            {transform: 'scale(1.1)'}
                        }
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            React
                        </Text>
                    </Flex>
                </Flex>
            </GridItem>
          </Grid>
        </Box>
      </MotionBox>
    </Box>
    );
}
export default Habilidades;