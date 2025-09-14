import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaWhatsapp } from "react-icons/fa";

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* Overlay fijo encima del carrusel */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
          zIndex: 2,
          textShadow: "2px 2px 10px rgba(0,0,0,0.7)"
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          ¿Estás preparado para nuevas experiencias?
        </h1>
      
        <a
          href="https://wa.me/+5491152615566"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#ff6600",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none"
          }}
        >
          Hablemos!
         <FaWhatsapp style={{ fontSize: "1.5em" }} />
        </a>
      </div>

      {/* Carrusel de fondo */}
      <Slider {...settings}>
        <div>
          <video
            autoPlay
            loop
            playsInline
            muted
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          >
            <source src="https://res.cloudinary.com/dtcjnhb0v/video/upload/v1757843580/HOme_ro2ukk.mp4" type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dtcjnhb0v/image/upload/v1757341209/hanson-lu-Q36BvLGdOAg-unsplash_cgjqo3.jpg"
            alt="Imagen 1"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="/desierto.jpg"
            alt="Imagen 2"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="/japon.jpg"
            alt="Imagen 3"
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
