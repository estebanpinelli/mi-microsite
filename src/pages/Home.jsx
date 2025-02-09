import React from "react";
import Carousel from "../components/Carousel";
import Destinos from "../components/Destinos";

const Home = () => {
  return (
    <>
      {/* Carrusel que incluye el video y las imágenes */}
      <Carousel />
      
      {/* Sección de destinos */}
      <div className="destinos-container">
        <Destinos />
      </div>
    </>
  );
};

export default Home;