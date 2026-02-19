import PageWrapper from "../layouts/PageWrapper";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import ProfessionalProfile from "../components/ProfessionalProfile";
import Habilidades from "../components/Habilidades";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <PageWrapper>
      <Hero />
      <ProfessionalProfile/>        
      <Habilidades />
      <Portfolio />
      <Contacto />
      <Footer />
    </PageWrapper>
  );
};

export default Home;
