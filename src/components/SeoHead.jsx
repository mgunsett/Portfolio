import { useEffect } from "react";
import { BRAND, displayName } from "../config/brand";

/** Crea o actualiza un <meta> por name o property. */
const setMeta = (attr, key, content) => {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

/** Crea o actualiza un <link> por rel. */
const setLink = (rel, href) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

/**
 * Meta tags, Open Graph y datos estructurados de la página activa.
 *
 * Cada página pasa su título, descripción y ruta; el resto sale de `brand.js`.
 * Sin dependencias extra: escribe directo en el head y se vuelve a ejecutar en
 * cada cambio de ruta, porque las páginas se montan y desmontan.
 */
const SeoHead = ({
  title,
  description = BRAND.claim,
  path = "/",
  image = "/og-image.jpg",
}) => {
  useEffect(() => {
    const fullTitle = title ?? `${displayName()} | ${BRAND.role}`;
    const url = `${BRAND.siteUrl}${path === "/" ? "" : path}`;
    const ogImage = `${BRAND.siteUrl}${image}`;

    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("name", "theme-color", "#0B0B0B");

    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", displayName());
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:locale", "es_AR");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    setLink("canonical", url);

    // Datos estructurados: la persona y el servicio que ofrece.
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          name: BRAND.person,
          url: BRAND.siteUrl,
          jobTitle: BRAND.roleSecondary,
          email: `mailto:${BRAND.email}`,
          sameAs: Object.values(BRAND.social).filter(Boolean),
        },
        {
          "@type": "ProfessionalService",
          name: displayName(),
          description,
          url,
          areaServed: "Argentina",
          serviceType: BRAND.role,
          provider: { "@type": "Person", name: BRAND.person },
        },
      ],
    };

    let script = document.head.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [title, description, path, image]);

  return null;
};

export default SeoHead;
