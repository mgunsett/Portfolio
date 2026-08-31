import PageWrapper from "../layouts/PageWrapper";
import SeoHead from "../components/SeoHead";
import HeroPortfolio from "../components/HeroPortfolio";
import ProfessionalProfile from "../components/ProfessionalProfile";
import Habilidades from "../components/Habilidades";
import Portfolio from "../components/Portfolio";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
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
    <PageWrapper>
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
