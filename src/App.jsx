import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Destinos from "./components/Destinos";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact"; // Importamos el nuevo componente

function App() {
    return (
        <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden" }}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/destinos" element={<Destinos />} />
                    <Route path="/contacto" element={<Contact />} /> {/* Usamos el componente Contact */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;