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
import logoOscuro from "../../assets/logo-oscuro.png";
import logoClaro3 from "../../assets/logo-claro3.png";
import { BsFillThreadsFill } from "react-icons/bs";
import instagram from "../../assets/instagram.webp";
import iconoGithub from "../../assets/icono-github.webp";
import { Link as RouterLink } from "react-router-dom";
import { BRAND, displayName } from "../../config/brand";
import ledHorizontal from "../../assets/led_horizontal.png";
import matiAvatar3 from "../../assets/mati_avatar3.webp";
import { useSiteNav } from "../../hooks/useSiteNav";
import { scrollToSection } from "../../utils/scrollToSection";
import { trackSocial } from "../../lib/analytics";

const Footer = () => {

    const currentYear = new Date().getFullYear();
    const { colorMode } = useColorMode();
    const { links, switchTo } = useSiteNav();

    const bg = colorMode === "dark" ? "surface" : "modalbg";
    const color = colorMode === "dark" ? "beige" : "background";
    const logo = colorMode === "dark" ? logoClaro3 : logoOscuro;
    const hoverColor = colorMode === "dark" ? "yellow" : "green";

    return (
        <Box as="footer" bg={bg} color={color} py={12} mt={12} position="relative" overflow="hidden">
            {/* Avatar de fondo: centrado y anclado al borde inferior */}
            <Box
                position="absolute"
                bottom={0}
                left="50%"
                transform="translateX(-50%)"
                h={{ base: "180px", md: "300px", lg: "360px" }}
                zIndex={0}
                pointerEvents="none"
                aria-hidden="true"
            >
                <Image
                    loading="lazy"
                    decoding="async"
                    src={matiAvatar3}
                    alt=""
                    h="100%"
                    w="auto"
                    objectFit="contain"
                    objectPosition="bottom center"
                />
            </Box>

            <Flex
                position="relative"
                zIndex={1}
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "center", md: "flex-start" }}
                gap={{ base: 14, md: 8 }}
                py={12}
                px={{ base: 4, md: 20, lg: 40 }}
            >
                <Box textAlign={{ base: "center", md: "left" }}>
                    <Image
                        loading="lazy"
                        decoding="async"
                        src={logo}
                        alt={displayName()}
                        boxSize={{ base: "150px", md: "200px" }}
                        mx={{ base: "auto", md: 0 }}
                    />
                    <Text fontSize="sm" opacity={0.85} mt={4}>
                        &copy; {currentYear} {displayName()}. Todos los derechos reservados.
                    </Text>
                </Box>

                {/* Links y redes: visibles en todos los breakpoints */}
                <Flex direction="row" justify="center" gap={{ base: 16, md: 20 }}>
                    <Box>
                        <Heading as="h2" size="lg">Links</Heading>
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
                        <Heading as="h2" size="lg" textAlign={{ base: "right", md: "left" }}>Social</Heading>
                        <Flex mt={4} gap={4} justify={{ base: "flex-end", md: "flex-start" }}>
                            <Link
                                href={BRAND.social.instagram}
                                onClick={() => trackSocial({ red: "instagram", origen: "footer" })}
                                isExternal
                            >
                                <Image loading="lazy" decoding="async"
                                    src={instagram}
                                    alt="Instagram"
                                    boxSize="30px"
                                    transition="transform 0.2s"
                                    _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
                                />
                            </Link>
                            <Link
                                href={BRAND.social.threads}
                                onClick={() => trackSocial({ red: "threads", origen: "footer" })}
                                isExternal
                                transition="transform 0.2s"
                                _hover={{ transform: "scale(1.1)", filter: "brightness(1.2)" }}
                            >
                                <BsFillThreadsFill size={30} />
                            </Link>
                            <Link
                                href={BRAND.social.github}
                                onClick={() => trackSocial({ red: "github", origen: "footer" })}
                                isExternal
                                mt={'-2px'}
                            >
                                <Image loading="lazy" decoding="async"
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
                                    <Image loading="lazy" decoding="async"
                                        src={ledHorizontal}
                                        alt="LED Sports, agencia de marketing deportivo"
                                        h="25px"
                                        objectFit="contain"
                                    />
                                </Link>
                            </Box>
                        )}
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
}

export default Footer;
