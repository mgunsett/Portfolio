/**
 * Casos de landing pages para futbolistas profesionales.
 *
 * Esta es la sección protagonista del sitio. Para publicar un caso nuevo basta
 * con agregar un objeto acá: no hay que tocar ningún componente.
 *
 * Convención de assets: todo el material va en `public/media/players/<slug>/`
 * y se referencia por ruta absoluta ("/media/players/<slug>/cover.webp").
 * No se importa desde `src/assets` para no inflar el bundle con videos.
 *
 * Formato de un caso:
 *
 *   {
 *     slug:    "nombre-apellido",          // identificador único, sin espacios
 *     status:  "live" | "coming",          // "coming" = teaser, sin material aún
 *     year:    "2026",
 *     url:     "https://...",              // landing en vivo (null si no está)
 *     player: {
 *       name:     "Nombre Apellido",
 *       position: "Delantero",
 *       club:     "Club Atlético ...",
 *       country:  "Argentina",
 *       number:   10,                      // opcional
 *     },
 *     cover:   "/media/players/<slug>/cover.webp",   // 4:5 o 3:4, ~1200px
 *     media: [
 *       { type: "video", src: "...reel.mp4", poster: "...reel.webp", orientation: "portrait" },
 *       { type: "image", src: "...desktop-01.webp", orientation: "landscape", alt: "..." },
 *     ],
 *     metrics: [                           // máximo 3, siempre con período explícito
 *       { value: "+120K", label: "Visitas en 30 días" },
 *     ],
 *     highlights: ["Ficha de carrera interactiva", "Multi-idioma ES/EN"],
 *     testimonial: { quote: "...", author: "...", role: "..." } | null,
 *     tech: ["React", "Framer Motion"],
 *   }
 *
 * Regla de contenido: un caso sin métricas convierte mucho menos. Si todavía no
 * hay números confirmados, dejarlo en status "coming" hasta tenerlos.
 */
import guido from "../../public/media/players/guido_mainero.webp";
import guido1 from "../../public/media/players/guido_mainero1.webp";
import gonzalo from "../../public/media/players/gonzalo_piovi.jpeg";
import gonzalo1 from "../../public/media/players/gonzalo_piovi1.webp";
import ronaldo from "../../public/media/players/ronaldo_martinez.webp";
import ronaldo1 from "../../public/media/players/ronaldo_martinez1.png";


export const players = [
  {
    slug: "guido_mainero",          // identificador único, sin espacios
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
    cover: guido,   // 4:5 o 3:4, ~1200px
    media: [
      { type: "video", src: "...reel.mp4", poster: "...reel.webp", orientation: "portrait" },
      { type: "image", src: guido1, orientation: "landscape", alt: "web guido mainero" },
    ],
    metrics: [                           // máximo 3, siempre con período explícito
      { value: "+120K", label: "Visitas en 30 días" },
    ],
    highlights: ["Ficha de carrera interactiva", "Multi-idioma ES/EN"],
    testimonial: { quote: "...", author: "...", role: "..." } | null,
    tech: ["React", "Framer Motion"],
  },
  {
    slug: "gonzalo_piovi",          // identificador único, sin espacios
    status: "live",          // "coming" = teaser, sin material aún
    year: "2026",
    url: "https://gonzalopiovi.com",              // landing en vivo (null si no está)
    player: {
      name: "Gonzalo Piovi",
      position: "Defensor",
      club: "Cruz Azul",
      country: "Argentina",
      number: 33,                      // opcional
    },
    cover: gonzalo1,   // 4:5 o 3:4, ~1200px
    media: [
      { type: "video", src: "...reel.mp4", poster: "...reel.webp", orientation: "portrait" },
      { type: "image", src: gonzalo, orientation: "landscape", alt: "web gonzalo piovi" },
    ],
    metrics: [                           // máximo 3, siempre con período explícito
      { value: "+120K", label: "Visitas en 30 días" },
    ],
    highlights: ["Ficha de carrera interactiva", "Multi-idioma ES/EN"],
    testimonial: { quote: "...", author: "...", role: "..." } | null,
    tech: ["React", "Framer Motion"],
  },
  {
    slug: "ronaldo_martinez",          // identificador único, sin espacios
    status: "live",          // "coming" = teaser, sin material aún
    year: "2026",
    url: "https://ronaldomartinez.com",              // landing en vivo (null si no está)
    player: {
      name: "Rony Martinez",
      position: "Delantero",
      club: "Talleres",
      country: "Argentina",
      number: 9,                      // opcional
    },
    cover: ronaldo,   // 4:5 o 3:4, ~1200px
    media: [
      { type: "video", src: "...reel.mp4", poster: "...reel.webp", orientation: "portrait" },
      { type: "image", src: ronaldo1, orientation: "landscape", alt: "web ronaldo martinez" },
    ],
    metrics: [                           // máximo 3, siempre con período explícito
      { value: "+120K", label: "Visitas en 30 días" },
    ],
    highlights: ["Ficha de carrera interactiva", "Multi-idioma ES/EN"],
    testimonial: { quote: "...", author: "...", role: "..." } | null,
    tech: ["React", "Framer Motion"],
  },
];

/** Casos publicables, en el orden en que deben mostrarse. */
export const livePlayers = players.filter((p) => p.status === "live");

/** true cuando todavía no hay ningún caso cargado (estado inicial del sitio). */
export const hasPlayers = players.length > 0;

/**
 * Resumen agregado para el strip del Hero. Suma solo casos "live" para no
 * prometer material que aún no está publicado.
 */
export const playersSummary = {
  count: livePlayers.length,
  names: livePlayers.map((p) => p.player.name),
  clubs: [...new Set(livePlayers.map((p) => p.player.club).filter(Boolean))],
};
