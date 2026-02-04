import PageWrapper from "../layouts/PageWrapper";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";

const Home = () => {
  return (
    <PageWrapper>
      <Hero />
      <Portfolio />
    </PageWrapper>
  );
};

export default Home;
