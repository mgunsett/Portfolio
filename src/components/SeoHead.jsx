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

/**
 * Meta tags, Open Graph y datos estructurados, derivados de `brand.js`.
 *
 * Sin dependencias extra: escribe directo en el head. Cuando se defina la
 * sub-marca en BRAND.service, el título y el JSON-LD la toman solos.
 */
const SeoHead = () => {
  useEffect(() => {
    const title = `${displayName()} | ${BRAND.role}`;
    const description = BRAND.claim;
    const ogImage = `${BRAND.siteUrl}/og-image.jpg`;

    document.title = title;

    setMeta("name", "description", description);
    setMeta("name", "theme-color", "#0B0B0B");

    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", displayName());
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", BRAND.siteUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:locale", "es_AR");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Canonical
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", BRAND.siteUrl);

    // Datos estructurados: la persona y el servicio que ofrece.
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          name: BRAND.person,
          url: BRAND.siteUrl,
          jobTitle: BRAND.role,
          email: `mailto:${BRAND.email}`,
          sameAs: Object.values(BRAND.social).filter(Boolean),
        },
        {
          "@type": "ProfessionalService",
          name: displayName(),
          description: BRAND.claim,
          url: BRAND.siteUrl,
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
  }, []);

  return null;
};

export default SeoHead;
