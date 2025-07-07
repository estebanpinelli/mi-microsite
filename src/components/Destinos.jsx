import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Destinos = () => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/data/destinations.json');
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setDestinos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  if (loading) return <p className="text-center mt-8">Cargando destinos...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  if (destinos.length === 0) {
    return <p className="text-center mt-8 text-gray-500">No hay destinos disponibles aún.</p>;
  }

  const destinosVisibles = destinos.slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">Experiencias Destacadas</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Destino principal */}
        <Link 
          to={`/destino/${destinosVisibles[0].id}`}
          className="md:w-1/2 h-[60vh] md:h-[120vh] hover:opacity-90 transition-opacity"
        >
          <img
            src={destinosVisibles[0].imagen}
            alt={destinosVisibles[0].nombre}
            className="w-full h-full object-cover rounded-lg"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            {destinosVisibles[0].nombre}
          </h3>
          <p className="text-gray-600 text-sm">{destinosVisibles[0].descripcion}</p>
        </Link>

        {/* Destinos secundarios */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {destinosVisibles.slice(1).map((destino) => (
            <Link 
              to={`/destino/${destino.id}`}
              key={destino.id}
              className="flex flex-col items-center hover:opacity-90 transition-opacity"
            >
              <img
                src={destino.imagen}
                alt={destino.nombre}
                className="w-full h-[250px] object-cover rounded-lg"
              />
              <h4 className="text-lg font-semibold text-gray-800 mt-3">
                {destino.nombre}
              </h4>
              <p className="text-gray-600 text-sm text-center">
                {destino.descripcion}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinos;