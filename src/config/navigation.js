/**
 * Mapa de navegación del sitio: qué secciones tiene cada página y a cuál
 * salta el botón del extremo opuesto del Navbar.
 *
 * Es la fuente única: Navbar, panel desplegable y Footer leen de acá, así que
 * agregar o sacar una sección se hace en un solo lugar.
 */

export const ROUTES = {
  portfolio: "/",
  sportfolio: "/sportfolio",
};

/** Página principal: el perfil de Matías como Front-End Developer. */
export const PORTFOLIO_NAV = [
  { id: "home", number: "00", label: "Inicio" },
  { id: "perfil", number: "01", label: "Perfil" },
  { id: "habilidades", number: "02", label: "Habilidades" },
  { id: "proyectos", number: "03", label: "Proyectos" },
  { id: "contacto", number: "04", label: "Contacto" },
];

/** Sportfolio: la línea de servicio de landings para futbolistas. */
export const SPORTFOLIO_NAV = [
  { id: "home", number: "00", label: "Inicio" },
  { id: "preview", number: "01", label: "Landing Page" },
  { id: "casos", number: "02", label: "Destacados" },
  { id: "servicio", number: "03", label: "Servicio" },
  { id: "mas-proyectos", number: "04", label: "Más proyectos" },
  { id: "planes", number: "05", label: "Planes" },
  { id: "contacto", number: "06", label: "Contacto" },
];

export const NAV_BY_ROUTE = {
  [ROUTES.portfolio]: {
    links: PORTFOLIO_NAV,
    switchTo: { to: ROUTES.sportfolio, label: "Sportfolio" },
  },
  [ROUTES.sportfolio]: {
    links: SPORTFOLIO_NAV,
    switchTo: { to: ROUTES.portfolio, label: "Portfolio" },
  },
};

/** Normaliza el pathname para que "/sportfolio/" resuelva igual que "/sportfolio". */
export const navForPath = (pathname) => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return NAV_BY_ROUTE[clean] ?? NAV_BY_ROUTE[ROUTES.portfolio];
};
