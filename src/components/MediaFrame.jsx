import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

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
const MediaFrame = ({ item, zoom = 0.72, ...boxProps }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [iframeError, setIframeError] = useState(false);

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
    if (iframeError) {
      return (
        <Flex
          {...frame}
          direction="column"
          align="center"
          justify="center"
          gap={4}
          px={6}
          py={10}
          textAlign="center"
          bg="transparent"
          {...boxProps}
        >
          <Text fontSize="sm" opacity={0.85}>
            Este sitio no permite mostrarse dentro de un iframe.
          </Text>
          <Link
            href={item.src}
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
      );
    }

    return (
      <Box {...frame} position="relative" {...boxProps}>
        <Box
          as="iframe"
          src={item.src}
          title={item.alt || "Vista del sitio"}
          border="0"
          loading="lazy"
          w={`calc(100% / ${zoom})`}
          h={`calc(100% / ${zoom})`}
          transform={`scale(${zoom})`}
          transformOrigin="top left"
          onError={() => setIframeError(true)}
        />
      </Box>
    );
  }

  return null;
};

export default MediaFrame;
