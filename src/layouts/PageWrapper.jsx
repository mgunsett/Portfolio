import { useEffect } from "react";
import { VisuallyHidden } from "@chakra-ui/react";
import { MotionBox } from "../components/ui/Motion";

const variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/**
 * Envoltorio de página: transición de entrada, scroll al tope y el landmark
 * `main` del documento (el Navbar y el toggle viven fuera, en App).
 *
 * `h1` es el encabezado real de la página y va oculto a la vista. Suena raro,
 * pero es lo único que da un h1 *único*: los dos Heroes dibujan el nombre dos
 * veces —un bloque mobile y uno desktop, ambos en el DOM, uno tapado por CSS—,
 * así que marcar el título visible dejaría dos h1 en la página o uno con
 * display:none en la mitad de los breakpoints. Además el wordmark dice
 * "MATÍAS GUNSETT", que no es de lo que trata la página: acá entra la frase
 * con las palabras por las que queremos que nos encuentren.
 */
const PageWrapper = ({ children, h1 }) => {
  // Cada página entra desde arriba: sin esto, al saltar entre Portfolio y
  // Sportfolio se conserva el scroll de la anterior y se cae en medio del contenido.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionBox
      as="main"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: "100vh" }}
    >
      {h1 && (
        <VisuallyHidden>
          <h1>{h1}</h1>
        </VisuallyHidden>
      )}
      {children}
    </MotionBox>
  );
};

export default PageWrapper;
