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
        scrolled ? "bg-[#FE9E32]/90 text-black shadow-md" : "text-white"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        <img src="/logotr.png" alt="" className="h-20 w-auto" />
      </Link>

      {/* Menú en móviles */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(true)} className="bg-transparent p-2">
          <Menu size={30} className={scrolled ? "text-white" : "text-white"} />
        </button>
      </div>

      {/* Links - Escritorio */}
      <div className="hidden md:flex md:flex-row md:items-center space-x-4">
        <Link
          to="/destinos"
          className="text-white text-lg font-sans py-2 px-6 hover:opacity-70 transition-colors duration-200"
        >
          Destinos
        </Link>
        <Link
          to="/contacto"
          className="text-white text-lg font-sans py-2 px-6 hover:opacity-70 transition-colors duration-200"
        >
          Contacto
        </Link>
        <WhatsAppButton />
      </div>

      {/* Drawer menú móvil */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col">
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
