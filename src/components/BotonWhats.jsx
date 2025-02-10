import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  // Reemplaza con tu número de teléfono (sin el +, con código de país)
  const phoneNumber = "34653455023"; 
  const message = "Hola, me gustaría más información.";
  const url = `https://wa.me/${+34653455023}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        backgroundColor: "#25D366",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        textDecoration: "none",
        fontWeight: "bold"
      }}
    >
 <FaWhatsapp size={24}/>
    </a>
  );
};

export default WhatsAppButton;