import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

// Footer con las clases de la paleta del sitio (papel, filete, muted,
// tinta) en vez de colores escritos a mano en style={{}}: así, si cambia
// un color de marca en index.css, el footer lo sigue solo. Los íconos de
// redes van en tinta (no en el azul de Facebook ni el rosa de Instagram)
// para no romper la paleta, y se ponen naranja-texto al pasar el mouse.
// Todos los links llevan su propio color de texto porque, sin una clase
// de color, un <a> cae en la regla vieja de Vite (a { color: #646cff })
// de index.css.
const linkClase =
  "text-tinta hover:text-naranja-texto transition-colors duration-200";

const Footer = () => {
  return (
    <footer className="w-full border-t border-filete bg-papel px-5 py-5 text-center text-sm text-muted">
      {/* Información de dirección y legajo */}
      <div className="mb-2.5">
        <p>
          <strong>Dirección:</strong> Loria 449 (C2587ABC), Lomas de Zamora - Buenos Aires - Argentina
        </p>
        <p>
          <strong>Legajo:</strong> (EVT) 13190 Disp 549
        </p>
      </div>

      {/* Redes sociales */}
      <div className="mb-4 flex justify-center gap-4">
        <a
          href="https://www.facebook.com/profile.php?id=61551028650874"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className={linkClase}
        >
          <FaFacebookF size={24} aria-hidden="true" />
        </a>
        <a
          href="https://www.instagram.com/lomasturismoexoticos/?next=%2F"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={linkClase}
        >
          <FaInstagram size={24} aria-hidden="true" />
        </a>
      </div>

      {/* Enlaces de navegación */}
      <div className="mb-2.5 flex flex-wrap justify-center gap-x-5 gap-y-1">
        <Link to="/contacto" className={linkClase}>
          Contacto
        </Link>
        <a href="/legales" className={linkClase}>
          Legales
        </a>
        <a href="/condiciones" className={linkClase}>
          Condiciones Generales
        </a>
      </div>

      {/* Copyright */}
      <div>
        &copy; {new Date().getFullYear()} Lomas Turismo. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
