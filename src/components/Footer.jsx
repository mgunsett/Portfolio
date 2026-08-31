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
} from "@chakra-ui/react";
import logoOscuro from "../assets/logo-oscuro.png";
import logoClaro3 from "../assets/logo-claro3.png";
import { BsFillThreadsFill } from "react-icons/bs";
import instagram from "../assets/instagram.webp";
import iconoGithub from "../assets/icono-github.webp";
import { Link as RouterLink } from "react-router-dom";
import { BRAND, displayName } from "../config/brand";
import ledHorizontal from "../assets/led_horizontal.png";
import { useSiteNav } from "../hooks/useSiteNav";
import { scrollToSection } from "../utils/scrollToSection";

const Footer = () => {

    const currentYear = new Date().getFullYear();
    const { colorMode } = useColorMode();
    const { links, switchTo } = useSiteNav();

    const bg = colorMode === "dark" ? "surface" : "modalbg";
    const color = colorMode === "dark" ? "beige" : "background";
    const logo = colorMode === "dark" ? logoClaro3 : logoOscuro;
    const hoverColor = colorMode === "dark" ? "yellow" : "green";

    return (
        <Box as="footer" bg={bg} color={color} py={8} mt={12}>
            <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "center", md: "flex-start" }}
                gap={{ base: 14, md: 8 }}
                py={12}
                px={{ base: 4, md: 20, lg: 40 }}
            >
                <Box>
                    <Image src={logo} alt={displayName()} boxSize={{ base: "150px", md: "200px" }} />
                </Box>

                {/* Links y redes: visibles en todos los breakpoints */}
                <Flex direction="row" justify="center" gap={{ base: 16, md: 20 }}>
                    <Box>
                        <Heading as="h3" size="lg">Links</Heading>
                        <List mt={2} spacing={2}>
                            {links.map((link) => (
                                <ListItem key={link.id} display="flex" alignItems="center" gap={2}>
                                    <Box
                                        w={{ base: 2, md: 3 }}
                                        h={{ base: 2, md: 3 }}
                                        bg={link.id === "home" ? hoverColor : "green"}
                                        borderRadius="full"
                                        flexShrink={0}
                                    />
                                    <Link
                                        href={`#${link.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(link.id);
                                        }}
                                        _hover={{ textDecoration: 'none', color: hoverColor }}
                                    >
                                        {link.label}
                                    </Link>
                                </ListItem>
                            ))}

                            {/* Salto a la otra página del sitio */}
                            <ListItem display="flex" alignItems="center" gap={2} pt={3}>
                                <Box
                                    w={{ base: 2, md: 3 }}
                                    h={{ base: 2, md: 3 }}
                                    bg={hoverColor}
                                    borderRadius="full"
                                    flexShrink={0}
                                />
                                <Link
                                    as={RouterLink}
                                    to={switchTo.to}
                                    fontWeight="bold"
                                    _hover={{ textDecoration: 'none', color: hoverColor }}
                                >
                                    {switchTo.label} &#8594;
                                </Link>
                            </ListItem>
                        </List>
                    </Box>

                    <Box>
                        <Heading as="h3" size="lg" textAlign={{ base: "right", md: "left" }}>Social</Heading>
                        <Flex mt={4} gap={4} justify={{ base: "flex-end", md: "flex-start" }}>
                            <Link href={BRAND.social.instagram} isExternal>
                                <Image
                                    src={instagram}
                                    alt="Instagram"
                                    boxSize="30px"
                                    transition="transform 0.2s"
                                    _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
                                />
                            </Link>
                            <Link
                                href={BRAND.social.threads}
                                isExternal
                                transition="transform 0.2s"
                                _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
                            >
                                <BsFillThreadsFill size={30} />
                            </Link>
                            <Link href={BRAND.social.github} isExternal mt={'-2px'}>
                                <Image
                                    src={iconoGithub}
                                    alt="GitHub"
                                    boxSize="34px"
                                    transition="transform 0.2s"
                                    _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
                                />
                            </Link>
                        </Flex>

                        {BRAND.partner?.name && (
                            <Box mt={8}>
                                <Text
                                    fontSize="xs"
                                    letterSpacing="0.2em"
                                    textTransform="uppercase"
                                    opacity={0.6}
                                    mb={1}
                                >
                                    Partner
                                </Text>
                                <Link
                                    href={BRAND.partner.url}
                                    isExternal
                                    fontWeight="semibold"
                                    _hover={{ textDecoration: 'none', color: hoverColor }}
                                >
                                    <Image
                                        src={ledHorizontal}
                                        alt="LED Horizontal"
                                        h="25px"
                                        objectFit="contain"
                                    />
                                </Link>
                            </Box>
                        )}
                    </Box>
                </Flex>
            </Flex>

            <Box textAlign="center" mt={{ base: 4, md: 8 }}>
                <Text>&copy; {currentYear} {displayName()}. Todos los derechos reservados.</Text>
            </Box>
        </Box>
    );
}

export default Footer;
