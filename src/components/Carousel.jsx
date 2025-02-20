import React from "react";
import Slider from "react-slick";

// Importa los estilos de slick-carousel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    infinite: true,       // Reproduce en loop
    speed: 800,           // Velocidad de transición (ms)
    slidesToShow: 1,      // Muestra 1 slide a la vez
    slidesToScroll: 1,    // Desplaza 1 slide a la vez
    autoplay: true,       // Reproducción automática
    autoplaySpeed: 5000,  // Intervalo de autoplay (ms)
  };

  return (
    // Eliminamos el maxWidth para que ocupe el 100% del ancho
    <div style={{ width: "100%" }}>
      <Slider {...settings}>
        {/* Slide 1: Video */}
        <div>
          <video 
            autoPlay 
            loop
            playsInline 
            muted 
            style={{
              width: "100%", 
              height: "100vh",    // Ocupa toda la altura del viewport
              objectFit: "cover"  // Se asegura de cubrir sin distorsión
            }}
          >
            <source src="/video1.mp4" type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </div>
        {/* Slide 2: Imagen 1 */}
        <div>
          <img 
            src="/barco.jpg"
            alt="Imagen 1" 
            style={{
              width: "100%", 
              height: "100vh", 
              objectFit: "cover"
            }} 
          />
        </div>
        {/* Slide 3: Imagen 2 */}
        <div>
          <img 
            src="/desierto.jpg" 
            alt="Imagen 2" 
            style={{
              width: "100%", 
              height: "100vh", 
              objectFit: "cover"
            }} 
          />
        </div>
        {/* Slide 4: Imagen 3 */}
        <div>
          <img 
            src="/japon.jpg" 
            alt="Imagen 3" 
            style={{
              width: "100%", 
              height: "100vh", 
              objectFit: "cover"
            }} 
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;