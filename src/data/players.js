import guido from "../../public/media/players/guido_mainero.webp";
import guido1 from "../../public/media/players/guido_mainero1.webp";
import gonzalo from "../../public/media/players/gonzalo_piovi.jpeg";
import gonzalo1 from "../../public/media/players/gonzalo_piovi1.webp";
import ronaldo from "../../public/media/players/ronaldo_martinez.webp";
import miguelRondeli from "../assets/masJugadores/miguel_rondelli.webp";
import andresZanini from "../assets/masJugadores/andres_zanini.webp";
import ezequielPiovi from "../assets/masJugadores/ezequiel_piovi.webp";
import facundoCallejo from "../assets/masJugadores/facundo_callejo.webp";
import hectorFertoli from "../assets/masJugadores/hector_fertoli.webp";
import ivanColman from "../assets/masJugadores/ivan_colman.webp";
import jpRuizGomez from "../assets/masJugadores/jp_ruizgomez.webp";
import julianAquino from "../assets/masJugadores/julian_aquino.webp";
import lisandroAlzugaray from "../assets/masJugadores/lisandro_alzugaray.webp";
import luisRamos from "../assets/masJugadores/luis_ramos.webp";
import matiasDiBenedetto from "../assets/masJugadores/matias_dibenedetto.webp";
import nicolasSilva from "../assets/masJugadores/nicolas_silva.webp";
import cainFara from "../assets/masJugadores/cain_fara.webp";
import polacoFydriszewski from "../assets/masJugadores/polaco_fydriszewski.webp";


export const players = [
  {
    slug: "guido_mainero", 
    tier: "featured",
    status: "live",          // "coming" = teaser, sin material aún
    year: "2026",
    url: "https://guidomainero.com",      
    player: {
      name: "Guido Mainero",
      position: "Delantero",
      club: "Platense",
      country: "Argentina",
      number: 7,   
    },
    cover: guido,  
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
      club: "Vélez Sarsfield",
      country: "Argentina",
      number: 77,
    },
    cover: ronaldo,
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
      number: null,
    },
    cover: miguelRondeli,   // captura desktop, apaisada
  },
  {
    slug: "andres_zanini",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://andres-zanini.netlify.app",
    player: {
      name: "Andrés Zanini",
      position: "Delantero",
      club: "Dep la Serena",
      country: "Argentina",
      number: 2,
    },
    cover: andresZanini,
  },
  {
    slug: "cain_fara",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://cain-fara.vercel.app",
    player: {
      name: "Cain Fara",
      position: "Defensor",
      club: "Universitario",
      country: "Argentina",
      number: 2,
    },
    cover: cainFara,
  },
  {
    slug: "ezequiel_piovi",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://ezequiel-piovi.netlify.app",
    player: {
      name: "Ezequiel Piovi",
      position: "Centrocampista",
      club: "Estudiantes LP",
      country: "Argentina",
      number: 21,
    },
    cover: ezequielPiovi,
  },
  {
    slug: "polaco_fydriszewski",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://polaco-fydriszewski.netlify.app",
    player: {
      name: "Polaco Fydriszewski",
      position: "Delantero",
      club: "Juniors Barranquilla",
      country: "Argentina",
      number: 19,
    },
    cover: polacoFydriszewski,
  },
  {
    slug: "matias_dibenedetto",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://matias-dibenedetto.netlify.app",
    player: {
      name: "Matias Dibenedetto",
      position: "Delantero",
      club: "Universitario",
      country: "Argentina",
      number: 5,
    },
    cover: matiasDiBenedetto,
  },
  {
    slug: "facundo_callejo",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://facundo-callejo.netlify.app",
    player: {
      name: "Facundo Callejo",
      position: "Delantero",
      club: "Cusco FC",
      country: "Argentina",
      number: 9,
    },  
    cover: facundoCallejo,
  },
  {
    slug: "luis_ramos",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://luis-ramos.netlify.app",
    player: {
      name: "Luis Ramos",
      position: "Delantero",
      club: "Alianza Lima",
      country: "Peru",
      number: 11,
    },
    cover: luisRamos,
  },
  {
    slug: "hector_fertoli",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://hector-fertoli.netlify.app",
    player: {
      name: "Hector Fertoli",
      position: "Mediocampista",
      club: "Universitario",
      country: "Argentina",
      number: 8,
    },
    cover: hectorFertoli,
  },
  {
    slug: "ivan_colman",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://ivan-colman.netlify.app",
    player: {
      name: "Ivan Colman",
      position: "Centrocampista",
      club: "Cusco FC",
      country: "Argentina",
      number: 10,
    },
    cover: ivanColman,
  },
  {
    slug: "lisandro_alzugaray",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://lisandro-alzugaray.netlify.app",
    player: {
      name: "Lisandro Alzugaray",
      position: "Delantero",
      club: "Universitario",
      country: "Argentina",
      number: 30,
    },
    cover: lisandroAlzugaray,
  },
  {
    slug: "jp_ruizgomez",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://jp-ruizgomez.netlify.app",
    player: {
      name: "JP Ruiz Gomez",
      position: "Delantero",
      club: "FBC Melgar",
      country: "Argentina",
      number: 9,
    },
    cover: jpRuizGomez,
  },
  {
    slug: "nicolas_silva",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://nicolas-silva.netlify.app",
    player: {
      name: "Nicolas Silva",
      position: "Defensor",
      club: "Universitario",
      country: "Argentina",
      number: 4,
    },
    cover: nicolasSilva,
  },
  {
    slug: "julian_aquino",
    tier: "more",
    status: "live",
    year: "2026",
    url: "https://julian-aquino.netlify.app",
    player: {
      name: "Julian Aquino",
      position: "Delantero",
      club: "Universitario",
      country: "Argentina",
      number: 7,
    },
    cover: julianAquino,
  }
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
