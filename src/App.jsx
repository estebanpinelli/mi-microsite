import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";

// Code splitting por ruta: en vez de importar cada página arriba (lo que
// las mete a TODAS dentro de un único archivo .js gigante que se descarga
// entero apenas alguien entra al sitio), React.lazy() le dice a Vite que
// genere un archivo .js aparte por cada página, y ese archivo recién se
// pide de la red cuando el visitante navega a esa ruta. Por ejemplo,
// alguien que entra a Home y nunca visita /contacto jamás descarga el
// código de Contact.
const Home = lazy(() => import("./pages/Home"));
const Destinations = lazy(() => import("./pages/Destinations"));
const DestinationDetail = lazy(() => import("./pages/DestinationDetail"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  return (
    <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden" }}>
      <Router>
        <Navbar />
        {/* Suspense es obligatorio junto con lazy(): mientras el archivo .js
            de la página todavía se está descargando, React muestra el
            fallback (nuestro spinner) en su lugar. Cuando termina de
            descargar, lo reemplaza por la página real. */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinos" element={<Destinations />} />
            <Route path="/destino/:id" element={<DestinationDetail />} />
            <Route path="/contacto" element={<Contact />} />

            {/* Ruta adicional para manejar IDs malformados */}
            <Route path="/destino/*" element={<h2 className="text-center mt-8">ID de destino inválido</h2>} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
