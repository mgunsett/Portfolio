import { Box, Flex, Image, Link, Text, useColorMode } from "@chakra-ui/react";
import { MotionBox } from "./Motion";
import { BRAND } from "../config/brand";

/**
 * Franja de credibilidad: la colaboración con la agencia de marketing deportivo.
 * Es autoridad prestada — el visitante ve que el trabajo no ocurre en el vacío.
 */
const Partners = () => {
  const { colorMode } = useColorMode();
  const bg = colorMode === "dark" ? "surface" : "modalbg";
  const { partner } = BRAND;

  if (!partner?.name) return null;

  return (
    <MotionBox
      as="section"
      bg={bg}
      py={{ base: 10, md: 12 }}
      px={{ base: 6, md: 12, lg: 24 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Flex
        maxW="6xl"
        mx="auto"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap={{ base: 4, md: 8 }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Text
          fontSize="xs"
          letterSpacing="0.25em"
          textTransform="uppercase"
          opacity={0.7}
          whiteSpace="nowrap"
        >
          En colaboración con
        </Text>

        <Box display={{ base: "none", md: "block" }} w="1px" h={10} bg="whiteAlpha.400" />

        <Link
          href={partner.url}
          isExternal
          _hover={{ textDecoration: "none", opacity: 0.85 }}
        >
          <Flex align="center" gap={4}>
            {partner.logo && (
              <Image src={partner.logo} alt={partner.name} h="40px" objectFit="contain" />
            )}
            <Box>
              <Text
                fontFamily='"Syne", sans-serif'
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="800"
                textTransform="uppercase"
                lineHeight="1.1"
                color="green"
              >
                {partner.name}
              </Text>
              <Text fontSize="xs" opacity={0.75} fontFamily="space" mt={1}>
                {partner.role}
              </Text>
            </Box>
          </Flex>
        </Link>
      </Flex>
    </MotionBox>
  );
};

export default Partners;
