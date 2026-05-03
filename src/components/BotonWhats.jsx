import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  // El número debe ir como string y SIN el símbolo "+" para la URL de wa.me
  const phoneNumber = "5491166194844"; 
  const message = "Hola, me gustaría más información.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        // Propiedades para hacerlo flotante
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        
        // Estilo visual
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#25d366",
        color: "white",
        width: "60px",
        height: "60px",
        borderRadius: "50%", // Lo hace circular
        boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
        textDecoration: "none",
        transition: "transform 0.3s ease"
      }}
      // Efecto simple de hover al pasar el mouse
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <FaWhatsapp size={35} />
    </a>
  );
};

export default WhatsAppButton;