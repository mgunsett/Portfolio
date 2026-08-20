import {
  Box,
  Flex,
  Link,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useColorMode,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiMonitor, FiSmartphone, FiExternalLink } from "react-icons/fi";
import MediaFrame from "./MediaFrame";
import SectionDivider from "./SectionDivider";

/** Vista previa de un proyecto de desarrollo dentro de un frame desktop/mobile. */
const ModalProyects = ({ isOpen, onClose, project }) => {
  const zoom = 0.72;
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, sm: false, md: false });

  // Arranca según el breakpoint; solo cambia si el usuario togglea la vista.
  const [viewOverride, setViewOverride] = useState(null);
  const activeView = viewOverride ?? (isMobile ? "mobile" : "desktop");

  const handleClose = () => {
    setViewOverride(null);
    onClose();
  };

  const isDesktopView = activeView === "desktop";
  const modalBg = colorMode === "dark" ? "surface" : "modalbg";
  const textColor = colorMode === "dark" ? "beige" : "background";
  const inactiveButtonBg = colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100";
  const panelBg = colorMode === "dark" ? "black" : "white";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="6xl">
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bg={modalBg} color={textColor} m={4}>
        <ModalCloseButton _hover={{ bg: "red.600", opacity: 0.5 }} />
        <ModalBody pb={8} pt={12}>
          <Flex direction="column" gap={2}>
            <Flex align="center" justify="center" gap={3}>
              <IconButton
                display={isMobile ? "none" : "inline-flex"}
                aria-label="Vista desktop"
                icon={<FiMonitor />}
                onClick={() => setViewOverride("desktop")}
                variant="ghost"
                bg={isDesktopView ? "green" : inactiveButtonBg}
                color={isDesktopView ? "white" : textColor}
                _hover={{ bg: isDesktopView ? "green" : inactiveButtonBg, opacity: 0.9 }}
              />
              <IconButton
                aria-label="Vista mobile"
                icon={<FiSmartphone />}
                onClick={() => setViewOverride("mobile")}
                variant="ghost"
                bg={!isDesktopView ? "green" : inactiveButtonBg}
                color={!isDesktopView ? "white" : textColor}
                _hover={{ bg: !isDesktopView ? "green" : inactiveButtonBg, opacity: 0.8 }}
              />
              <Tooltip label="Visitar web" placement="right-start" hasArrow>
                <IconButton
                  aria-label="Abrir sitio"
                  icon={<FiExternalLink />}
                  as={Link}
                  href={project?.url}
                  variant="ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                  bg={inactiveButtonBg}
                  color={textColor}
                  _hover={{ bg: "green", opacity: 0.5 }}
                />
              </Tooltip>
            </Flex>

            <SectionDivider />

            {isDesktopView && !isMobile ? (
              <Flex direction="column" align="center" gap={0}>
                <Box
                  className="desktopContainer"
                  w="100%"
                  h="75vh"
                  border="2px solid"
                  borderColor="green"
                  borderTopRadius="xl"
                  borderBottomRadius="md"
                  bg={panelBg}
                  p={2}
                >
                  <MediaFrame
                    item={{
                      type: "iframe",
                      src: project?.url,
                      alt: `${project?.name || "Proyecto"} - Vista desktop`,
                    }}
                    zoom={zoom}
                    h="100%"
                  />
                </Box>
                <Box w="180px" h="10px" bg="green" borderBottomRadius="md" />
                <Box w="290px" h="8px" bg="green" mt={2} opacity={0.85} />
              </Flex>
            ) : (
              <Flex justify="center">
                <Box
                  w={{ base: "90%", sm: "340px" }}
                  h={{ base: "560px", sm: "590px" }}
                  border="1px solid"
                  borderColor="green"
                  borderRadius="3xl"
                  bg={panelBg}
                  p={2}
                  overflow="hidden"
                  position="relative"
                >
                  <Box
                    w="90px"
                    h="6px"
                    bg="white"
                    borderRadius="full"
                    position="absolute"
                    top={3}
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex={1}
                    opacity={0.8}
                  />
                  <MediaFrame
                    item={{
                      type: "iframe",
                      src: project?.url,
                      alt: `${project?.name || "Proyecto"} - Vista mobile`,
                    }}
                    zoom={zoom}
                    h="100%"
                    borderRadius="2xl"
                  />
                </Box>
              </Flex>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalProyects;
