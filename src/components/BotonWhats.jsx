import { FaWhatsapp } from "react-icons/fa";

// Botón flotante de WhatsApp, abajo a la derecha. Se monta una sola vez
// en App.jsx (no dentro del Navbar): antes vivía en el Navbar, y como en
// mobile los links del Navbar están dentro del menú desplegable, en el
// celular el botón solo aparecía con el menú abierto. Montado en App se
// ve igual en todas las pantallas.
// Colores: tinta con el ícono blanco, en vez del verde de WhatsApp, para
// que no rompa la paleta del sitio; al pasar el mouse se pone naranja
// con el ícono en tinta (blanco sobre naranja no se lee). El borde
// blanco fino (ring) lo despega del fondo cuando pasa por encima del
// hero oscuro.
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
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-tinta text-white shadow-lg ring-1 ring-white/40 transition-all duration-300 hover:scale-110 hover:bg-naranja hover:text-tinta"
    >
      <FaWhatsapp size={30} aria-hidden="true" />
    </a>
  );
};

export default WhatsAppButton;
