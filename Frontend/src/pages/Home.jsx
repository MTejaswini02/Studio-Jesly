import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import PortfolioPreview from "../components/PortfolioPreview/PortfolioPreview";
import WhyUs from "../components/WhyUs/WhyUs";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <PortfolioPreview />
      <WhyUs />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;