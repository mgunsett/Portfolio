import PageWrapper from "../layouts/PageWrapper";
import SeoHead from "../components/SeoHead";
import Hero from "../components/Hero";
import LandingPreview from "../components/LandingPreview";
import PlayersShowcase from "../components/PlayersShowcase";
import Partners from "../components/Partners";
import ServiceOffer from "../components/ServiceOffer";
import MoreProjects from "../components/MoreProjects";
import Plans from "../components/Plans";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import { BRAND, displayName } from "../config/brand";

/**
 * Sportfolio: la línea de servicio de landings para futbolistas.
 *
 * Es una página del portfolio, pero se entra y se recorre como si fuera un
 * sitio propio. Orden pensado para convertir: primero qué es el producto,
 * después la prueba (los casos destacados), la credibilidad prestada del
 * partner y recién ahí el proceso. "Más proyectos" suma el volumen de trabajo
 * entregado —el argumento de que esto no es un caso aislado— y los planes van
 * últimos, pegados al contacto: cuando el visitante llega ahí ya no le queda
 * nada por entender, solo elegir alcance.
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
      <MoreProjects number="04" />
      <Plans number="05" />
      <Contacto variant="sportfolio" number="06" />
      <Footer />
    </PageWrapper>
  );
};

export default Sportfolio;
