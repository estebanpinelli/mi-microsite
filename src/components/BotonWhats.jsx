import React from "react";
import { FaWhatsapp } from "react-icons/fa";


const WhatsAppButton = () => {
  // Reemplaza con tu número de teléfono (sin el +, con código de país)
  const phoneNumber = "+5491152615566"; 
  const message = "Hola, me gustaría más información.";
  const url = `https://wa.me/${+5491152615566}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        color: "white",
        padding: "10px 20px",
        borderRadius: "10px",
        textDecoration: "none",
        fontWeight: "bold"
      }}
    >
 <FaWhatsapp size={24}/>
    </a>
  );
};

export default WhatsAppButton;