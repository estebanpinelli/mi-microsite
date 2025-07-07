import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiZoomIn, FiCalendar, FiDollarSign, FiMapPin } from 'react-icons/fi';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Footer from '../components/Footer'; // 

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <div className="font-sans antialiased text-gray-800">
      <div className="relative h-[70vh]">
        <img
          src={destino.imagenBanner}
          alt={destino.nombre}
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {destino.nombre}
            </h1>
            <Link
              to="/contacto"
              className="inline-block bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
            >
              Reservar
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-8">

        {/* Datos clave */}
        <section className="bg-white border rounded-xl px-6 py-4 shadow-sm">
          <div className="flex flex-col sm:flex-row flex-wrap justify-around gap-6 text-gray-800 text-base sm:text-lg font-medium">
            <div className="flex items-center gap-3">
              <FiDollarSign className="text-blue-800 text-2xl" />
              <span>
                Desde <strong className="text-blue-800">USD {destino.precio?.toLocaleString()}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FiCalendar className="text-blue-800 text-2xl" />
              <span>Duración: {destino.duracion}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin className="text-blue-800 text-2xl" />
              <span>Modalidad: {destino.modalidad || 'Personalizable'}</span>
            </div>
          </div>
        </section>

        {/* Detalles del viaje */}
        <section className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Detalles del viaje</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-gray-500 font-medium mb-2">Incluye:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {destino.incluye?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle className="text-blue-900 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-gray-500 font-medium mb-2">Lo más destacado:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {destino.highlight?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle className="text-blue-900 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Descripción + Carrusel al lado */}
<section className="grid md:grid-cols-2 gap-8 items-start">
  {/* Carrusel vertical al lado izquierdo */}
  <div className="w-full h-[500px] overflow-hidden rounded-xl shadow border">
    <Slider
      {...{
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true
      }}
      className="h-full"
    >
      {destino.imagenes?.map((img, index) => (
        <div key={index} className="h-[500px]">
          <img
            src={img}
            alt={`Imagen ${index + 1}`}
            className="w-full h-full object-cover rounded-xl cursor-pointer"
            onClick={() => window.open(img, "_blank")}
          />
        </div>
      ))}
    </Slider>
  </div>

  {/* Descripción + botón */}
  <div className="flex flex-col justify-between h-full space-y-6">
    <div>
      <h2 className="text-3xl font-semibold mb-4">{destino.nombre}</h2>
      <div className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
        {destino.descriptivoCompleto}
      </div>
    </div>

    <div>
    </div>
  </div>
</section>

        {/* CTA final */}
        <div className="text-center pt-10 pb-20">
          <div className="bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-3xl p-10 border border-blue-100 shadow-md">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              ¿Listo para vivir esta experiencia?
            </h3>
            <p className="text-base text-gray-700 mb-6">
              Contacta con nuestros especialistas en viajes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacto"
                className="bg-blue-700 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
              >
                Solicitar Cotización
              </Link>
              <Link
                to="/contacto"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-white hover:shadow transition-all duration-300 text-center"
              >
                Más Información
              </Link>
            </div>
          </div>
        </div>
      </div>
       <Footer />
    </div>
  );
};

export default DestinationDetail;
