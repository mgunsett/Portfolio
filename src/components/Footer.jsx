import {
    Box,
    Flex,
    Heading,
    Text,
    Link,
    useColorMode,
    List,
    ListItem,
    Image
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

    return (
        <Box as="footer" bg={bg} color={color} py={8} mt={12}>
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="start" gap={8} py={12} px={40}>
                <Box>
                    <Image src={logo} alt="Logo" boxSize="200px" />
                </Box>

                <Box>
                    <Heading as="h3" size="lg">Links</Heading>
                    <List mt={2} spacing={2}>
                        <ListItem display="flex" alignItems="center" gap={2}>
                            <Box w={3} h={3} bg={hoverColor} borderRadius="full"/>
                            <Link href="#home" _hover={{ textDecoration: 'none', color: hoverColor }}>Home</Link>
                        </ListItem>
                        <ListItem display="flex" alignItems="center" gap={2}>
                            <Box w={3} h={3} bg="green" borderRadius="full"/>
                            <Link href="#perfil" _hover={{ textDecoration: 'none', color: hoverColor }}>Perfil</Link>
                        </ListItem>
                        <ListItem display="flex" alignItems="center" gap={2}>
                            <Box w={3} h={3} bg="green" borderRadius="full"/>
                            <Link href="#habilidades" _hover={{ textDecoration: 'none', color: hoverColor }}>Habilidades</Link>
                        </ListItem>   
                        <ListItem display="flex" alignItems="center" gap={2}>
                            <Box w={3} h={3} bg="green" borderRadius="full"/>
                            <Link href="#proyectos" _hover={{ textDecoration: 'none', color: hoverColor }}>Proyectos</Link>
                        </ListItem>
                        <ListItem display="flex" alignItems="center" gap={2}>
                            <Box w={3} h={3} bg="green" borderRadius="full"/>
                            <Link href="#contacto" _hover={{ textDecoration: 'none', color: hoverColor }}>Contacto</Link>
                        </ListItem>
                    </List>
                </Box>

                <Box>
                    <Heading as="h3" size="lg">Social</Heading>
                    <Flex mt={4} gap={2} justify={{ base: "center", md: "flex-start" }}>
                        <Link href="https://www.instagram.com/mgunsett/" isExternal mx={2} >
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
                        mx={2} 
                        transition="transform 0.2s"
                        _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
                        >
                            <BsFillThreadsFill size={30}/>
                        </Link>
                        <Link href="https://github.com/mgunsett" isExternal mx={2} mt={'-2px'}>
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

            <Box textAlign="center" mt={8}>
                <Text>&copy; {currentYear} Matias Gunsett. Todos los derechos reservados.</Text>
            </Box>
        </Box>
    );
}

export default Footer;