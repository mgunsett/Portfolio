import { useEffect, useState } from "react";

/**
 * `true` cuando la página pasó el umbral. Lo usa el Navbar para pasar de
 * transparente sobre el Hero a fondo con blur sobre el resto del contenido.
 */
export const useScrolled = (threshold = 60) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};
