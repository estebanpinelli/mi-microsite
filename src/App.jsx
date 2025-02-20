import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Destinos from "./components/Destinos";
import Navbar from "./components/Navbar";


function App() {
    return (
        <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden" }}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/destinos" element={<Destinos />} />
                    <Route path="/contacto" element={<h2 style={{ textAlign: "center", marginTop: "100px" }}>Página de Contacto</h2>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;