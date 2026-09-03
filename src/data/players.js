import guido from "../../public/media/players/guido_mainero.webp";
import guido1 from "../../public/media/players/guido_mainero1.webp";
import gonzalo from "../../public/media/players/gonzalo_piovi.jpeg";
import gonzalo1 from "../../public/media/players/gonzalo_piovi1.webp";
import ronaldo from "../../public/media/players/ronaldo_martinez.webp";
import ronaldo1 from "../../public/media/players/ronaldo_martinez1.png";
import miguel from "../assets/masJugadores/miguel_rondelli.png";

/**
 * Todos los casos publicados, en un solo array.
 *
 * `tier` decide en qué sección aparece cada uno:
 *   - "featured" → los mockups de teléfono de "Destacados" (02).
 *   - "more"     → el carrusel de "Más proyectos" (04).
 *
 * Viven juntos a propósito: la forma del objeto es idéntica, el modal de
 * detalle es el mismo y `playersSummary` —el strip del Hero— cuenta sobre el
 * total. Mover un caso de una sección a la otra es cambiar una palabra, y dar
 * de alta un jugador se hace en un único lugar.
 *
 * `cover` es la captura que se ve en la card, y su formato depende del tier:
 * los destacados van dentro de un PhoneFrame y necesitan un screenshot mobile
 * vertical; los del carrusel se muestran apaisados, así que ahí va la captura
 * desktop.
 */
export const players = [
  {
    slug: "guido_mainero",          // identificador único, sin espacios
    tier: "featured",
    status: "live",          // "coming" = teaser, sin material aún
    year: "2026",
    url: "https://guidomainero.com",              // landing en vivo (null si no está)
    player: {
      name: "Guido Mainero",
      position: "Delantero",
      club: "Platense",
      country: "Argentina",
      number: 7,                      // opcional
    },
    cover: guido,   // captura mobile, vertical
    media: [
      { type: "image", src: guido1, orientation: "landscape", alt: "web guido mainero" },
    ],
    metrics: [                           // máximo 3, siempre con período explícito
      { value: "+120K", label: "Visitas en 30 días" },
    ],
    highlights: ["Ficha de carrera interactiva", "Multi-idioma ES/EN"],
    testimonial: null,
    tech: ["React", "Framer Motion"],
  },
  {
    slug: "gonzalo_piovi",
    tier: "featured",
    status: "live",
    year: "2026",
    url: "https://gonzalopiovi.com",
    player: {
      name: "Gonzalo Piovi",
      position: "Defensor",
      club: "Cruz Azul",
      country: "Argentina",
      number: 33,
    },
    cover: gonzalo1,
    media: [
      { type: "image", src: gonzalo, orientation: "landscape", alt: "web gonzalo piovi" },
    ],
    metrics: [
      { value: "+120K", label: "Visitas en 30 días" },
    ],
    highlights: ["Ficha de carrera interactiva", "Multi-idioma ES/EN"],
    testimonial: null,
    tech: ["React", "Framer Motion"],
  },
  {
    slug: "ronaldo_martinez",
    tier: "featured",
    status: "live",
    year: "2026",
    url: "https://ronaldomartinez.com",
    player: {
      name: "Rony Martinez",
      position: "Delantero",
      club: "Talleres",
      country: "Argentina",
      number: 9,
    },
    cover: ronaldo,
    media: [
      { type: "image", src: ronaldo1, orientation: "landscape", alt: "web ronaldo martinez" },
    ],
    metrics: [
      { value: "+30K", label: "Visitas en 30 días" },
      { value: "Resultados actualizados", label: "Seguimiento continuo" },
    ],
    highlights: ["Ficha de carrera interactiva", "Multi-idioma ES/EN"],
    testimonial: null,
    tech: ["React", "Framer Motion"],
  },
  {
    slug: "miguel_rondelli",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://miguel-rondelli.netlify.app",
    player: {
      name: "Miguel Rondelli",
      position: "Entrenador",
      club: "FBC Melgar",
      country: "Argentina",
      // Sin dorsal: es DT. El rol ya lo dice `position`, y el modal solo
      // imprime el "#" cuando hay número.
      number: null,
    },
    cover: miguel,   // captura desktop, apaisada
    media: [
      { type: "image", src: miguel, orientation: "landscape", alt: "web miguel rondelli" },
    ],
    metrics: [
      { value: "+30K", label: "Visitas en 30 días" },
      { value: "Resultados actualizados", label: "Seguimiento continuo" },
    ],
    highlights: ["Ficha de carrera interactiva", "Multi-idioma ES/EN"],
    testimonial: null,
    tech: ["React", "Framer Motion"],
  },
];

/** Casos publicables, en el orden en que deben mostrarse. */
export const livePlayers = players.filter((p) => p.status === "live");

/** Los que van en los mockups de teléfono de "Destacados". */
export const featuredPlayers = livePlayers.filter((p) => p.tier !== "more");

/** Los que van en el carrusel de "Más proyectos". */
export const morePlayers = livePlayers.filter((p) => p.tier === "more");

/** true cuando todavía no hay ningún caso cargado (estado inicial del sitio). */
export const hasPlayers = players.length > 0;

/**
 * Resumen agregado para el strip del Hero. Suma solo casos "live" para no
 * prometer material que aún no está publicado, pero cuenta los dos tiers: son
 * todos trabajos entregados.
 */
export const playersSummary = {
  count: livePlayers.length,
  names: livePlayers.map((p) => p.player.name),
  clubs: [...new Set(livePlayers.map((p) => p.player.club).filter(Boolean))],
};
