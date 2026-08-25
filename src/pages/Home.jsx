import PageWrapper from "../layouts/PageWrapper";
import SeoHead from "../components/SeoHead";
import Hero from "../components/Hero";
import LandingPreview from "../components/LandingPreview";
import PlayersShowcase from "../components/PlayersShowcase";
import ServiceOffer from "../components/ServiceOffer";
import Partners from "../components/Partners";
import ProfessionalProfile from "../components/ProfessionalProfile";
import Habilidades from "../components/Habilidades";
import Portfolio from "../components/Portfolio";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";

/**
 * Orden pensado para convertir: primero la prueba (casos de jugadores),
 * después la oferta, después la credibilidad prestada del partner, y recién
 * ahí quién es Matías. El trabajo de desarrollo general queda como respaldo
 * técnico antes del contacto.
 */
const Home = () => {
  return (
    <PageWrapper>
      <SeoHead />
      <Hero />
      <LandingPreview />
      <PlayersShowcase />
      <Partners />
      <ServiceOffer />
      <ProfessionalProfile />
      <Habilidades />
      <Portfolio />
      <Contacto />
      <Footer />
    </PageWrapper>
  );
};

export default Home;
