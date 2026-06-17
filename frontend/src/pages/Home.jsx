import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Hero />
        <FeaturesSection />
        <Footer />
      </div>
    </>
  );
}

export default Home;