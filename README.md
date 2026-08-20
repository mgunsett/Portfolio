# Portfolio — Matías Gunsett

Sitio personal enfocado en **landing pages para futbolistas profesionales**, con el
trabajo de desarrollo general como respaldo técnico.

React 19 + Vite + Chakra UI + Framer Motion.

```bash
npm install
npm run dev      # desarrollo
npm run lint     # eslint
npm run build    # producción → dist/
```

---

## Cómo agregar un caso de jugador

Todo el contenido de la sección principal sale de `src/data/players.js`.
**No hay que tocar ningún componente**: se agrega un objeto al array y la card,
el modal y el strip del Hero se arman solos.

### 1. Subir el material

Todo va en `public/media/players/<slug>/` y se referencia por ruta absoluta:

```
public/media/players/juan-perez/
├── cover.webp          # 4:5, ~1200px de ancho
├── reel.mp4            # vertical 9:16, 8–12s, ≤2 MB
├── reel.webp           # poster del video (obligatorio)
└── desktop-01.webp     # capturas
```

> Va en `public/`, no en `src/assets/`: así Vite no lo procesa y los videos no
> entran al bundle de JavaScript.

### 2. Agregar el objeto

```js
{
  slug: "juan-perez",
  status: "live",                    // "coming" mientras falte material
  year: "2026",
  url: "https://...",                // landing en vivo, o null
  player: {
    name: "Juan Pérez",
    position: "Delantero",
    club: "Club Atlético Colón",
    country: "Argentina",
    number: 9,
  },
  cover: "/media/players/juan-perez/cover.webp",
  media: [
    { type: "video", src: "/media/players/juan-perez/reel.mp4",
      poster: "/media/players/juan-perez/reel.webp", orientation: "portrait" },
    { type: "image", src: "/media/players/juan-perez/desktop-01.webp",
      orientation: "landscape", alt: "Home de la landing" },
  ],
  metrics: [
    { value: "+120K", label: "Visitas en 30 días" },
  ],
  highlights: ["Ficha de carrera interactiva", "Multi-idioma ES/EN"],
  testimonial: { quote: "...", author: "Juan Pérez", role: "Delantero" },
  tech: ["React", "Framer Motion", "Vite"],
}
```

### Reglas de contenido

- **Sin métricas no se publica.** Un caso sin números convierte mucho menos:
  dejarlo en `status: "coming"` hasta tenerlos.
- Las métricas llevan **período explícito**: "+120K visitas en 30 días", no
  "muchas visitas".
- Videos: MP4 H.264, loop corto, **siempre con `poster`**. Se cargan con
  `preload="none"` y arrancan recién al entrar en pantalla.
- Sin `cover` la card muestra las iniciales del jugador: no se rompe el layout,
  pero conviene cargar la imagen.

---

## Identidad de marca

`src/config/brand.js` es la fuente única: nombre, contacto, redes, partner y
métricas del perfil. El campo `service` reserva el lugar para el nombre de la
línea de servicio deportiva — al completarlo, aparece en el título, el footer,
el copyright y los metadatos de Open Graph sin tocar nada más.

## Medición

El footer de cada landing de jugador debe enlazar acá con UTM, para poder medir
cuánto tráfico genera ese canal:

```
https://matiasgunsett.com/?utm_source=<slug-jugador>&utm_medium=footer&utm_campaign=player-landing
```

## Estructura

| Sección | Componente | Ancla |
|---|---|---|
| Hero | `Hero.jsx` | `#home` |
| 01 · Casos | `PlayersShowcase.jsx` | `#casos` |
| 02 · Servicio | `ServiceOffer.jsx` | `#servicio` |
| Partner | `Partners.jsx` | — |
| 03 · Perfil | `ProfessionalProfile.jsx` | `#perfil` |
| 04 · Stack | `Habilidades.jsx` | `#habilidades` |
| 05 · Otros trabajos | `Portfolio.jsx` | `#proyectos` |
| 06 · Contacto | `Contacto.jsx` | `#contacto` |
