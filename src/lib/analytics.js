/**
 * Capa de Google Analytics 4.
 *
 * Todo el módulo es un no-op salvo que exista `VITE_GA_ID` y el build sea de
 * producción: en `npm run dev` no se envía nada, así el desarrollo no ensucia
 * las métricas reales. Para probar de verdad hay que usar `npm run build` +
 * `npm run preview`, que sí corren como producción.
 *
 * Ningún componente toca `window.gtag` directo: si mañana esto pasa a
 * Plausible o a Umami, se reescribe solo este archivo.
 */
const GA_ID = import.meta.env.VITE_GA_ID;

const enabled = Boolean(GA_ID) && import.meta.env.PROD;

let ready = false;

/** Inyecta gtag.js y configura la propiedad. Idempotente. */
export const initAnalytics = () => {
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
    // Google Signals apagado a propósito. Con el volumen de un portfolio
    // activa los umbrales de datos y GA4 empieza a esconder filas; además
    // evita el consentimiento que exige la publicidad personalizada.
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  ready = true;
};

/** Evento genérico. Privado por convención: usá los helpers de abajo. */
const trackEvent = (name, params = {}) => {
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

/**
 * Conversiones. Son eventos con nombre propio —y no uno solo con un parámetro
 * "canal"— para que aparezcan en el informe de Eventos de GA4 sin tener que
 * registrar dimensiones personalizadas primero.
 *
 * `origen` distingue de qué parte del sitio salió el clic; `plan` solo viaja
 * cuando el clic nace de una tarjeta de precios.
 */
export const trackWhatsApp = ({ origen, plan }) =>
  trackEvent("click_whatsapp", plan ? { origen, plan } : { origen });

export const trackEmail = (origen) => trackEvent("click_email", { origen });

export const trackLinkedin = (origen) => trackEvent("click_linkedin", { origen });
