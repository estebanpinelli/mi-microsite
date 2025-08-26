import React from "react";
import Carousel from "../components/Carousel";
import Destinos from "../components/Destinos";
import Footer from "../components/Footer";
import QuienesS from "../components/QuienesS";
import { Link } from "react-router-dom";   // 👈 Import necesario

const Home = () => {
  return (
    <>
      {/* Carrusel que incluye el video y las imágenes */}
      <Carousel />

      {/* 🔥 Botón destacado Mundial 2026 */}
      <div className="flex justify-center mt-8">
        <Link
          to="/mundial"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 py-4 rounded-2xl shadow-xl transition-transform transform hover:scale-105"
        >
          ⚽ Paquetes Mundial 2026
        </Link>
      </div>
     
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