import {
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { FiExternalLink, FiMonitor, FiSmartphone } from "react-icons/fi";
import { useState } from "react";
import LaptopFrame from "./LaptopFrame";
import MediaFrame from "./MediaFrame";
import PhoneFrame from "./PhoneFrame";
import SectionDivider from "./SectionDivider";

/**
 * Detalle de un caso de jugador: galería (videos y capturas), sitio en vivo
 * dentro del frame desktop/mobile, métricas, highlights y testimonio.
 *
 * Los mockups (LaptopFrame / PhoneFrame) y el fallback de iframe son los
 * mismos que usa ModalProyects para los proyectos de desarrollo.
 */
const PlayerCaseModal = ({ isOpen, onClose, player }) => {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, sm: false, md: false });
  // La vista arranca según el breakpoint y solo cambia si el usuario la togglea.
  // Se deriva en vez de sincronizarse con un efecto: menos renders en cascada.
  const [viewOverride, setViewOverride] = useState(null);
  const activeView = viewOverride ?? (isMobile ? "mobile" : "desktop");

  const handleClose = () => {
    setViewOverride(null);
    onClose();
  };

  const isDesktopView = activeView === "desktop";
  const modalBg = colorMode === "dark" ? "surface" : "modalbg";
  const textColor = colorMode === "dark" ? "beige" : "background";
  const inactiveBg = colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100";

  if (!player) return null;

  const { player: info, media = [], metrics = [], highlights = [], testimonial, tech = [] } = player;
  const hasLiveSite = Boolean(player.url);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bg={modalBg} color={textColor} m={4}>
        <ModalCloseButton _hover={{ bg: "red.600", opacity: 0.5 }} />

        <ModalBody pb={10} pt={12}>
          {/* Cabecera del caso */}
          <Box mb={6}>
            <Text
              fontSize="xs"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="green"
              mb={2}
            >
              {[info.position, info.club, info.country].filter(Boolean).join(" · ")}
            </Text>
            <Flex align="baseline" gap={4} wrap="wrap">
              <Heading
                fontFamily='"Syne", sans-serif'
                fontSize={{ base: "2xl", md: "4xl" }}
                textTransform="uppercase"
                lineHeight="1.1"
              >
                {info.name}
              </Heading>
              {/* El dorsal salió de la card para no competir con el mockup;
                  acá adentro tiene lugar como acento, sin robarle el foco al
                  nombre. */}
              {info.number && (
                <Text
                  fontFamily={'"Syne", sans-serif'}
                  fontSize={{ base: "lg", md: "2xl" }}
                  fontWeight="bold"
                  color="yellow"
                  opacity={0.85}
                >
                  #{info.number}
                </Text>
              )}
              <Text fontSize="sm" opacity={0.6}>
                {player.year}
              </Text>
            </Flex>
          </Box>

          {/* Métricas: la prueba del resultado, arriba de todo */}
          {metrics.length > 0 && (
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: `repeat(${metrics.length}, 1fr)` }}
              gap={6}
              mb={8}
              py={6}
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor="whiteAlpha.300"
            >
              {metrics.map((m, i) => (
                <Box key={i}>
                  <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="green" lineHeight="1">
                    {m.value}
                  </Text>
                  <Text fontSize="xs" opacity={0.8} fontFamily="space" mt={2}>
                    {m.label}
                  </Text>
                </Box>
              ))}
            </Grid>
          )}

           {/* Sitio en vivo dentro del frame */}
          {hasLiveSite && (
            <>
              <Flex align="center" justify="center" gap={3} mb={2}>
                <IconButton
                  display={isMobile ? "none" : "inline-flex"}
                  aria-label="Vista desktop"
                  icon={<FiMonitor />}
                  onClick={() => setViewOverride("desktop")}
                  variant="ghost"
                  bg={isDesktopView ? "green" : inactiveBg}
                  color={isDesktopView ? "white" : textColor}
                  _hover={{ bg: isDesktopView ? "green" : inactiveBg, opacity: 0.9 }}
                />
                <IconButton
                  aria-label="Vista mobile"
                  icon={<FiSmartphone />}
                  onClick={() => setViewOverride("mobile")}
                  variant="ghost"
                  bg={!isDesktopView ? "green" : inactiveBg}
                  color={!isDesktopView ? "white" : textColor}
                  _hover={{ bg: !isDesktopView ? "green" : inactiveBg, opacity: 0.8 }}
                />
                <Tooltip label="Visitar web" placement="right-start" hasArrow>
                  <IconButton
                    aria-label="Abrir sitio"
                    icon={<FiExternalLink />}
                    as={Link}
                    href={player.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    bg={inactiveBg}
                    color={textColor}
                    _hover={{ bg: "green", opacity: 0.5 }}
                  />
                </Tooltip>
              </Flex>

              <SectionDivider mb={4} />

              {isDesktopView && !isMobile ? (
                <Flex justify="center" mb={10}>
                  <LaptopFrame maxW="min(94%, calc(60vh * 1.6))" url={player.url}>
                    <MediaFrame
                      item={{ type: "iframe", src: player.url, alt: `${info.name} — vista desktop` }}
                      viewportWidth={1440}
                      position="absolute"
                      inset={0}
                      w="100%"
                      h="100%"
                      borderRadius={0}
                    />
                  </LaptopFrame>
                </Flex>
              ) : (
                <Flex justify="center" mb={8}>
                  <PhoneFrame maxW={{ base: "280px", sm: "300px" }}>
                    <MediaFrame
                      item={{ type: "iframe", src: player.url, alt: `${info.name} — vista mobile` }}
                      viewportWidth={390}
                      position="absolute"
                      inset={0}
                      w="100%"
                      h="100%"
                      borderRadius={0}
                    />
                  </PhoneFrame>
                </Flex>
              )}
            </>
          )}
          {/*----------------------------------- Testimonio
          {testimonial && (
            <Box
              borderLeft="3px solid"
              borderColor="green"
              pl={6}
              py={2}
              mb={8}
            >
              <Text fontSize={{ base: "md", md: "lg" }} fontStyle="italic" mb={3}>
                “{testimonial.quote}”
              </Text>
              <Text fontSize="sm" opacity={0.75} fontFamily="space">
                {testimonial.author}
                {testimonial.role ? ` · ${testimonial.role}` : ""}
              </Text>
            </Box>
          )} */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlayerCaseModal;
