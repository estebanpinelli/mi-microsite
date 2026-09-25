import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import WhatsAppButton from "../components/BotonWhats";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 py-0 flex items-center justify-between z-50 transition-all duration-300 ${
        scrolled ? "bg-naranja/90 text-tinta shadow-md" : "text-white"
      }`}
    >
      {/* Logo: dos líneas, "EXÓTICOS" (con el tracking de las etiquetas
          eyebrow que ya usa el sitio) y "by Lomasturismo" más chico y
          tenue debajo. El color se fija acá mismo (blanco / tinta al hacer
          scroll) en vez de heredarlo del <nav>, porque el <Link> es un <a>
          y sin una clase de color propia cae en la regla vieja de Vite
          (a { color: #646cff }) del index.css. opacity-70 en la segunda
          línea la atenúa un poco sin importar cuál de los dos esté activo. */}
      <Link
        to="/"
        className={`flex flex-col leading-none py-3 ${
          scrolled ? "text-tinta" : "text-white"
        }`}
      >
        <span className="font-display font-semibold text-2xl tracking-[0.2em]">
          EXÓTICOS
        </span>
        <span className="mt-1.5 font-sans font-medium text-[10px] uppercase tracking-[0.18em] opacity-70">
          by Lomasturismo
        </span>
      </Link>

      {/* Menú en móviles */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          className="bg-transparent p-2"
          aria-label="Abrir menú"
        >
          <Menu size={30} className={scrolled ? "text-tinta" : "text-white"} />
        </button>
      </div>

      {/* Links - Escritorio */}
      <div className="hidden md:flex md:flex-row md:items-center space-x-4">
        <Link
          to="/destinos"
          className={`text-lg font-sans font-semibold py-2 px-6 hover:opacity-70 transition-colors duration-200 ${
            scrolled ? "text-tinta" : "text-white"
          }`}
        >
          Destinos
        </Link>
        <Link
          to="/contacto"
          className={`text-lg font-sans font-semibold py-2 px-6 hover:opacity-70 transition-colors duration-200 ${
            scrolled ? "text-tinta" : "text-white"
          }`}
        >
          Contacto
        </Link>
        <WhatsAppButton />
      </div>

      {/* Drawer menú móvil */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex flex-col">
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={22} className="text-white" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full space-y-10">
            <Link
              to="/destinos"
              onClick={() => setMenuOpen(false)}
              className="text-white text-xl font-bold"
            >
              Destinos
            </Link>
            <Link
              to="/contacto"
              onClick={() => setMenuOpen(false)}
              className="text-white text-xl font-bold"
            >
              Contacto
            </Link>
            <WhatsAppButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
