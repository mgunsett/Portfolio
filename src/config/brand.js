/**
 * Fuente única de verdad de la identidad de marca.
 *
 * Estrategia: marca híbrida. "Matías Gunsett" es la marca principal (la que ya
 * figura en el footer de las landings publicadas y acumula reconocimiento).
 * `service` reserva el lugar para el nombre de la línea de servicio deportiva:
 * cuando se defina, se completa acá y aparece en todo el sitio sin tocar
 * ningún componente.
 */
export const BRAND = {
  person: "Matías Gunsett",

  // ← Nombre de la sub-marca. Ej: "Player Page", "Dorsal", "Ficha 10".
  // Mientras sea null, el sitio se presenta solo con el nombre personal.
  service: null,

  role: "Landing Pages para Futbolistas Profesionales",
  roleSecondary: "Front-End Developer · React.js",

  claim:
    "Sitios web para jugadores profesionales: presencia digital propia, " +
    "pensada para representar, difundir y abrir puertas.",

  email: "matiasgunsett@gmail.com",

  whatsapp: {
    number: "5493425957222",
    display: "+54 342 595-7222",
    presetMessage:
      "Hola Matías, vi tu portfolio y quiero consultarte por una landing page.",
  },

  social: {
    instagram: "https://www.instagram.com/mgunsett/",
    threads: "https://www.threads.com/@mgunsett",
    github: "https://github.com/mgunsett",
    linkedin: "https://linkedin.com/in/matiasgunsett",
  },

  partner: {
    name: "LED Sports",
    role: "Agencia de Marketing Deportivo",
    url: "https://ledsportsmarketing.com/",
    logo: null, // ruta en /public cuando esté disponible el logo autorizado
  },

  siteUrl: "https://matiasgunsett.com",

  /**
   * Métricas del perfil profesional. Se editan acá, no en el componente.
   * `value` es texto libre a propósito: admite "3+", "+50K", "12".
   */
  stats: [
    { value: "3+", label: "Años de experiencia" },
    { value: "10+", label: "Proyectos entregados" },
    { value: "11+", label: "Clientes" },
  ],
};

/** Nombre a mostrar: incluye la sub-marca solo si está definida. */
export const displayName = () =>
  BRAND.service ? `${BRAND.service} · ${BRAND.person}` : BRAND.person;

/** Link de WhatsApp con el mensaje ya cargado en el chat. */
export const whatsappLink = (message = BRAND.whatsapp.presetMessage) =>
  `https://wa.me/${BRAND.whatsapp.number}?text=${encodeURIComponent(message)}`;

/** Link de mail con asunto y cuerpo pre-armados. */
export const mailtoLink = (
  subject = "Consulta desde tu Portfolio",
  body = "Hola Matías,\n\nTe contacto porque vi tu portfolio y me gustaría conversar sobre...",
) =>
  `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
