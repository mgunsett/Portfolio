import PageWrapper from "../layouts/PageWrapper";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import ProfessionalProfile from "../components/ProfessionalProfile";
import Habilidades from "../components/Habilidades";

const Home = () => {
  return (
    <PageWrapper>
      <Hero />
      <ProfessionalProfile/>        
      <Habilidades />
      <Portfolio />
    </PageWrapper>
  );
};

export default Home;
