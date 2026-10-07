import { FaWhatsapp } from "react-icons/fa";

// Botón flotante de WhatsApp, abajo a la derecha. Se monta una sola vez
// en App.jsx (no dentro del Navbar): antes vivía en el Navbar, y como en
// mobile los links del Navbar están dentro del menú desplegable, en el
// celular el botón solo aparecía con el menú abierto. Montado en App se
// ve igual en todas las pantallas.
// Color: el verde oficial de WhatsApp (#25D366) con el ícono blanco, a
// propósito fuera de la paleta del sitio: es el verde que la gente
// reconoce al instante como "WhatsApp".
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
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-15 w-15 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110"
    >
      <FaWhatsapp size={35} aria-hidden="true" />
    </a>
  );
};

export default WhatsAppButton;
