import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/analytics";

/**
 * Dispara un page_view en cada cambio de ruta.
 *
 * Hace falta porque el sitio es una SPA: al pasar de / a /sportfolio no hay
 * recarga, así que gtag no se entera solo. Por eso `send_page_view` va en
 * false en la config y la vista la mandamos nosotros.
 *
 * Lee `document.title` después de que SeoHead lo haya escrito: React corre los
 * efectos de los hijos antes que los del padre, y este hook vive en App
 * mientras SeoHead cuelga de cada página.
 */
export const usePageTracking = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(`${pathname}${search}`, document.title);
  }, [pathname, search]);
};
