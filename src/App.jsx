import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Sportfolio from "./pages/Sportfolio";
import Navbar from "./components/Navbar";
import ColorModeToggle from "./components/ColorModeToggle";
import { ROUTES } from "./config/navigation";

const App = () => {
  const location = useLocation();

  return (
    <>
      {/* Fuera del AnimatePresence: la barra persiste entre páginas y solo
          cambia sus items y el destino del botón según la ruta. */}
      <Navbar />
      <ColorModeToggle />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path={ROUTES.portfolio} element={<Home />} />
          <Route path={ROUTES.sportfolio} element={<Sportfolio />} />
          <Route path="*" element={<Navigate to={ROUTES.portfolio} replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
