import PageWrapper from "../layouts/PageWrapper";
import SeoHead from "../components/SeoHead";
import Hero from "../components/Hero";
import LandingPreview from "../components/LandingPreview";
import PlayersShowcase from "../components/PlayersShowcase";
import Partners from "../components/Partners";
import ServiceOffer from "../components/ServiceOffer";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import { BRAND, displayName } from "../config/brand";

/**
 * Sportfolio: la línea de servicio de landings para futbolistas.
 *
 * Es una página del portfolio, pero se entra y se recorre como si fuera un
 * sitio propio. Orden pensado para convertir: primero qué es el producto,
 * después la prueba (casos de jugadores), la credibilidad prestada del partner
 * y recién ahí la oferta, con el contacto como cierre.
 */
const Sportfolio = () => {
  return (
    <PageWrapper>
      <SeoHead
        title={`${BRAND.role} | ${displayName()}`}
        description={BRAND.claim}
        path="/sportfolio"
      />
      <Hero />
      <LandingPreview />
      <PlayersShowcase />
      <Partners />
      <ServiceOffer />
      <Contacto variant="sportfolio" number="04" />
      <Footer />
    </PageWrapper>
  );
};

export default Sportfolio;
