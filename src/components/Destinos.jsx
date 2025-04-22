import { useState, useEffect } from "react";

const Destinos = () => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // Modifica la URL con parámetros para la home
        const response = await fetch('/api/destinations?home=true&limit=4');
        
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        
        const data = await response.json();
        console.log("Datos para home:", data);
        setDestinos(data);

      } catch (error) {
        console.error('Error al obtener destinos:', error);
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

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">Experiencias Destacadas</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagen principal (primer destino) */}
        <div className="md:w-1/2 h-[60vh] md:h-[120vh]">
          <img
            src={destinos[0].imagen}
            alt={destinos[0].nombre}
            className="w-full h-full object-cover rounded-lg"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            {destinos[0].nombre}
          </h3>
          <p className="text-gray-600 text-sm">{destinos[0].descripcion}</p>
        </div>

        {/* Columnas para los otros 3 destinos */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {destinos.slice(1).map((destino, index) => (
            <div key={index} className="flex flex-col items-center">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinos;