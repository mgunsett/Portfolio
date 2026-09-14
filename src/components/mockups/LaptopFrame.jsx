import { Box, Flex, Text } from "@chakra-ui/react";

/**
 * Proporción de pantalla de un portátil moderno (16:10).
 *
 * Se exporta por el mismo motivo que la del teléfono: de acá sale el alto de
 * todo lo que use el marco, y quien lo encaje en un contenedor con alto máximo
 * necesita el ratio para despejar el ancho.
 */
export const SCREEN_RATIO = "16 / 10";

/** Semáforo de la barra de título, en el orden de siempre. */
const TRAFFIC_LIGHTS = ["#ff5f57", "#febc2e", "#28c840"];

/**
 * Barra de título del navegador.
 *
 * Ancla la vista como "esto es la web real corriendo en una pantalla real" y de
 * paso muestra el dominio. El contrapeso de la derecha tiene el ancho exacto de
 * los tres puntos para que la píldora quede centrada en la barra entera.
 */
const BrowserChrome = ({ url }) => (
  <Flex align="center" gap="6px" px={3} h="28px" flexShrink={0} bg="#1c1c1e">
    {TRAFFIC_LIGHTS.map(dot => (
      <Box key={dot} w="9px" h="9px" borderRadius="full" bg={dot} />
    ))}
    <Flex flex="1" justify="center" minW={0}>
      <Text
        maxW="70%"
        px={3}
        py="1px"
        bg="whiteAlpha.100"
        borderRadius="full"
        fontFamily="space"
        fontSize="10px"
        color="whiteAlpha.700"
        isTruncated
      >
        {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
      </Text>
    </Flex>
    <Box w="39px" flexShrink={0} />
  </Flex>
);

/**
 * Mockup de notebook. Lo que le pases como children ocupa la pantalla.
 *
 * Es el gemelo desktop de PhoneFrame y comparte su lenguaje: banda de aluminio
 * con degradado diagonal para simular el canto biselado, bisel negro, sombra
 * proyectada y un barrido de vidrio sobre el contenido. La diferencia está en
 * la mitad de abajo —bisagra y base— que es lo que hace que se lea como una
 * notebook abierta y no como un rectángulo con borde.
 *
 * Con `url` la pantalla suma la barra del navegador arriba y los children pasan
 * a ocupar lo que queda. Vive acá y no en cada modal por el mismo motivo que el
 * marco: si el chrome cambia, cambia en todos lados.
 */
const LaptopFrame = ({ maxW = "1000px", url, screenRef, screenProps, children, ...rest }) => (
  <Box position="relative" w="100%" maxW={maxW} {...rest}>
    {/* Tapa: banda de aluminio + bisel negro + pantalla */}
    <Box
      position="relative"
      zIndex={1}
      w="100%"
      borderTopRadius="14px"
      borderBottomRadius="3px"
      p="9px"
      pb="15px"
      bgGradient="linear(150deg, #8e8e93 0%, #2c2c2e 7%, #1c1c1e 45%, #1c1c1e 58%, #2c2c2e 93%, #8e8e93 100%)"
      boxShadow="0 30px 60px -18px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)"
    >
      {/* Cámara: va en el bisel y no sobre la pantalla, así no tapa contenido */}
      <Box
        position="absolute"
        top="3px"
        left="50%"
        transform="translateX(-50%)"
        w="5px"
        h="5px"
        borderRadius="full"
        bg="#0f0f10"
        boxShadow="inset 0 0 0 1px rgba(255, 255, 255, 0.14)"
      />

      <Box
        ref={screenRef}
        position="relative"
        w="100%"
        sx={{ aspectRatio: SCREEN_RATIO }}
        borderRadius="4px"
        overflow="hidden"
        bg="#0B0B0B"
        {...screenProps}
      >
        {url ? (
          <Flex direction="column" h="100%">
            <BrowserChrome url={url} />
            <Box position="relative" flex="1" minH={0}>
              {children}
            </Box>
          </Flex>
        ) : (
          children
        )}

        {/* Reflejo del vidrio: barrido diagonal muy sutil sobre el contenido */}
        <Box
          position="absolute"
          inset={0}
          zIndex={1}
          pointerEvents="none"
          bgGradient="linear(115deg, whiteAlpha.200 0%, transparent 30%, transparent 100%)"
        />
      </Box>
    </Box>

    {/* Bisagra: franja oscura que asoma detrás de la tapa */}
    <Box
      position="relative"
      zIndex={0}
      left="50%"
      transform="translateX(-50%)"
      w="103%"
      h="9px"
      bgGradient="linear(to-b, #3a3a3c, #1c1c1e)"
    />

    {/* Base: más ancha que la tapa, con la muesca central para abrirla */}
    <Box
      position="relative"
      left="50%"
      transform="translateX(-50%)"
      w="107%"
      h="13px"
      borderBottomRadius="10px"
      bgGradient="linear(to-b, #c7c7cc 0%, #8e8e93 35%, #5a5a5e 78%, #3a3a3c 100%)"
      boxShadow="0 22px 28px -16px rgba(0, 0, 0, 0.8)"
    >
      <Box
        position="absolute"
        top={0}
        left="50%"
        transform="translateX(-50%)"
        w="11%"
        h="5px"
        bg="#26262a"
        borderBottomRadius="full"
      />
    </Box>
  </Box>
);

export default LaptopFrame;
