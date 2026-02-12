import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { MotionBox } from "./Motion";
import html from '../assets/icono-html.webp';
import css from '../assets/icono-css.webp';
import js from '../assets/icono-js.webp';
import react from '../assets/icono-react.webp';
import chakra from '../assets/icono-chakra.webp';
import node from '../assets/icono-node.webp';
import api from '../assets/icono-api.webp'; 
import postgre from '../assets/icono-postgre.webp';
import firebase from '../assets/icono-firebase.webp';
import auth from '../assets/icono-auth.webp';
import git from '../assets/icono-git.webp';
import github from '../assets/icono-github.webp';
import vite from '../assets/icono-vite.webp';
import hostinger from '../assets/icono-hostinger.webp';
import figma from '../assets/icono-figma.webp';
import canva from '../assets/icono-canva.webp';
import wireframes from '../assets/icono-wireframes.webp';
import responsive from '../assets/icono-responsive.webp';
import './styleComponents.css';


const Habilidades = () => {
    const { colorMode } = useColorMode();
    
    const shadowFilter = colorMode === "dark"
      ? 'drop-shadow(0 4px 8px rgba(255, 251, 251, 0.63))'
      :'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))';
    
    return (
    <Box position="relative">
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
                <Flex align="center" justify="flex-start" pt={6} wrap="wrap" gap={2}>
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
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
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
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
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
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
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
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            React.js
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
                         transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Chakra UI
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
                <Flex align="center" justify="flex-start" pt={6} wrap="wrap" gap={2}>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={node} 
                        alt="Node.js" 
                        w={8} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}      
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Node.js
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
                        src={auth} 
                        alt="Authentication" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Auth
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
                        src={api} 
                        alt="API" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            API Rest
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
                        src={postgre} 
                        alt="PostgreSQL" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            PostgreSQL
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
                        src={firebase} 
                        alt="Firebase" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Firebase
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
                HERRAMIENTAS
                </Text>
                <Flex align="center" justify="flex-start" pt={6} wrap="wrap" gap={2}>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={git} 
                        alt="Git" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}      
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Git
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
                        src={github} 
                        alt="GitHub" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            GitHub
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
                        src={vite} 
                        alt="Vite" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Vite
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
                        src={hostinger} 
                        alt="Hostinger" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Hostinger
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
                UX/UI DESIGN
                </Text>
                <Flex align="center" justify="flex-start" pt={6} wrap="wrap" gap={2}>
                    <Flex 
                        h={24} 
                        w={20} 
                        flexDirection="column"
                        align="center"
                        justify="center"
                    >
                        <Image 
                        src={figma} 
                        alt="Figma" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}      
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Figma
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
                        src={canva} 
                        alt="Canva" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Canva
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
                        src={wireframes} 
                        alt="Wireframes" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Wireframes
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
                        src={responsive} 
                        alt="Responsive Design" 
                        w={10} 
                        h={10}
                        transition='transform 0.2s ease-in-out'
                        _hover={{
                            transform: 'scale(1.1)',
                            filter: shadowFilter
                        }}
                        />
                        <Text fontSize="xs" letterSpacing="0.08em" mt={3} textAlign="center">
                            Responsive
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