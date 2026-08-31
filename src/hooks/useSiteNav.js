import { useLocation } from "react-router-dom";
import { navForPath } from "../config/navigation";

/**
 * Devuelve los links de la página activa y el destino del botón del Navbar.
 * En "/" el botón lleva a Sportfolio; en "/sportfolio" vuelve al Portfolio.
 */
export const useSiteNav = () => {
  const { pathname } = useLocation();
  return navForPath(pathname);
};
