import PageWrapper from "../layouts/PageWrapper";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import ProfessionalProfile from "../components/ProfessionalProfile";
import Habilidades from "../components/Habilidades";
import Contacto from "../components/Contacto";

const Home = () => {
  return (
    <PageWrapper>
      <Hero />
      <ProfessionalProfile/>        
      <Habilidades />
      <Portfolio />
      <Contacto />
    </PageWrapper>
  );
};

export default Home;
