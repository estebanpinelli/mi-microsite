import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";

function App() {
  return (
    <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinos" element={<Destinations />} />
          <Route path="/destino/:id" element={<DestinationDetail />} />
          <Route path="/contacto" element={<Contact />} />
          
          {/* Ruta adicional para manejar IDs malformados */}
          <Route path="/destino/*" element={<h2 className="text-center mt-8">ID de destino inválido</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;