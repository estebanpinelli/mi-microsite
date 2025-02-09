import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-10 backdrop-blur-lg px-6 py-4 flex items-center justify-between z-50">
            <h1 className="text-white text-2xl font-bold">Exóticos</h1>

            {/* Ícono de menú en móviles */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={30} className="text-white" /> : <Menu size={30} className="text-white" />}
                </button>
            </div>

            {/* Links en escritorio */}
            <div className={`md:flex gap-6 absolute md:relative top-16 md:top-auto right-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0 transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}>
                <Link to="/" className="text-white text-lg hover:text-gray-400">Inicio</Link>
                <Link to="/destinos" className="text-white text-lg hover:text-gray-400">Destinos</Link>
                <Link to="/contacto" className="text-white text-lg hover:text-gray-400">Contacto</Link>
            </div>
        </nav>
    );
};

export default Navbar;