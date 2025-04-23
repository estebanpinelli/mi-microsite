import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destino, setDestino] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestino = async () => {
      try {
        const res = await fetch(`/api/destinations/${id}`);
        
        if (!res.ok) {
          if (res.status === 404) throw new Error('Destino no encontrado');
          throw new Error('Error al cargar el destino');
        }
        
        const data = await res.json();
        setDestino(data);
        
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestino();
  }, [id]); // Dependencia del ID para recargar cuando cambie

  if (loading) return <p className="text-center mt-8">Cargando destino...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  if (!destino) return <p className="text-center mt-8">Destino no encontrado</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <article className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{destino.nombre}</h1>
        
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={destino.imagen} 
            alt={destino.nombre} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <p className="text-lg text-gray-700 leading-relaxed">
          {destino.descripcion}
        </p>

        {/* Sección adicional para más datos */}
        {destino.detalles && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Más información</h2>
            <p className="text-gray-600">{destino.detalles}</p>
          </div>
        )}
      </article>
    </div>
  );
};

export default DestinationDetail;