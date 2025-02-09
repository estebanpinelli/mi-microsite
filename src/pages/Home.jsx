import React from "react";
import Destinos from "../components/Destinos";

const Home = () => {
  return (
    <>
      {/* Sección del video y contenido superpuesto */}
      <div className="home-video">
        <video autoPlay loop muted className="video-background">
          <source src="/video.mp4" type="video/mp4" />
          Tu navegador no soporta videos.
        </video>
        <div className="content">
          <h1>Bienvenido a Lomas Turismo</h1>
          <p>Descubrí destinos increíbles</p>
        </div>
      </div>

      {/* Sección de destinos (tarjetas) que aparece debajo del video */}
      <div className="destinos-container">
        <Destinos />
      </div>
    </>
  );
};

export default Home;