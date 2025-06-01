import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiCheckCircle, FiZoomIn, FiCalendar, FiDollarSign, FiMapPin } from 'react-icons/fi';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destino, setDestino] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestino = async () => {
      try {
        const res = await fetch('/data/destinations.json');
        if (!res.ok) throw new Error('Error al cargar los destinos');
        const data = await res.json();
        const found = data.find(d => String(d.id) === id);
        if (!found) throw new Error('Destino no encontrado');
        setDestino(found);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDestino();
  }, [id]);

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!destino) return <div className="text-center py-10">Destino no encontrado</div>;

  const gridColumns = () => {
    const count = destino.imagenes?.length || 0;
    if (count <= 3) return 'md:grid-cols-3';
    if (count <= 4) return 'md:grid-cols-2 lg:grid-cols-4';
    return 'md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div className="font-sans antialiased text-gray-800">
      <style jsx="true">{`
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

      {/* Banner con tamaño original y animación */}
      <div className="relative h-[80vh]">
        <img
          src={destino.imagenBanner}
          alt={destino.nombre}
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/30 flex items-end pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeSlideUp opacity-0">
              {destino.nombre}
            </h1>
            <button className="bg-blue-900 text-white px-8 py-3 hover:bg-blue-800 transition">
              Reservar
            </button>
          </div>
        </div>
      </div>

      {/* Contenido compacto */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <FiDollarSign className="text-blue-900 text-xl" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Precio desde</h3>
              <p className="text-xl font-bold text-blue-900">
                ${destino.precio?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FiCalendar className="text-blue-900 text-xl" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Duración</h3>
              <p className="text-lg">{destino.duracion}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FiMapPin className="text-blue-900 text-xl" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Modalidad</h3>
              <p className="text-lg">{destino.modalidad || 'Personalizable'}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">El viaje incluye</h2>
            <div className="space-y-3">
              {destino.incluye?.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FiCheckCircle className="text-blue-900 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Lo más destacado</h2>
            <div className="space-y-3">
              {destino.highlight?.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FiCheckCircle className="text-blue-900 mt-0.5 flex-shrink-0" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Descripción del viaje</h2>
          <div className="prose max-w-none text-gray-700">
            {destino.descriptivoCompleto}
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Galería del destino</h2>
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

          <div className="mt-4 text-center text-sm text-gray-500">
            {destino.imagenes?.length} imágenes disponibles - Haz clic para ampliar
          </div>
        </section>
                <div className="text-center pb-20">
          <div className="backdrop-blur-md bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-3xl p-12 border border-white/30 shadow-xl">
            <h3 className="text-3xl font-light text-gray-900 mb-6">
              ¿Listo para vivir esta experiencia?
            </h3>
            <p className="text-lg text-gray-700 mb-8 font-light">
              Contacta con nuestros especialistas en viajes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-full font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Solicitar Cotización
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-white hover:shadow-lg transition-all duration-300">
                Más Información
              </button>
            </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default DestinationDetail;