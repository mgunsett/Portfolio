import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
import { MdCheck } from "react-icons/md";
import { MotionBox } from "./Motion";
import SectionDivider from "./SectionDivider";
import SectionHeader from "./SectionHeader";
import { BRAND, whatsappLink } from "../config/brand";
import ledHorizontal from "../assets/led_horizontal.png";


const PLANS = [
  {
    id: "basica",
    name: "Landing Básica",
    scope: null,
    audience: "Para el jugador que todavía no tiene un sitio propio.",
    inherits: null,
    features: [
      "Landing de una página con diseño exclusivo, sin plantillas",
      "Perfil, estadísticas standard, posición y trayectoria por club",
      "Galería de fotos y videos destacados",
      "Optimizada para mobile y para compartir por WhatsApp",
      "Contacto directo para clubes y representantes",
      "Dominio propio y puesta en línea",
    ],
    featured: false,
    withPartner: false,
    ctaMessage:
      "Hola Matías, me interesa la Landing Básica para un jugador. ¿Cómo seguimos?",
  },
  {
    id: "pro",
    name: "Landing Pro",
    scope: "Resultados actualizados",
    audience:
      "Para el jugador en actividad que necesita mostrar su presente, no solo su historia.",
    inherits: "Todo lo de la Landing Básica +",
    features: [
      "Resultados actualizados: último partido y próximo rival",
      "Estadísticas de temporada y atributos del jugador",
      "Sección de highlights en video",
      "Actualización de datos durante la temporada",
      "Posicionamiento en buscadores optimizado",
    ],
    featured: true,
    badge: "Más elegida",
    withPartner: true,
    ctaMessage:
      "Hola Matías, me interesa la Landing Pro con resultados actualizados. ¿Cómo seguimos?",
  },
  {
    id: "premium",
    name: "Web Premium",
    scope: "Home principal + 2 páginas personalizadas",
    audience:
      "Para el jugador o el club que necesita un sitio completo, con secciones propias.",
    inherits: "Todo lo de la Landing Pro +",
    features: [
      "Home principal + 2 páginas a medida (carrera, prensa, fundación…)",
      "Sección de prensa y notas, con carga de novedades",
      "Versión en inglés para el mercado externo",
      "Optimización para buscadores (SEO) incluida",
      "Estrategia de marca y lanzamiento junto a LED Sports",
    ],
    featured: false,
    withPartner: true,
    ctaMessage:
      "Hola Matías, me interesa la Web Premium (home + 2 páginas). ¿Cómo seguimos?",
  },
];

/**
 * Sello de la alianza.
 *
 * El logotipo de LED Sports es blanco con el isotipo naranja: sobre el beige
 * del modo claro desaparecería, así que el chip es oscuro en los dos modos.
 * Deja de ser un accidente y pasa a leerse como una placa de marca.
 */
const PartnerSeal = () => (
  <Link
    href={BRAND.partner.url}
    isExternal
    aria-label={`En alianza con ${BRAND.partner.name}`}
    display="inline-flex"
    alignItems="center"
    gap={2.5}
    bg="rgba(11,11,11,0.85)"
    border="1px solid"
    borderColor="rgba(255,255,255,0.14)"
    borderRadius="full"
    pl={3}
    pr={3.5}
    py={1.5}
    transition="border-color 0.25s ease, opacity 0.25s ease"
    _hover={{ textDecoration: "none", borderColor: "green", opacity: 0.9 }}
  >
    <Text
      fontFamily="space"
      fontSize="9px"
      letterSpacing="0.18em"
      textTransform="uppercase"
      color="whiteAlpha.700"
      whiteSpace="nowrap"
    >
      En alianza con
    </Text>
    <Image
      src={ledHorizontal}
      alt={BRAND.partner.name}
      h={{ base: "16px", md: "18px" }}
      objectFit="contain"
    />
  </Link>
);

