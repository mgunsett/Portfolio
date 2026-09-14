/**
 * Capa de Google Analytics 4.
 *
 * Todo el módulo es un no-op salvo que exista `VITE_GA_ID` y el build sea de
 * producción: en `pnpm dev` no se envía nada, así el desarrollo no ensucia las
 * métricas reales. Esto importa más de lo que parece: los eventos marcados con
 * `debug_mode` NO quedan en una bandeja aparte, entran igual a los informes
 * estándar. DebugView solo los muestra además. Sin este gate, cada `pnpm dev`
 * contaminaría la propiedad real.
 *
 * La llave de escape es `VITE_GA_FORCE=true` en el .env: fuerza el envío desde
 * dev para poder verificar en DebugView antes de deployar. Se pone, se
 * comprueba que los eventos llegan con los parámetros correctos, y se saca.
 *
 * Ningún componente toca `window.gtag` directo: si mañana esto pasa a
 * Plausible o a Umami, se reescribe solo este archivo.
 */
const GA_ID = import.meta.env.VITE_GA_ID;

const IS_PROD = import.meta.env.PROD;

const FORCE = import.meta.env.VITE_GA_FORCE === "true";

const enabled = Boolean(GA_ID) && (IS_PROD || FORCE);

let ready = false;

/**
 * Página actual, normalizada. Sin el recorte del slash final, "/sportfolio" y
 * "/sportfolio/" serían dos valores distintos de la misma dimensión y habría
 * que sumarlos a mano en cada informe.
 */
export const paginaActual = () => {
  const { pathname } = window.location;
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
};

/** Inyecta gtag.js y configura la propiedad. Idempotente. */
export const initAnalytics = () => {
  // Estado al arrancar. Sin esto, "no veo eventos" no distingue entre el módulo
  // apagado a propósito, la pestaña con el bundle viejo y gtag bloqueado.
  if (!IS_PROD) {
    console.log(
      "[GA4 dev] init:",
      enabled
        ? `enviando a ${GA_ID} (VITE_GA_FORCE activo, aparece en DebugView)`
        : "apagado — los eventos solo se loguean acá",
    );
  }

  if (!enabled || ready) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // gtag empuja su lista de argumentos tal cual: tiene que ser una función
  // clásica, una arrow no tiene `arguments`.
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID, {
    // La SPA no recarga entre rutas: el page_view lo dispara usePageTracking.
    send_page_view: false,
    // Solo puede ser true si entramos por VITE_GA_FORCE, que es justamente
    // cuando queremos mirar DebugView.
    debug_mode: !IS_PROD,
    // Google Signals apagado a propósito. Con el volumen de un portfolio
    // activa los umbrales de datos y GA4 empieza a esconder filas; además
    // evita el consentimiento que exige la publicidad personalizada.
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  ready = true;
};

/**
 * Evento genérico. Preferí los helpers de abajo: mantienen los nombres de
 * evento y de parámetro en un solo lugar. Queda exportado para `useVisibilidad`
 * y para lo que venga.
 *
 * Nunca tira error: si gtag no está (adblocker, falta el ID, o estamos en dev)
 * simplemente no hace nada. En dev además lo escupe por consola para poder
 * verificar los parámetros sin mandar un solo dato a GA.
 */
export const trackEvent = (name, params = {}) => {
  if (!IS_PROD) console.log("[GA4 dev]", name, params);
  if (!ready) return;
  window.gtag("event", name, params);
};

/** Vista de página. La dispara el hook en cada cambio de ruta. */
export const trackPageView = (path, title) => {
  trackEvent("page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  });
};

/*
 * Conversiones.
 *
 * `origen` es el nombre canónico del proyecto para "en qué parte de la UI se
 * hizo el click", y se repite en todos los eventos. Es a propósito que no diga
 * en qué página estamos: eso lo responde `pagina`, y separarlos permite cruzar
 * "contacto en /sportfolio" contra "contacto en /" sin inventar un valor nuevo
 * por cada combinación.
 *
 * Nada de lo que viaja acá identifica a una persona: son posiciones de la
 * interfaz y slugs de casos propios.
 */

/** origen: contacto | planes — plan: basica | pro | premium | ninguno */
export const trackWhatsApp = ({ origen, plan = "ninguno" }) =>
  trackEvent("click_whatsapp", { origen, plan, pagina: paginaActual() });

/** origen: contacto | menu */
export const trackEmail = (origen) => trackEvent("click_email", { origen });

/**
 * Un solo evento para las cuatro redes. Cuatro eventos con nombre propio no
 * escalan: en el informe hay que leerlos de a uno en vez de agrupar por `red`.
 */
export const trackSocial = ({ red, origen }) =>
  trackEvent("click_social", { red, origen });

/**
 * Apertura del modal de un caso. Cubre las dos familias —los jugadores de
 * players.js y los proyectos de desarrollo de projects.js— separadas por
 * `tipo`, en vez de dos eventos que después habría que sumar a mano. Por eso
 * el parámetro se llama `caso` y no `jugador`.
 *
 * origen: destacados | mas_proyectos | proyectos_dev
 */
export const trackCaso = ({ caso, tipo, origen }) =>
  trackEvent("ver_caso", { caso, tipo, origen });

/** El visitante se va al dominio del caso. origen: modal | fallback */
export const trackLandingExterna = ({ caso, tipo, url_destino, origen }) =>
  trackEvent("click_landing_externa", {
    caso,
    tipo,
    url_destino,
    origen,
    pagina: paginaActual(),
  });
