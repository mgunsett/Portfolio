import { Box, Heading, Text, Stack, Button, Flex } from "@chakra-ui/react";
import { MotionBox, MotionImage } from "./Motion";
import { useMotionValue, useTransform } from "framer-motion";
import logoCelu from "../assets/logo-celu.png";
import { useEffect } from "react";

// Botones de acción reutilizados en mobile y desktop
const HeroActions = ({ onProjects, onContact, full }) => (
  <Flex gap={4} w={full ? "100%" : "auto"} pt={{ base: 1, md: 0 }}>
    <Button
      bg="green"
      color="beige"
      size="lg"
      px={8}
      h={{ base: 14, md: 12 }}
      flex={full ? 1 : "initial"}
      borderRadius="xl"
      boxShadow="0 10px 30px -10px rgba(45,90,71,0.6)"
      _hover={{ bg: "green", opacity: 0.9, transform: "translateY(-2px)" }}
      _active={{ transform: "translateY(0)" }}
      transition="all 0.2s ease"
      onClick={onProjects}
    >
      Ver proyectos
    </Button>
    <Button
      bg="yellow"
      color="black"
      size="lg"
      px={8}
      h={{ base: 14, md: 12 }}
      flex={full ? 1 : "initial"}
      borderRadius="xl"
      boxShadow="0 10px 30px -12px rgba(232,213,163,0.7)"
      _hover={{ bg: "yellow", opacity: 0.9, transform: "translateY(-2px)" }}
      _active={{ transform: "translateY(0)" }}
      transition="all 0.2s ease"
      onClick={onContact}
    >
      Contacto
    </Button>
  </Flex>
);

const Eyebrow = () => (
  <Flex align="center" gap={4} justify="center">
    <Box w="40px" h="1px" bg="green" />
    <Text fontSize="sm" letterSpacing="0.3em" textTransform="uppercase" color="green">
      Portfolio
    </Text>
    <Box w="40px" h="1px" bg="green" display={{ base: "block", md: "none" }} />
  </Flex>
);

const Hero = () => {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);

  const translateX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;

      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  //Scroll a secciones
  const scrollToSectionSlow = (sectionId, duration = 1600) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const goProjects = () => scrollToSectionSlow("proyectos");
  const goContact = () => scrollToSectionSlow("contacto");

  return (
    <Box
      id="home"
      minH="100vh"
      display="flex"
      alignItems="center"
      px={{ base: 6, md: 12, lg: 24 }}
      py={{ base: 12, md: 0 }}
      position="relative"
      overflow="hidden"
      sx={{ perspective: "1000px" }}
    >
      {/* Halos de color para profundidad */}
      <Box
        position="absolute"
        top={{ base: "-8%", md: "0%" }}
        right={{ base: "-25%", md: "5%" }}
        w={{ base: "320px", md: "520px" }}
        h={{ base: "320px", md: "520px" }}
        bg="green"
        opacity={0.18}
        filter="blur(90px)"
        borderRadius="full"
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom={{ base: "0%", md: "10%" }}
        left={{ base: "-20%", md: "30%" }}
        w={{ base: "260px", md: "380px" }}
        h={{ base: "260px", md: "380px" }}
        bg="yellow"
        opacity={0.12}
        filter="blur(80px)"
        borderRadius="full"
        pointerEvents="none"
        zIndex={0}
      />

      {/* ===================== MOBILE ===================== */}
      <MotionBox
        display={{ base: "flex", md: "none" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        direction="column"
        flexDirection="column"
        align="center"
        textAlign="center"
        w="100%"
        position="relative"
        zIndex={1}
        gap={4}
      >
        <Eyebrow />

        {/* Composición en capas: nombre detrás, personaje delante */}
        <Box position="relative" w="100%" h="420px" display="flex" justifyContent="center">
          <Heading
            position="absolute"
            inset={0}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            fontSize={{ base: "7xl", sm: "8xl" }}
            lineHeight="0.9"
            letterSpacing="-0.02em"
            whiteSpace="nowrap"
            zIndex={0}
            py={2}
          >
            <Box as="span">MATÍAS</Box>
            <Box as="span" color="green">GUNSETT</Box>
          </Heading>

          <MotionBox
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            position="relative"
            zIndex={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <MotionImage
              src={logoCelu}
              alt="Logo Matías Gunsett"
              h="450px"
              maxW="100%"
              objectFit="contain"
              filter="drop-shadow(0 25px 40px rgba(0,0,0,0.35))"
            />
          </MotionBox>
        </Box>

        <Stack spacing={6} align="center" w="100%">
          <Flex align="center" gap={4} justify="center">
            <Box w="30px" h="3px" bg="yellow" />
            <Text fontSize="sm" letterSpacing="0.15em" textTransform="uppercase">
              Front·End  Developer
            </Text>
            <Box w="30px" h="3px" bg="yellow" />
          </Flex>

          <HeroActions onProjects={goProjects} onContact={goContact} full />
        </Stack>
      </MotionBox>

      {/* ===================== DESKTOP ===================== */}
      <MotionBox
        display={{ base: "none", md: "block" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        w="100%"
        position="relative"
        zIndex={1}
      >
        <Flex direction="row" align="center" justify="center">
          <Stack spacing={8} maxW="5xl">
            <Flex align="center" gap={4}>
              <Box w="40px" h="1px" bg="green" />
              <Text fontSize="sm" letterSpacing="0.3em" textTransform="uppercase" color="green">
                Portfolio
              </Text>
            </Flex>

            <Heading fontSize={{ md: "7xl", lg: "8xl" }} lineHeight="1">
              MATÍAS <br />
              <Box as="span" color="green">GUNSETT</Box>
            </Heading>

            <Flex align="center" gap={4}>
              <Box w="50px" h="3px" bg="yellow" />
              <Text fontSize="xl" letterSpacing="0.15em" textTransform="uppercase">
                Front-End Developer · React.js
              </Text>
            </Flex>

            <HeroActions onProjects={goProjects} onContact={goContact} />
          </Stack>

          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <MotionImage
              src={logoCelu}
              alt="Logo Matías Gunsett"
              w={{ md: "480px", lg: "600px" }}
              h={{ md: "560px", lg: "700px" }}
              objectFit="contain"
              style={{ rotateX, rotateY, x: translateX, y: translateY }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            />
          </MotionBox>
        </Flex>
      </MotionBox>
    </Box>
  );
};

export default Hero;
