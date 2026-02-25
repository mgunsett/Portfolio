import {
    Box,
    Flex,
    Heading,
    Text,
    Link,
    useColorMode,
    List,
    ListItem,
    Image,
    useBreakpointValue,
} from "@chakra-ui/react";
import logoOscuro from "../assets/logo-oscuro.png";
import logoClaro3 from "../assets/logo-claro3.png";
import { BsFillThreadsFill } from "react-icons/bs";
import instagram from "../assets/instagram.webp";
import iconoGithub from "../assets/icono-github.webp";


const Footer = () => {
    
    const currentYear = new Date().getFullYear();
    const { colorMode } = useColorMode();

    const bg = colorMode === "dark" ? "surface" : "modalbg";
    const color = colorMode === "dark" ? "beige" : "background";
    const logo = colorMode === "dark" ? logoClaro3 : logoOscuro;
    const hoverColor = colorMode === "dark" ? "yellow" : "green";  
    const isMobile = useBreakpointValue({ base: true, sm: false, md: false });

    return (
        <Box as="footer" bg={bg} color={color} py={8} mt={12}>
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "center", md: "start" }} gap={{ base: 20, md: 8 }} py={12} px={{ base: 4, md: 40 }}>
                <Box>
                    <Image src={logo} alt="Logo" boxSize={{ base: "150px", md: "200px" }} />
                </Box>
                <Flex display={ isMobile ? "flex" : "none" } direction="row" justify="center" gap={20} >
                    <Box>
                        <Heading as="h3" size="lg">Links</Heading>
                        <List mt={2} spacing={2} >
                            <ListItem display="flex" alignItems="center" gap={2}>
                                <Box w={{ base: 2, md: 3 }} h={{ base: 2, md: 3 }} bg={hoverColor} borderRadius="full" />
                                <Link href="#home" _hover={{ textDecoration: 'none', color: hoverColor }}>Home</Link>
                            </ListItem>
                            <ListItem display="flex" alignItems="center" gap={2}>
                                <Box w={{ base: 2, md: 3 }} h={{ base: 2, md: 3 }} bg="green" borderRadius="full" />
                                <Link href="#perfil" _hover={{ textDecoration: 'none', color: hoverColor }}>Perfil</Link>
                            </ListItem>
                            <ListItem display="flex" alignItems="center" gap={2}>
                                <Box w={{ base: 2, md: 3 }} h={{ base: 2, md: 3 }} bg="green" borderRadius="full" />
                                <Link href="#habilidades" _hover={{ textDecoration: 'none', color: hoverColor }}>Habilidades</Link>
                            </ListItem>
                            <ListItem display="flex" alignItems="center" gap={2}>
                                <Box w={{ base: 2, md: 3 }} h={{ base: 2, md: 3 }} bg="green" borderRadius="full" />
                                <Link href="#proyectos" _hover={{ textDecoration: 'none', color: hoverColor }}>Proyectos</Link>
                            </ListItem>
                            <ListItem display="flex" alignItems="center" gap={2}>
                                <Box w={{ base: 2, md: 3 }} h={{ base: 2, md: 3 }} bg="green" borderRadius="full" />
                                <Link href="#contacto" _hover={{ textDecoration: 'none', color: hoverColor }}>Contacto</Link>
                            </ListItem>
                        </List>
                    </Box>

                    <Box>
                        <Heading as="h3" size="lg" textAlign={{ base: "right", md: "left" }}>Social</Heading>
                        <Flex mt={4} gap={4} justify={{ base: "flex-end", md: "flex-start" }}>
                            <Link href="https://www.instagram.com/mgunsett/" isExternal>
                                <Image
                                    src={instagram}
                                    alt="Instagram"
                                    boxSize="30px"
                                    transition="transform 0.2s"
                                    _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
                                />
                            </Link>
                            <Link
                                href="https://www.threads.com/@mgunsett"
                                isExternal
                                transition="transform 0.2s"
                                _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
                            >
                                <BsFillThreadsFill size={30} />
                            </Link>
                            <Link href="https://github.com/mgunsett" isExternal mt={'-2px'}>
                                <Image
                                    src={iconoGithub}
                                    alt="GitHub"
                                    boxSize="34px"
                                    transition="transform 0.2s"
                                    _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
                                />
                            </Link>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>

            <Box textAlign="center" mt={{ base: 4, md: 8 }}>
                <Text>&copy; {currentYear} Matias Gunsett. Todos los derechos reservados.</Text>
            </Box>
        </Box>
    );
}

export default Footer;