import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Destinations = () => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const res = await fetch('/api/destinations');
        
        if (!res.ok) throw new Error('Error en la respuesta del servidor');
        
        const data = await res.json();
        console.log("Datos recibidos en Destinations:", data); // Para depuración
        setDestinos(data);
        
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDestinos();
  }, []);

  // Estados de carga y error
  if (loading) return <p className="text-center mt-8">Cargando destinos...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  if (destinos.length === 0) return <p className="text-center mt-8 text-gray-500">No hay destinos disponibles</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Destinos</h1>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinos.map((destino) => (
          <li key={destino.id} className="hover:shadow-lg transition-shadow duration-300">
            <Link 
              to={`/destino/${destino.id}`}
              className="block p-4 rounded-lg border border-gray-200"
            >
              <img 
                src={destino.imagen} 
                alt={destino.nombre} 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">{destino.nombre}</h2>
              {destino.descripcion && (
                <p className="text-gray-600 mt-2 text-sm">{destino.descripcion}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;