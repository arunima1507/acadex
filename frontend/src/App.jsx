import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div>

      <Navbar />

      <div className="container">

        <Hero />

        <FeaturesSection />

        <Footer />

      </div>

    </div>
  );
}

export default App;