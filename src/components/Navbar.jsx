import { useEffect, useState } from "react";
import { Box, Button, Flex, useColorMode } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { MotionBox } from "./Motion";
import NavMenuPanel from "./NavMenuPanel";
import { useSiteNav } from "../hooks/useSiteNav";
import { useScrolled } from "../hooks/useScrolled";
import { scrollToSection } from "../utils/scrollToSection";

/** Las tres barras del botón: se cruzan en X cuando el panel está abierto. */
const HamburgerBars = ({ open }) => {
  const bar = {
    width: "22px",
    height: "2px",
    background: "currentColor",
    borderRadius: "2px",
    display: "block",
  };

  return (
    <Box position="relative" w="22px" h="14px">
      <MotionBox
        style={{ ...bar, position: "absolute", top: 0 }}
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <MotionBox
        style={{ ...bar, position: "absolute", top: "6px" }}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <MotionBox
        style={{ ...bar, position: "absolute", top: "12px" }}
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </Box>
  );
};

/**
 * Barra fija del sitio. Nace transparente sobre el Hero y toma fondo con blur
 * apenas hay scroll. Los items del menú y el destino del botón derecho salen
 * de la ruta activa, así que la misma barra sirve para las dos páginas.
 */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { colorMode } = useColorMode();
  const { pathname } = useLocation();
  const { links, switchTo } = useSiteNav();
  const scrolled = useScrolled(60);

  const dark = colorMode === "dark";
  const solid = scrolled || open;

  // El panel no sobrevive a un cambio de página. Se ajusta durante el render
  // (patrón recomendado por React) en vez de con un efecto.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleSelect = (sectionId) => {
    setOpen(false);
    // Espera al cierre del panel para que el destino no se mueva a mitad del scroll.
    window.setTimeout(() => scrollToSection(sectionId), 220);
  };

  return (
    <Box as="header" position="fixed" top={0} left={0} right={0} zIndex={90}>
      <Box
        bg={solid ? (dark ? "rgba(11,11,11,0.72)" : "rgba(245,240,230,0.78)") : "transparent"}
        borderBottom="1px solid"
        borderColor={solid && !open ? (dark ? "whiteAlpha.200" : "blackAlpha.200") : "transparent"}
        sx={
          solid
            ? { backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }
            : undefined
        }
        transition="background-color 0.35s ease, border-color 0.35s ease"
      >
        <Flex
          h={{ base: "64px", md: "76px" }}
          align="center"
          justify="space-between"
          px={{ base: 5, md: 12, lg: 24 }}
          maxW="8xl"
          mx="auto"
        >
          <Button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            variant="ghost"
            px={3}
            h={11}
            gap={3}
            borderRadius="xl"
            color="currentColor"
            _hover={{ bg: dark ? "whiteAlpha.100" : "blackAlpha.100", color: dark ? "yellow" : "green" }}
            _active={{ transform: "scale(0.97)" }}
          >
            <HamburgerBars open={open} />
            <Box
              as="span"
              display={{ base: "none", md: "inline" }}
              fontSize="xs"
              letterSpacing="0.2em"
              textTransform="uppercase"
              fontWeight="semibold"
            >
              Menú
            </Box>
          </Button>

          <Button
            as={RouterLink}
            to={switchTo.to}
            bg="green"
            color="beige"
            h={11}
            px={{ base: 5, md: 7 }}
            fontSize={{ base: "xs", md: "sm" }}
            letterSpacing="0.12em"
            textTransform="uppercase"
            fontWeight="bold"
            borderRadius="full"
            boxShadow="0 10px 30px -12px rgba(45,90,71,0.8)"
            _hover={{ bg: "yellow", color: "background", transform: "translateY(-2px)", textDecoration: "none" }}
            _active={{ transform: "translateY(0)" }}
            transition="all 0.25s ease"
          >
            {switchTo.label}
            <Box as="span" ml={2} aria-hidden="true">&#8594;</Box>
          </Button>
        </Flex>
      </Box>

      <AnimatePresence initial={false}>
        {open && <NavMenuPanel key="panel" links={links} onSelect={handleSelect} />}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;
