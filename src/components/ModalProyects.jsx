import {
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
import LaptopFrame from "./LaptopFrame";
import MediaFrame from "./MediaFrame";
import PhoneFrame from "./PhoneFrame";
import SectionDivider from "./SectionDivider";

/** Vista previa de un proyecto de desarrollo dentro de un frame desktop/mobile. */
const ModalProyects = ({ isOpen, onClose, project }) => {
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
              <Flex justify="center" mb={6}>
                <LaptopFrame maxW="min(94%, calc(60vh * 1.6))" url={project?.url}>
                  <MediaFrame
                    item={{
                      type: "iframe",
                      src: project?.url,
                      alt: `${project?.name || "Proyecto"} - Vista desktop`,
                    }}
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
              <Flex justify="center" mb={4}>
                <PhoneFrame maxW={{ base: "280px", sm: "300px" }}>
                  <MediaFrame
                    item={{
                      type: "iframe",
                      src: project?.url,
                      alt: `${project?.name || "Proyecto"} - Vista mobile`,
                    }}
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
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalProyects;
