import { Box, Flex, Image, Link, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

/**
 * Sitio en vivo embebido.
 *
 * `viewportWidth` hace que el sitio se renderice a ese ancho de CSS y se
 * escale para entrar en el contenedor. Es lo que permite mostrar la landing a
 * un viewport de teléfono real (390px) en vez de al ancho que quede: sin esto,
 * un marco de 300px le da al sitio un viewport de 300px, más angosto que
 * cualquier celular, y muchos layouts se rompen ahí abajo. Sin `viewportWidth`
 * se conserva el comportamiento viejo de `zoom`.
 *
 * El overlay es un estado de carga, no un detector de errores: si el sitio
 * bloquea el embebido con X-Frame-Options o CSP frame-ancestors, el iframe
 * igual dispara `load` y no hay forma desde JS de distinguirlo de una carga
 * buena. Por eso la salida no es automática sino el link a abrirlo en una
 * pestaña, siempre visible mientras carga.
 */
const LiveSiteFrame = ({ item, zoom, viewportWidth, ...boxProps }) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  // Solo hace falta medir cuando hay `viewportWidth`; con `zoom` la escala es
  // fija. El setState sale del callback del observer y no del cuerpo del
  // efecto, que es lo que evita el render en cascada.
  useEffect(() => {
    const container = containerRef.current;
    if (!viewportWidth || !container) return;

    const observer = new ResizeObserver(([entry]) =>
      setContainerWidth(entry.contentRect.width),
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [viewportWidth]);

  const scale = viewportWidth ? containerWidth / viewportWidth : zoom;
  const mounted = scale > 0;

  // El listener va por ref y no por la prop `onLoad`: Box es un componente de
  // Chakra, no un <iframe> pelado, y no hay garantía de que reenvíe el handler
  // al nodo. Suscribirse al elemento real saca esa duda del medio.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => setLoaded(true);
    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [mounted]);

  return (
    <Box ref={containerRef} position="relative" {...boxProps}>
      {/* Con `viewportWidth` se espera a tener la medida: montarlo antes haría
          que el iframe cargue a una escala que cambia al instante siguiente. */}
      {mounted && (
        <Box
          ref={iframeRef}
          as="iframe"
          src={item.src}
          title={item.alt || "Vista del sitio"}
          border="0"
          loading="lazy"
          position="absolute"
          top={0}
          left={0}
          w={viewportWidth ? `${viewportWidth}px` : `calc(100% / ${scale})`}
          h={`calc(100% / ${scale})`}
          transform={`scale(${scale})`}
          transformOrigin="top left"
        />
      )}

      {!loaded && (
        <Flex
          position="absolute"
          inset={0}
          direction="column"
          align="center"
          justify="center"
          gap={4}
          px={6}
          textAlign="center"
          bg="blackAlpha.800"
        >
          <Spinner size="md" color="green" thickness="2px" speed="0.8s" />
          <Text fontSize="xs" opacity={0.8} fontFamily="space">
            Cargando el sitio…
          </Text>
          <Link
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            color="green"
            fontSize="xs"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Abrir en una pestaña ↗
          </Link>
        </Flex>
      )}
    </Box>
  );
};

/**
 * Renderiza una pieza de media de un caso: video, imagen o iframe del sitio en vivo.
 *
 * Los videos se cargan con `preload="none"` y solo empiezan a reproducirse
 * cuando entran en viewport (IntersectionObserver), pausándose al salir. Así un
 * caso con varios reels no dispara varios MB en la primera carga.
 *
 * Respeta `prefers-reduced-motion`: si el usuario la tiene activada, el video
 * queda quieto en su poster con los controles disponibles.
 */
const MediaFrame = ({ item, zoom = 0.72, viewportWidth, ...boxProps }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const isPortrait = item?.orientation === "portrait";

  useEffect(() => {
    if (item?.type !== "video") return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rechaza si el navegador bloquea el autoplay: no es un error real.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [item]);

  if (!item) return null;

  const frame = {
    w: "100%",
    borderRadius: "md",
    overflow: "hidden",
    bg: "black",
  };

  if (item.type === "video") {
    return (
      <Box
        ref={containerRef}
        {...frame}
        sx={{ aspectRatio: isPortrait ? "9 / 16" : "16 / 9" }}
        {...boxProps}
      >
        <Box
          ref={videoRef}
          as="video"
          src={item.src}
          poster={item.poster}
          preload="none"
          muted
          loop
          playsInline
          controls={item.controls ?? false}
          w="100%"
          h="100%"
          objectFit="cover"
          aria-label={item.alt || "Video del caso"}
        />
      </Box>
    );
  }

  if (item.type === "image") {
    return (
      <Box
        {...frame}
        sx={{ aspectRatio: isPortrait ? "9 / 16" : "16 / 9" }}
        {...boxProps}
      >
        <Image
          src={item.src}
          alt={item.alt || "Captura del caso"}
          w="100%"
          h="100%"
          objectFit="cover"
          loading="lazy"
        />
      </Box>
    );
  }

  if (item.type === "iframe") {
    return (
      <LiveSiteFrame
        item={item}
        zoom={zoom}
        viewportWidth={viewportWidth}
        {...frame}
        {...boxProps}
      />
    );
  }

  return null;
};

export default MediaFrame;
