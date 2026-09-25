import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import Footer from "../components/Footer";
import DestinoCard from "../components/DestinoCard";
import { isLocalImage, toWebp } from "../utils/images";
import Seo from "../components/Seo";
import { SITE_URL } from "../config/site";

const Destinations = () => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const carouselRef = useRef(null);

  const bannerImages = [
    "/fotobannerborneo.jpg",
    "/fotobanneribiza.jpg",
    "/fotobannernoruega.jpg",
    "/fotobannertoscana.jpg",
  ];

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const res = await fetch("/data/destinations.json");
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        const data = await res.json();
        setDestinos(data.filter((d) => d.publicado !== false));
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
    }, 4200);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.82;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Título/descripción fijos de esta página (no dependen de si los datos
  // ya cargaron), para que se vean bien desde el primer instante, incluso
  // durante el "Cargando destinos...".
  const seo = (
    <Seo
      title="Destinos | Exóticos - Viajes privados y en grupos reducidos"
      description="Descubrí nuestros viajes privados y en grupos reducidos a Japón, Sudáfrica, Australia, Nueva Zelanda, Gran Bretaña, Irlanda y China. Experiencias diseñadas a medida."
      image={`${SITE_URL}/fotobannerborneo.jpg`}
      path="/destinos"
    />
  );

  if (loading)
    return (
      <>
        {seo}
        <div className="min-h-[50vh] grid place-items-center px-6">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-filete border-t-naranja rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted text-lg">Cargando destinos...</p>
          </div>
        </div>
      </>
    );

  if (error)
    return (
      <>
        {seo}
        <div className="min-h-[50vh] grid place-items-center px-6">
          <div className="text-center bg-red-50 border border-red-200 rounded-2xl px-8 py-6">
            <p className="text-red-700 font-medium">Error: {error}</p>
          </div>
        </div>
      </>
    );

  if (destinos.length === 0)
    return (
      <>
        {seo}
        <div className="min-h-[50vh] grid place-items-center px-6">
          <p className="text-muted text-lg">No hay destinos disponibles</p>
        </div>
      </>
    );

  return (
    <div className="w-full bg-papel text-tinta">
      {seo}
      {/* HERO BANNER */}
      {/* En mobile el contenido (título grande + párrafo + dos botones
          apilados) no entra en 72vh sin pisar el navbar fijo de arriba —
          apenas se notó al revisar en mobile, porque antes solo se había
          probado en desktop. Por eso en mobile la sección usa una altura
          de pantalla completa (con un piso en px para celulares chicos) y
          recién de md en adelante vuelve al 72vh original. */}
      <section className="relative h-screen min-h-[680px] md:h-[72vh] md:min-h-[540px] overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              index === currentBannerIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <picture>
              {isLocalImage(image) && (
                <source srcSet={toWebp(image)} type="image/webp" />
              )}
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover scale-[1.02]"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/60" />
          </div>
        ))}

        {/* Hero content */}
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 pb-14 md:pb-0">
            <div className="max-w-3xl text-white">
              <p className="uppercase tracking-[0.28em] text-xs md:text-sm text-white/80 mb-5">
                Curaduría de viajes
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-5">
                Explorá el mundo con
                <span className="block font-light italic text-white/95">
                  experiencias memorables
                </span>
              </h1>
              <p className="text-base md:text-xl text-white/90 max-w-2xl leading-relaxed">
                Diseñamos itinerarios con propósito, detalle y estilo para que
                cada destino se convierta en una historia inolvidable.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 bg-white text-tinta px-6 py-3 rounded-full font-medium hover:bg-naranja-tinte transition-all duration-300 hover:-translate-y-0.5"
                >
                  Planear mi viaje
                  <FiArrowRight className="text-base" />
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("destinos-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 border border-white/50 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
                >
                  Ver destinos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBannerIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentBannerIndex
                  ? "w-8 bg-white"
                  : "w-4 bg-white/45 hover:bg-white/70"
              }`}
              aria-label={`Ir al banner ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* DESTINOS */}
      <section id="destinos-section" className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Header sección */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="uppercase tracking-[0.22em] text-xs text-muted mb-3">
                Selección destacada
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold text-tinta">
                Nuestros destinos
              </h2>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => scrollCarousel("left")}
                className="w-11 h-11 rounded-full border border-filete bg-white text-tinta grid place-items-center hover:bg-naranja-tinte hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                aria-label="Desplazar a la izquierda"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="w-11 h-11 rounded-full border border-filete bg-white text-tinta grid place-items-center hover:bg-naranja-tinte hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                aria-label="Desplazar a la derecha"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carrusel */}
          <div
            ref={carouselRef}
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {destinos.map((destino) => (
              <article
                key={destino.id}
                className="flex-shrink-0 w-[78vw] sm:w-[22rem] md:w-[24rem] snap-start"
              >
                <DestinoCard destino={destino} />
              </article>
            ))}
          </div>

          {/* Flechas mobile */}
          <div className="md:hidden flex justify-center gap-3 mt-8">
            <button
              onClick={() => scrollCarousel("left")}
              className="w-11 h-11 rounded-full border border-filete bg-white text-tinta grid place-items-center active:scale-95 transition"
              aria-label="Desplazar a la izquierda"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="w-11 h-11 rounded-full border border-filete bg-white text-tinta grid place-items-center active:scale-95 transition"
              aria-label="Desplazar a la derecha"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;