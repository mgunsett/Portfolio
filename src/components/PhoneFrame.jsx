import { Box } from "@chakra-ui/react";

/**
 * Proporción de pantalla de un iPhone moderno (19.5:9).
 *
 * Se exporta porque de acá sale el alto de todo lo que use el marco, y en
 * PlayersShowcase hay padding calculado contra ese alto.
 */
export const SCREEN_RATIO = "9 / 19.5";

/**
 * Aire (px) que hay que dejar libre arriba de la pantalla para que la Dynamic
 * Island no pise el contenido: su `top` (9px) + su alto (19px) + un respiro.
 *
 * Lo usa quien mete contenido plano en la pantalla: un screenshot no scrollea
 * por debajo de la isla como lo haria un sitio real, asi que ahi la isla lo
 * taparia.
 */
export const ISLAND_SAFE_TOP = 34;

/** Botón físico del canto del teléfono: sobresale 2px de la carcasa. */
const SideButton = ({ side, top, h }) => (
  <Box
    position="absolute"
    top={top}
    h={h}
    w="4px"
    zIndex={0}
    pointerEvents="none"
    borderRadius="2px"
    bgGradient="linear(to-r, #6b6b70, #2a2a2c)"
    {...(side === "left" ? { left: "-2px" } : { right: "-2px" })}
  />
);

/**
 * Mockup de iPhone. Lo que le pases como children ocupa la pantalla.
 *
 * Lo usan la card de la grilla (con un screenshot adentro) y el modal (con el
 * sitio en vivo en un iframe). Vive en su propio componente justamente para que
 * las dos vistas no se despeguen: si el bisel cambia acá, cambia en las dos.
 *
 * `screenRef` se expone porque quien está adentro suele necesitar medir la
 * pantalla —la card mide cuánto sobresale el screenshot para animar el scroll,
 * el modal calcula la escala del iframe—.
 */
const PhoneFrame = ({ maxW = "260px", screenRef, screenProps, children, ...rest }) => (
  <Box position="relative" w="100%" maxW={maxW} {...rest}>
    <SideButton side="left" top="16%" h="3.5%" />
    <SideButton side="left" top="24%" h="7%" />
    <SideButton side="left" top="33%" h="7%" />
    <SideButton side="right" top="27%" h="11%" />

    {/* Carcasa: banda de titanio + bisel negro + pantalla */}
    <Box
      position="relative"
      zIndex={1}
      w="100%"
      sx={{ aspectRatio: SCREEN_RATIO }}
      borderRadius="40px"
      p="3px"
      bgGradient="linear(150deg, #8e8e93 0%, #2c2c2e 9%, #1c1c1e 45%, #1c1c1e 58%, #2c2c2e 91%, #8e8e93 100%)"
      boxShadow="0 30px 60px -18px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)"
    >
      <Box w="100%" h="100%" borderRadius="37px" bg="#000" p="3px">
        <Box
          ref={screenRef}
          position="relative"
          w="100%"
          h="100%"
          borderRadius="32px"
          overflow="hidden"
          bg="#0B0B0B"
          {...screenProps}
        >
          {children}

          {/* Reflejo del vidrio: barrido diagonal muy sutil sobre el contenido */}
          <Box
            position="absolute"
            inset={0}
            zIndex={1}
            pointerEvents="none"
            bgGradient="linear(115deg, whiteAlpha.200 0%, transparent 32%, transparent 100%)"
          />

          {/* Dynamic Island */}
          <Box
            position="absolute"
            top="9px"
            left="50%"
            transform="translateX(-50%)"
            w="30%"
            h="19px"
            bg="#000"
            borderRadius="full"
            zIndex={2}
          />

          {/* Barra de gesto */}
          <Box
            position="absolute"
            bottom="7px"
            left="50%"
            transform="translateX(-50%)"
            w="34%"
            h="4px"
            bg="whiteAlpha.800"
            borderRadius="full"
            zIndex={2}
          />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default PhoneFrame;
