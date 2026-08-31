import { useEffect } from "react";
import { MotionBox } from "../components/Motion";

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

const PageWrapper = ({ children }) => {
  // Cada página entra desde arriba: sin esto, al saltar entre Portfolio y
  // Sportfolio se conserva el scroll de la anterior y se cae en medio del contenido.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionBox
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: "100vh" }}
    >
      {children}
    </MotionBox>
  );
};

export default PageWrapper;
