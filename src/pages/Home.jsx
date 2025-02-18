import React from "react";
import Carousel from "../components/Carousel";
import Destinos from "../components/Destinos";
import WhatsAppButton from "../components/BotonWhats";
import Footer from "../components/Footer";  // Importa el Footer
import QuienesS from "../components/QuienesS";

const Home = () => {
  return (
    <>
      {/* Carrusel que incluye el video y las imágenes */}
      <Carousel />
      <div 
          style={{
            position: "absolute",
            bottom: "50px",  // Ajusta la distancia desde el fondo
            right: "50px",   // Ajusta la distancia desde la derecha
            zIndex: 10       // Asegura que esté por encima del carrusel
          }}
        >
          <WhatsAppButton />
        </div>
        <div>
      {/* Aquí puedes colocar el resto de tu contenido */}
      <QuienesS />
      {/* Más secciones o componentes si lo deseas */}
    </div>
      {/* Sección de destinos */}
      <div className="destinos-container">
        <Destinos />
      </div>
      <Footer />
    </>
  );
};

export default Home;