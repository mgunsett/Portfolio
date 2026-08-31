import { Box, Flex, Grid, Link, Text, useColorMode } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsFillThreadsFill } from "react-icons/bs";
import { MotionBox, MotionFlex } from "./Motion";
import { BRAND } from "../config/brand";

const SOCIALS = [
  { key: "instagram", href: BRAND.social.instagram, label: "Instagram", Icon: FaInstagram },
  { key: "threads", href: BRAND.social.threads, label: "Threads", Icon: BsFillThreadsFill },
  { key: "github", href: BRAND.social.github, label: "GitHub", Icon: FaGithub },
  { key: "linkedin", href: BRAND.social.linkedin, label: "LinkedIn", Icon: FaLinkedin },
];

const listVariants = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/** Un item del menú: número en verde, etiqueta grande y regla que se llena al hover. */
const NavItem = ({ link, onSelect, hoverColor }) => (
  <MotionBox variants={itemVariants}>
    <Link
      href={`#${link.id}`}
      onClick={(e) => {
        e.preventDefault();
        onSelect(link.id);
      }}
      display="block"
      py={{ base: 3, md: 4 }}
      role="group"
      _hover={{ textDecoration: "none" }}
    >
      <Flex align="center" gap={4}>
        <Text
          fontFamily="space"
          fontSize="xs"
          letterSpacing="0.2em"
          color="green"
          flexShrink={0}
          w="24px"
        >
          {link.number}
        </Text>

        <Box
          h="1px"
          w={{ base: "16px", md: "24px" }}
          bg="green"
          flexShrink={0}
          transition="width 0.3s ease"
          _groupHover={{ width: "44px", background: hoverColor }}
        />

        <Text
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing="-0.01em"
          lineHeight="1.1"
          transition="color 0.25s ease, transform 0.25s ease"
          _groupHover={{ color: hoverColor, transform: "translateX(6px)" }}
        >
          {link.label}
        </Text>
      </Flex>
    </Link>
  </MotionBox>
);

/**
 * Panel que baja desde la barra. El alto se anima a "auto" para que sirva
 * igual con 4 items que con 6, sin tener que fijar una altura.
 */
const NavMenuPanel = ({ links, onSelect }) => {
  const { colorMode } = useColorMode();
  const reduced = useReducedMotion();

  const dark = colorMode === "dark";
  const bg = dark ? "rgba(11,11,11,0.92)" : "rgba(245,240,230,0.94)";
  const border = dark ? "whiteAlpha.200" : "blackAlpha.200";
  const hoverColor = dark ? "yellow" : "green";

  return (
    <MotionBox
      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
      animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      overflow="hidden"
      bg={bg}
      sx={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
      borderBottom="1px solid"
      borderColor={border}
    >
      <Box px={{ base: 6, md: 12, lg: 24 }} py={{ base: 6, md: 10 }} maxW="6xl" mx="auto">
        <MotionFlex
          as="nav"
          aria-label="Secciones de la página"
          direction="column"
          variants={listVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} columnGap={12}>
            {links.map((link) => (
              <NavItem
                key={link.id}
                link={link}
                onSelect={onSelect}
                hoverColor={hoverColor}
              />
            ))}
          </Grid>

          <MotionBox variants={itemVariants} mt={{ base: 6, md: 8 }} pt={6} borderTop="1px solid" borderColor={border}>
            <Flex
              direction={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              justify="space-between"
              gap={4}
            >
              <Link
                href={`mailto:${BRAND.email}`}
                fontFamily="space"
                fontSize="sm"
                opacity={0.75}
                _hover={{ textDecoration: "none", color: hoverColor, opacity: 1 }}
              >
                {BRAND.email}
              </Link>

              <Flex gap={5}>
                {SOCIALS.map((social) => (
                  <Link
                    key={social.key}
                    href={social.href}
                    isExternal
                    aria-label={social.label}
                    opacity={0.7}
                    transition="all 0.2s ease"
                    _hover={{ color: hoverColor, opacity: 1, transform: "translateY(-2px)" }}
                  >
                    <social.Icon size={20} />
                  </Link>
                ))}
              </Flex>
            </Flex>
          </MotionBox>
        </MotionFlex>
      </Box>
    </MotionBox>
  );
};

export default NavMenuPanel;
