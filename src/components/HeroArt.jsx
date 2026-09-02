import { Box, Image } from "@chakra-ui/react";
import { MotionBox, MotionImage } from "./Motion";
import fondoPortfolio from "../assets/fondo_portfolio.webp";
import avatarBlob from "../assets/fondo_avatar.webp";
import avatarFigure from "../assets/mati_avatar2.webp";

// Colores base del tema, necesarios en los degradados (no se pueden usar tokens dentro de gradients)
const BG_DARK = "#0B0B0B";

// Máscaras de difuminado del panel lateral: se aplican en dos capas anidadas
// (vertical en el contenedor, horizontal en el interior) para no depender de mask-composite.
const FADE_VERTICAL =
  "linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)";
const fadeHorizontal = (side) =>
  `linear-gradient(to ${side === "left" ? "left" : "right"}, transparent 0%, rgba(0,0,0,0.2) 7%, rgba(0,0,0,0.7) 16%, #000 62%)`;
// Máscara del fondo mobile: elipse suave que disuelve los cuatro bordes
const FADE_RADIAL =
  "radial-gradient(ellipse 85% 60% at 50% 42%, #000 0%, rgba(0,0,0,0.8) 45%, transparent 80%)";

// Velos que integran la imagen con el fondo del tema activo
const veilSideDark = (side) =>
  `linear-gradient(to ${side === "left" ? "left" : "right"}, ${BG_DARK} 0%, rgba(11,11,11,0.6) 28%, rgba(11,11,11,0.1) 68%, rgba(11,11,11,0.35) 100%)`;


export const HeroSideArt = ({ dark, style, side = "right", alt }) => (
  <Box
    display={{ base: "none", md: "block" }}
    position="absolute"
    top={0}
    bottom={0}
    left={side === "left" ? 0 : "auto"}
    right={side === "left" ? "auto" : 0}
    w={{ md: "58%", lg: "64%" }}
    zIndex={0}
    pointerEvents="none"
    overflow="hidden"
    sx={{ maskImage: FADE_VERTICAL, WebkitMaskImage: FADE_VERTICAL }}
  >
    <Box
      position="absolute"
      inset={0}
      overflow="hidden"
      sx={{ maskImage: fadeHorizontal(side), WebkitMaskImage: fadeHorizontal(side) }}
    >
      <MotionImage
        src={fondoPortfolio}
        alt={alt}
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition="50% 42%"
        filter="saturate(1.05)"
        fetchPriority="high"
        style={style}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      />
      <Box position="absolute" inset={0} bgImage={dark ? veilSideDark(side) : "transparent"} />
    </Box>
  </Box>
);

/**
 * Misma imagen en mobile, pero como fondo a sangre detrás de todo el contenido:
 * opacidad baja + velo para que el texto siga siendo legible en ambos modos.
 */
export const HeroMobileArt = ({ dark }) => (
  <Box
    display={{ base: "block", md: "none" }}
    position="absolute"
    inset={0}
    zIndex={0}
    pointerEvents="none"
    aria-hidden="true"
    overflow="hidden"
    sx={{ maskImage: FADE_RADIAL, WebkitMaskImage: FADE_RADIAL }}
  >
    <Box
      as="img"
      src={fondoPortfolio}
      alt=""
      w="100%"
      h="100%"
      objectFit="cover"
      objectPosition="50% 40%"
    />
    <Box position="absolute" inset={0}  />
  </Box>
);

/** Halo difuso que da profundidad y funde la imagen con el fondo del tema. */
export const HeroHalo = ({ side = "right" }) => (
  <Box
    position="absolute"
    top={{ base: "-8%", md: "0%" }}
    left={side === "left" ? { base: "-25%", md: "5%" } : "auto"}
    right={side === "left" ? "auto" : { base: "-25%", md: "5%" }}
    w={{ base: "320px", md: "520px" }}
    h={{ base: "320px", md: "520px" }}
    bg="#fff8f8af"
    opacity={0.18}
    filter="blur(90px)"
    borderRadius="full"
    pointerEvents="none"
    zIndex={0}
  />
);
 
const FIGURE = { width: "95.8%", left: "10.1%", bottom: "-12.6%" };

export const HeroAvatar = ({ w, style, alt = "", dark }) => (
  <MotionBox
    className="hero-portfolio-avatar-mobile"
    as="span"
    display="block"
    position={{ base: "absolute", md: "relative" }}
    w={w}
    maxW="100%"
    flexShrink={0}
    style={style}
    transition={{ type: "spring", stiffness: 80, damping: 20 }}
  >
    {/* Sombra difusa que apoya la figura sobre el fondo del tema */}
    <Box
      as="span"
      display="block"
      position="absolute"
      left="12%"
      right="12%"
      bottom="-1%"
      h="14%"
      borderRadius="full"
      bg={dark ? "rgba(0,0,0,0.65)" : "rgba(45,90,71,0.22)"}
      filter="blur(30px)"
      pointerEvents="none"
      aria-hidden="true"
    />

    {/* position relative para que la sombra absoluta quede por detrás */}
    <Image
      src={avatarBlob}
      alt=""
      aria-hidden="true"
      width={2100}
      height={2100}
      decoding="async"
      fetchPriority="high"
      style={{ position: "relative", display: "block", width: "100%", height: "auto" }}
    />

    <Image
      src={avatarFigure}
      alt={alt}
      aria-hidden={alt === "" ? "true" : undefined}
      decoding="async"
      fetchPriority="high"
      position="absolute"
      left={FIGURE.left}
      bottom={FIGURE.bottom}
      width={FIGURE.width}
      height="auto"
    />
  </MotionBox>
);