/** Ítem de la lista: check en círculo verde + texto. */
const FeatureItem = ({ text, accent }) => (
  <Flex as="li" align="flex-start" gap={3} listStyleType="none">
    <Flex
      align="center"
      justify="center"
      w="18px"
      h="18px"
      mt="2px"
      flexShrink={0}
      borderRadius="full"
      border="1px solid"
      borderColor={accent}
      color={accent}
    >
      <Icon as={MdCheck} boxSize="11px" />
    </Flex>
    <Text fontSize="sm" fontFamily="space" opacity={0.85} lineHeight="1.5">
      {text}
    </Text>
  </Flex>
);

/**
 * Card de un modelo.
 *
 * La destacada no cambia de lenguaje: es la misma card con el borde verde, un
 * halo detrás y unos píxeles más de alto (`my` negativo en desktop). Alcanza
 * para que la mirada caiga ahí primero sin romper la grilla ni inventar un
 * estilo que no existe en el resto del sitio.
 */
const PlanCard = ({ plan, index }) => {
  const reduced = useReducedMotion();

  const cardBg = useColorModeValue("rgba(255,255,255,0.75)", "rgba(17,17,17,0.85)");
  const featuredBg = useColorModeValue(
    "linear(to-b, rgba(45,90,71,0.14), rgba(248,246,241,0.95))",
    "linear(to-b, rgba(45,90,71,0.30), rgba(17,17,17,0.95))",
  );
  const restBorder = useColorModeValue("rgba(11,11,11,0.14)", "rgba(255,255,255,0.12)");
  const dividerColor = useColorModeValue("rgba(11,11,11,0.12)", "rgba(255,255,255,0.10)");
  // El amarillo de marca se apaga contra el beige: en claro el check lo toma el verde.
  const accent = useColorModeValue("green", "yellow");
  const ctaText = useColorModeValue("claro", "beige");
  const haloOpacity = useColorModeValue(0.5, 1);

  const { featured } = plan;

  return (
    <Box position="relative" h="100%">
      {/* Halo: solo detrás de la destacada, y solo donde hay lugar para que
          respire. En mobile las cards se tocan y el resplandor ensuciaría. */}
      {featured && (
        <Box
          position="absolute"
          inset="-12%"
          display={{ base: "none", lg: "block" }}
          bgGradient="radial(circle at 50% 25%, rgba(45,90,71,0.55), transparent 68%)"
          filter="blur(38px)"
          opacity={haloOpacity}
          pointerEvents="none"
          zIndex={0}
        />
      )}

      <MotionBox
        position="relative"
        zIndex={1}
        h="100%"
        display="flex"
        flexDirection="column"
        borderRadius="16px"
        border="1px solid"
        borderColor={featured ? "green" : restBorder}
        bg={featured ? undefined : cardBg}
        bgGradient={featured ? featuredBg : undefined}
        backdropFilter="blur(6px)"
        px={{ base: 6, md: 6, lg: 7 }}
        py={{ base: 7, lg: featured ? 10 : 8 }}
        my={{ lg: featured ? -6 : 0 }}
        boxShadow={featured ? "0 20px 60px rgba(0,0,0,0.35)" : "none"}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={reduced ? undefined : { y: -6 }}
      >
        {/* Cinta de esquina, como en la referencia: no empuja el título hacia
            abajo, así las tres cards arrancan a la misma altura. */}
        {plan.badge && (
          <Text
            position="absolute"
            top={4}
            right={4}
            bg="yellow"
            color="background"
            borderRadius="full"
            px={3}
            py={1}
            fontFamily="space"
            fontSize="9px"
            fontWeight="bold"
            letterSpacing="0.18em"
            textTransform="uppercase"
            whiteSpace="nowrap"
          >
            {plan.badge}
          </Text>
        )}

        <Heading
          as="h3"
          fontFamily='"Syne", sans-serif'
          fontSize={{ base: "xl", lg: featured ? "2xl" : "xl" }}
          fontWeight="700"
          textTransform="uppercase"
          lineHeight="1.15"
          pr={plan.badge ? "96px" : 0}
        >
          {plan.name}
        </Heading>

        {plan.scope && (
          <Text
            mt={2}
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="0.12em"
            textTransform="uppercase"
            color="green"
          >
            {plan.scope}
          </Text>
        )}

        {/* El sello va debajo del título y no encima: primero se lee qué plan
            es, después con quién se produce. Arriba competía con el nombre. */}
        {plan.withPartner && (
          <Box mt={4}>
            <PartnerSeal />
          </Box>
        )}

        <Text mt={4} fontSize="sm" fontFamily="space" opacity={0.75} lineHeight="1.6">
          {plan.audience}
        </Text>

        <Box h="1px" bg={dividerColor} my={6} />

        {plan.inherits && (
          <Text
            mb={4}
            fontFamily="space"
            fontSize="10px"
            letterSpacing="0.16em"
            textTransform="uppercase"
            opacity={0.6}
          >
            {plan.inherits}
          </Text>
        )}

        <Flex as="ul" direction="column" gap={3.5} mb={8} pl={0} styleType="none">
          {plan.features.map((feature) => (
            <FeatureItem key={feature} text={feature} accent={accent} />
          ))}
        </Flex>

        {/* mt="auto" empuja el botón al piso: con listas de distinto largo los
            tres CTA quedan igual alineados abajo. */}
        <Box
          as="a"
          href={whatsappLink(plan.ctaMessage)}
          target="_blank"
          rel="noopener noreferrer"
          mt="auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          w="100%"
          py={3.5}
          borderRadius="10px"
          border="1px solid"
          borderColor="green"
          bg={featured ? "green" : "transparent"}
          color={featured ? ctaText : "inherit"}
          fontSize="sm"
          fontWeight="bold"
          letterSpacing="0.12em"
          textTransform="uppercase"
          transition="background 0.25s ease, color 0.25s ease, opacity 0.25s ease"
          _hover={
            featured
              ? { opacity: 0.85 }
              : { bg: "green", color: ctaText }
          }
        >
          Consultar →
        </Box>
      </MotionBox>
    </Box>
  );
};

