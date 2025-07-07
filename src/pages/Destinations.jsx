import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Footer from '../components/Footer'; // 

const Destinations = () => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const carouselRef = useRef(null);

  const bannerImages = [
    '/fotobannerborneo.jpg',
    '/fotobanneribiza.jpg',
    '/fotobannernoruega.jpg',
    '/fotobannertoscana.jpg'
  ];

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const res = await fetch('/data/destinations.json');
        if (!res.ok) throw new Error('Error en la respuesta del servidor');
        const data = await res.json();
        setDestinos(data);
      } catch (error) {
        setError(error.message);
        console.error("Fallo al obtener destinos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return <p className="text-center mt-8">Cargando destinos...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  if (destinos.length === 0) return <p className="text-center mt-8 text-gray-500">No hay destinos disponibles</p>;

  return (
    <div className="max-w-full mx-auto bg-white">
      {/* Banner */}
      <div className="relative h-[70vh] overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBannerIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Explora el Mundo</h2>
                <p className="text-xl md:text-2xl">Descubre los destinos más increíbles del planeta</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carrusel con flechas */}
      <div className="max-w-full px-4 py-12 relative group">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Nuestros Destinos</h2>

        {/* Flechas de navegación */}
        <button
          onClick={() => scrollCarousel('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all opacity-0 group-hover:opacity-100"
        >
          <FiChevronLeft className="w-8 h-8 text-gray-800" />
        </button>

        <button
          onClick={() => scrollCarousel('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all opacity-0 group-hover:opacity-100"
        >
          <FiChevronRight className="w-8 h-8 text-gray-800" />
        </button>

        <div
          ref={carouselRef}
          className="flex overflow-x-hidden pb-6 gap-8 scroll-smooth px-4"
        >
          {destinos.map((destino) => (
            <div
              key={destino.id}
              className="flex-shrink-0 w-[36rem] transform transition-transform hover:scale-95 relative group"
            >
              <Link
                to={`/destino/${destino.id}`}
                className="block rounded-xl shadow-lg overflow-hidden relative h-full"
              >
                <img
                  src={destino.imagen}
                  alt={destino.nombre}
                  className="w-full h-96 object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-3xl font-semibold text-white mb-4">{destino.nombre}</h3>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-medium text-xl border-b-2 border-white hover:border-transparent">
                      Ver viaje
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Destinations;
