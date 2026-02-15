import {
  Box,
  Flex,
  Text,
  Link,
  AspectRatio,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiMonitor, FiSmartphone } from "react-icons/fi";

const ModalProyects = ({ isOpen, onClose, project }) => {
  const { colorMode } = useColorMode();
  const [activeView, setActiveView] = useState("desktop");
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    setActiveView("desktop");
    setIframeError(false);
  }, [project, isOpen]);

  const isDesktopView = activeView === "desktop";
  const modalBg = colorMode === "dark" ? "surface" : "modalbg";
  const textColor = colorMode === "dark" ? "beige" : "background";
  const mutedText = colorMode === "dark" ? "beige" : "background";
  const inactiveButtonBg = colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100";
  const inactiveButtonColor = colorMode === "dark" ? "beige" : "background";
  const panelBg = colorMode === "dark" ? "black" : "white";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="8xl" isCentered motionPreset="scale"> 
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bg={modalBg} color={textColor} mx={4} mt={4}>
        <ModalCloseButton />
        <ModalBody pb={8} pt={12}>
          <Flex direction="column" gap={6}>
            <Flex align="center" justify="center" gap={3}>
              <IconButton
                aria-label="Vista desktop"
                icon={<FiMonitor />}
                onClick={() => {
                  setActiveView("desktop");
                  setIframeError(false);
                }}
                variant="ghost"
                bg={isDesktopView ? "green" : inactiveButtonBg}
                color={isDesktopView ? "white" : inactiveButtonColor}
                _hover={{ bg: isDesktopView ? "green" : inactiveButtonBg, opacity: 0.9 }}
              />
              <IconButton
                aria-label="Vista mobile"
                icon={<FiSmartphone />}
                onClick={() => {
                  setActiveView("mobile");
                  setIframeError(false);
                }}
                variant="ghost"
                bg={!isDesktopView ? "green" : inactiveButtonBg}
                color={!isDesktopView ? "white" : inactiveButtonColor}
                _hover={{ bg: !isDesktopView ? "green" : inactiveButtonBg, opacity: 0.9 }}
              />
            </Flex>
            <Box
              w={{ base: "80%", md: "70%" }}
              h="2px"
              bgGradient="linear(to-r, transparent, green , transparent)"
              m={'auto'}
            />
            {isDesktopView ? (
              <Flex direction="column" align="center" gap={0}>
                <Box
                  className="desktopContainer"
                  w="85%"
                  h="80vh"
                  border="2px solid"
                  borderColor="green"
                  borderTopRadius="xl"
                  borderBottomRadius="md"
                  bg={panelBg}
                  p={2}
                >
                  {iframeError ? (
                    <Flex direction="column" align="center" justify="center" gap={4} px={6} textAlign="center" h="100%">
                        <Text fontSize="sm" opacity={0.85} color={mutedText}>
                          Este sitio no permite mostrarse dentro de un iframe.
                        </Text>
                        <Link
                          href={project?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="green"
                          fontSize="sm"
                          fontWeight="semibold"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          Abrir sitio
                        </Link>
                      </Flex>
                  ) : (
                    <Box
                      as="iframe"
                      src={project?.url || ""}
                      title={`${project?.name || "Proyecto"} - Vista desktop`}
                      border="0"
                      loading="lazy"
                      borderRadius="md"
                      w="100%"
                      h="100%"
                      onError={() => setIframeError(true)}
                    />
                  )}
                </Box>
                <Box w="180px" h="10px" bg="green" borderBottomRadius="md" />
                <Box w="260px" h="8px" bg="green" borderRadius="full" mt={2} opacity={0.85} />
              </Flex>
            ) : (
              <Flex justify="center">
                <Box
                  w={{ base: "90%", sm: "340px" }}
                  h={{ base: "560px", sm: "620px" }}
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
                    bg="green"
                    borderRadius="full"
                    position="absolute"
                    top={3}
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex={1}
                    opacity={0.8}
                  />
                  {iframeError ? (
                    <Flex direction="column" align="center" justify="center" gap={4} px={6} textAlign="center" h="100%">
                      <Text fontSize="sm" opacity={0.85} color={mutedText}>
                        Este sitio no permite mostrarse dentro de un iframe.
                      </Text>
                      <Link
                        href={project?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="green"
                        fontSize="sm"
                        fontWeight="semibold"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        Abrir sitio
                      </Link>
                    </Flex>
                  ) : (
                    <Box
                      as="iframe"
                      src={project?.url || ""}
                      title={`${project?.name || "Proyecto"} - Vista mobile`}
                      border="0"
                      w="100%"
                      h="100%"
                      loading="lazy"
                      borderRadius="2xl"
                      onError={() => setIframeError(true)}
                    />
                  )}
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
