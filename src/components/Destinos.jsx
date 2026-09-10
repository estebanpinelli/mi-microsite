import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Destinos = () => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/data/destinations.json");
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
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
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">
        Experiencias Destacadas
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Destino principal */}
        <Link
          to={`/destino/${destinosVisibles[0].id}`}
          className="relative md:w-1/2 h-[60vh] md:h-[120vh] hover:opacity-90 transition-opacity"
        >
          <img
            src={destinosVisibles[0].imagen}
            alt={destinosVisibles[0].nombre}
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Texto: overlay SOLO en mobile, fuera en desktop */}
          <div
            className="
              absolute bottom-0 left-0 w-full p-4 rounded-b-lg bg-gradient-to-t from-black/70 to-transparent
              md:static md:bg-none md:p-0 md:mt-4
            "
          >
            <h3 className="text-xl font-semibold text-white md:text-gray-800">
              {destinosVisibles[0].nombre}
            </h3>
            <p className="text-gray-200 text-sm md:text-gray-600 md:mt-1">
              {destinosVisibles[0].descripcion}
            </p>
          </div>
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
              <p className="text-gray-600 text-sm text-center">{destino.descripcion}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinos;
