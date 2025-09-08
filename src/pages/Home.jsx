import React from "react";
import Carousel from "../components/Carousel";
import Destinos from "../components/Destinos";
import Footer from "../components/Footer";
import QuienesS from "../components/QuienesS";
import MundialBanner from "../components/MundialBanner"; // 👈 Import del nuevo banner

const Home = () => {
  return (
    <>
      {/* Carrusel que incluye el video y las imágenes */}
      <Carousel />

      {/* 🔥 Banner destacado Mundial 2026 */}
      <MundialBanner />

      {/* Sección de destinos */}
      <div className="destinos-container">
        <Destinos />
      </div>

      <div>
        <QuienesS />
        {/* Más secciones o componentes si lo deseas */}
      </div>

      <Footer />
    </>
  );
};

export default Home;