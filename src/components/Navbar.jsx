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
            <div className="text-2xl font-bold">
                <img src="/logotr.png" alt="" className="h-20 w-auto" />
            </div>

            {/* Menú en móviles */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="bg-transparent p-2">
                    {menuOpen ? (
                        <X size={30} className={scrolled ? "text-white" : "text-white"} />
                    ) : (
                        <Menu size={30} className={scrolled ? "text-white" : "text-white"} />
                    )}
                </button>
            </div>

            {/* Links - visibles en escritorio, ocultos en móviles hasta que se abra el menú */}
            <div
                className={`absolute md:relative top-16 md:top-auto right-0 w-full md:w-auto p-4 md:p-0 bg-transparent md:bg-transparent transition-all duration-300 ${
                    menuOpen ? "flex flex-col items-center" : "hidden md:flex md:flex-row"
                }`}
            >
                <Link
                    to="/destinos"
                    className="text-white md:text-white text-lg font-serif py-2 px-6 hover:opacity-70 transition-colors duration-200"
                >
                    Destinos
                </Link>
                <Link
                    to="/contacto"
                    className="text-white md:text-white text-lg font-serif py-2 px-6 hover:opacity-70 transition-colors duration-200"
                >
                    Contacto
                </Link>
                 <WhatsAppButton />
            </div>
        </nav>
    );
};

export default Navbar;