/**
 * "Planes": los tres modelos que se pueden contratar.
 *
 * Va last minute antes del contacto y no antes: el visitante ya vio el
 * producto, los casos y el proceso, así que acá lo único que falta es elegir
 * alcance. Sin precios —se definen en la charla— el peso de la sección lo
 * lleva el único botón de cada card.
 */
const Plans = ({ number = "05" }) => {
  return (
    <Box id="planes" position="relative">
      <SectionDivider mt={10} mb={12} />

      <MotionBox
        as="section"
        py={{ base: 16, md: 24 }}
        px={{ base: 6, md: 12, lg: 24 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box maxW="6xl" mx="auto">
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "flex-end" }}
            justify="space-between"
            gap={6}
            mb={{ base: 10, md: 14 }}
          >
            <SectionHeader
              number={number}
              title="Planes"
              subtitle="Tres alcances posibles. Elegís hasta dónde llega el sitio y el presupuesto se arma sobre eso."
            />

            <Text
              fontFamily="space"
              fontSize="xs"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="green"
              flexShrink={0}
              pb={1}
            >
              Primera charla sin costo
            </Text>
          </Flex>

          {/* Tres columnas recién en lg: en tablet las cards quedarían tan
              angostas que la lista se rompe en una palabra por renglón. */}
          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
            gap={{ base: 6, lg: 6 }}
            alignItems="stretch"
            maxW={{ base: "md", lg: "none" }}
            mx="auto"
            py={{ lg: 6 }}
          >
            {PLANS.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </Grid>

          <Text
            mt={{ base: 10, md: 12 }}
            textAlign="center"
            fontSize="sm"
            fontFamily="space"
            opacity={0.65}
            maxW="2xl"
            mx="auto"
            lineHeight="1.7"
          >
            Los planes Pro y Premium se producen junto a {BRAND.partner.name}:
            contenido, estadísticas y material audiovisual del jugador.
          </Text>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default Plans;
