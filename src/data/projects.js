import ledsports from "../assets/proyects/ledsports.webp";
import vilanova from "../assets/proyects/vilanova.webp";
import bereal from "../assets/proyects/bereal.webp";
import alpinaHome from "../assets/proyects/alpimaHome.webp";
import balenza from "../assets/proyects/balenza.webp";
import gonzaloPiovi from "../assets/proyects/gonzaloPiovi.webp";

/**
 * Trabajos de la sección "Otros trabajos" (03).
 *
 * `category` es la bajada de dos o tres palabras que se lee en la card de la
 * grilla —lo que el proyecto ES, de un vistazo—. `title` sigue siendo la
 * descripción media y `description` la larga: ninguna de las dos entra en la
 * card, pero el modal y el SEO las siguen usando.
 *
 * `cover` es la captura desktop del sitio. La card la recorta a 16:10 anclada
 * arriba, así que lo que tiene que quedar bien es el hero de la landing.
 */
export const projects = [
  {
    name: "LedSports",
    category: "Marketing Deportivo",
    title: "Agencia de Marketing Deportivo" ,
    year: "2025",
    description:
       `Sitio corporativo de servicios, ficha de jugadores personalizada, 
        estrategias de patrocinio orientadas a marcas y entidades deportivas.`,
    tech: ["React", "Firebase", "Chakra UI", "Framer Motion", "Vite", "React Router"],
    cover: ledsports,
    url: "https://ledsportsmarketing.com/"
  },
  {
    name: "Gonzalo Piovi",
    category: "Sportfolio Profesional",
    title: "Portfolio Profesional de Gonzalo Piovi",
    year: "2026",
    description:
      "Portfolio personal que muestra proyectos, habilidades y experiencia profesional en el ámbito deportivo.",
    tech: ["React", "Chakra UI", "Framer Motion", "Vite", "React Router"],
    cover: gonzaloPiovi,
    url: "https://gonzalopiovi.com/"
  },
  {
    name: "Vilanova Sf",
    category: "Tienda Online",
    title: "Tienda Online Indumentaria Surfwear",
    year: "2025",
    description:
      "Base de datos de productos, catálogo, carrito, autenticación, pasarela de pago y panel de administración para gestión de inventario y pedidos.",
    tech: ["React", "Framer Motion", "Vite", "Chakra UI", "Firebase", "Mercado Pago", "React Router", "Claude AI"],
    cover: vilanova,
    url: "https://vilanovasf.netlify.app/"
  },
  {
    name: "Be Real Clothes",
    category: "Tienda Online",
    title: "Tienda Online Indumentaria Urbana",
    year: "2024",
    description:
      "E-commerce con base de datos de productos, catálogo, carrito, autenticación y pasarela de pago.",
    tech: ["React", "Framer Motion", "Vite", "Chakra UI", "Firebase", "Mercado Pago"],
    cover: bereal,
    url: "https://berealclothes.com/"
  },
  {
    // TODO: `year` y `tech` quedaron estimados. El año se ve en la card.
    name: "Balenza Studio",
    category: "Tienda Online",
    title: "Tienda Online Indumentaria Femenina",
    year: "2025",
    description:
      "E-commerce de indumentaria con catálogo por categorías, carrito, cuenta de usuario, envíos a todo el país y descuento por transferencia o efectivo.",
    tech: ["React"],
    cover: balenza,
    url: "https://balenzastudio.netlify.app/"
  },
   {
    name: "Alphina Home",
    category: "Sitio Inmobiliario",
    title: "Sitio Inmobiliaria de Lujo",
    year: "2024",
    description:
      "DEMO Web servicios inmobiliarios con enfoque directo a la visualización de las propiedades en entornos naturales.",
    tech: ["HTML", "Framer Motion", "CSS", "Bootstrap", "Sass", "JavaScript"],
    cover: alpinaHome,
    url: "https://mgunsett.github.io/proyecto-alpina-home/"
  },
];
