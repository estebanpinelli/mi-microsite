import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiCheckCircle, FiZoomIn } from 'react-icons/fi';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destino, setDestino] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestino = async () => {
      try {
        const res = await fetch(`/api/destinations/${id}`);
        if (!res.ok) throw new Error('Error al cargar el destino');
        const data = await res.json();
        setDestino(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDestino();
  }, [id]);

  if (loading) return <div className="text-center py-20">Cargando...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!destino) return <div className="text-center py-20">Destino no encontrado</div>;

  // Función para determinar columnas del grid
  const gridColumns = () => {
    const count = destino.imagenes?.length || 0;
    if (count <= 3) return 'md:grid-cols-3';
    if (count <= 4) return 'md:grid-cols-2 lg:grid-cols-4';
    return 'md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div className="font-sans antialiased text-gray-800">
      <style jsx global>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* Hero Section con animación */}
      <div className="relative h-[80vh]">
        <img
          src={destino.imagenBanner}
          alt={destino.nombre}
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/30 flex items-end pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-4 animate-fadeSlideUp opacity-0">
              {destino.nombre}
            </h1>
            <button className="bg-blue-900 text-white px-8 py-3 hover:bg-blue-800 transition">
              Reservar
            </button>
          </div>
        </div>
      </div>

      {/* Sección de detalles */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Precio */}
          <div className="border-l-4 border-blue-900 pl-4">
            <h3 className="text-xl font-semibold mb-3">Precio desde</h3>
            <p className="text-2xl font-bold text-blue-900">
              ${destino.precio?.toLocaleString()}
            </p>
          </div>
          
          {/* Duración */}
          <div className="border-l-4 border-blue-900 pl-4">
            <h3 className="text-xl font-semibold mb-3">Duración</h3>
            <p className="text-lg">{destino.duracion}</p>
          </div>
          
          {/* Modalidad */}
          <div className="border-l-4 border-blue-900 pl-4">
            <h3 className="text-xl font-semibold mb-3">Modalidad</h3>
            <p className="text-lg">{destino.modalidad || "Personalizable"}</p>
          </div>
        </div>

        {/* Incluye */}
        <section className="bg-gray-50 py-16 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-light mb-8">El viaje incluye</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {destino.incluye?.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FiCheckCircle className="text-blue-900" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lo más destacado */}
        <section className="mb-16">
          <h2 className="text-3xl font-light mb-8">Lo más destacado</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {destino.highlight?.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <FiCheckCircle className="text-blue-900 mt-1 text-xl" />
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Descripción */}
        <section className="mb-16">
          <h2 className="text-3xl font-light mb-8">Descripción del viaje</h2>
          <div className="prose max-w-3xl text-lg leading-relaxed">
            {destino.descriptivoCompleto}
          </div>
        </section>

        {/* Galería de imágenes */}
        <section className="py-16">
          <h2 className="text-3xl font-light mb-8 text-center">Galería del destino</h2>
          
          <div className={`grid grid-cols-1 ${gridColumns()} gap-4`}>
            {destino.imagenes?.map((img, index) => (
              <div 
                key={index}
                className="relative group cursor-zoom-in h-64"
                onClick={() => window.open(img, '_blank')}
              >
                <img
                  src={img}
                  alt={`Galería ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FiZoomIn className="text-white w-8 h-8" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-gray-500">
            {destino.imagenes?.length} imágenes disponibles - Haz clic para ampliar
          </div>
        </section>
      </div>
    </div>
  );
};

export default DestinationDetail;