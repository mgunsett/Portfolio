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
 * El setTimeout(0) no es decorativo: SeoHead escribe `document.title` dentro de
 * su propio efecto, y si leyéramos el título acá de forma síncrona GA se
 * quedaría con el de la página anterior. Aplazarlo un tick lo manda al final de
 * la cola, cuando el título ya es el nuevo. El clearTimeout cancela el envío si
 * la ruta vuelve a cambiar antes de que llegue el turno.
 */
export const usePageTracking = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const id = setTimeout(() => {
      trackPageView(`${pathname}${search}`, document.title);
    }, 0);

    return () => clearTimeout(id);
  }, [pathname, search]);
};
