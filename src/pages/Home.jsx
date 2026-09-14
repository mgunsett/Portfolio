import PageWrapper from "../layouts/PageWrapper";
import SeoHead from "../components/layout/SeoHead";
import HeroPortfolio from "../components/home/HeroPortfolio";
import ProfessionalProfile from "../components/home/ProfessionalProfile";
import Habilidades from "../components/home/Habilidades";
import Portfolio from "../components/home/Portfolio";
import Contacto from "../components/comunes/Contacto";
import Footer from "../components/comunes/Footer";
import { BRAND, displayName } from "../config/brand";

/**
 * Página principal: el portfolio personal de Matías como Front-End Developer.
 *
 * Recorrido: quién es, con qué trabaja, qué entregó y cómo contactarlo. La
 * línea de servicio deportiva no vive acá — se nombra como especialidad y se
 * explora entera en /sportfolio, a la que se llega desde el botón del Navbar.
 */
const Home = () => {
  return (
    <PageWrapper h1="Matías Gunsett — Desarrollador Front-End React: landing pages y aplicaciones web a medida">
      <SeoHead
        title={`${displayName()} | ${BRAND.roleSecondary}`}
        description={BRAND.claimDev}
        path="/"
      />
      <HeroPortfolio />
      <ProfessionalProfile number="01" />
      <Habilidades number="02" />
      <Portfolio number="03" />
      <Contacto variant="portfolio" number="04" />
      <Footer />
    </PageWrapper>
  );
};

export default Home;
