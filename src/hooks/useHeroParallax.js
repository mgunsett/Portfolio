import { useEffect } from "react";
import { useMotionValue, useTransform } from "framer-motion";

/**
 * Parallax suave siguiendo el mouse para la imagen del Hero: solo
 * desplazamiento y un leve escalado, para que el recorte nunca deje ver los
 * bordes duros del panel. Devuelve el `style` listo para un componente motion.
 */
export const useHeroParallax = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const translateX = useTransform(mouseX, [-0.5, 0.5], [14, -14]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return { x: translateX, y: translateY, scale: 1.1 };
};
