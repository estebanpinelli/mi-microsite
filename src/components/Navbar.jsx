import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-50 transition-all duration-300 ${
                scrolled ? "bg-white text-black shadow-md" : " text-white"
            }`}
        >
            {/* Logo */}
            <div className="text-2xl font-bold">
                <img src="/Logo.jpg" alt="" className="h-10" />
            </div>

            {/* Menú en móviles */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={30} className={scrolled ? "text-black" : "text-white"} /> : <Menu size={30} className={scrolled ? "text-black" : "text-white"} />}
                </button>
            </div>

            {/* Links */}
            <div
                className={`md:flex gap-8 absolute md:relative top-16 md:top-auto right-0 w-full md:w-auto p-4 md:p-0 transition-all duration-300 ${
                    menuOpen ? "block" : "hidden"
                } ${scrolled ? "bg-white text-black" : "bg-black bg-opacity-90 md:bg-transparent text-white"}`}
            >
                <Link to="/destinos" className={`text-lg font-serif hover:opacity-70 transition-colors duration-200 ${scrolled ? "text-black" : "text-white"}`}>
                    Destinos
                </Link>
                <Link to="/contacto" className={`text-lg font-serif hover:opacity-70 transition-colors duration-200 ${scrolled ? "text-black" : "text-white"}`}>
                    Contacto
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;