import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiCheckCircle,
  FiCalendar,
  FiDollarSign,
  FiMapPin,
  FiArrowRight,
  FiClock,
  FiStar
} from 'react-icons/fi';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../components/Footer';

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

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-700 animate-spin" />
          <p className="mt-4 text-slate-600">Cargando destino...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500 font-medium">{error}</div>;
  }

  if (!destino) {
    return <div className="text-center py-12 text-slate-700">Destino no encontrado</div>;
  }

  return (
    <div className="font-sans antialiased text-slate-800 bg-slate-50">
      {/* HERO */}
      <header className="relative isolate h-[78vh] min-h-[520px] overflow-hidden">
        <img
          src={destino.imagenBanner}
          alt={destino.nombre}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/45 to-slate-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_40%)]" />

        <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 sm:px-6 lg:px-8 pb-14 md:pb-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs tracking-[0.18em] text-white/90 uppercase backdrop-blur">
              <FiStar className="text-amber-300" />
              Experiencia seleccionada
            </span>

            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              {destino.nombre}
            </h1>

            <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed">
              Viaje diseñado para disfrutar cada detalle, con acompañamiento experto y
              una planificación pensada para que solo te ocupes de vivirlo.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 active:scale-[0.98]"
              >
                Reservar ahora
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <a
                href="#detalle"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Ver itinerario
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* STRIP DE DATOS */}
        <section className="rounded-2xl border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5 backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4 sm:p-6">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 inline-flex rounded-lg bg-blue-100 p-2 text-blue-800">
                <FiDollarSign />
              </div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Tarifa base</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                USD {destino.precio?.toLocaleString()}
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 inline-flex rounded-lg bg-indigo-100 p-2 text-indigo-700">
                <FiCalendar />
              </div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Duración</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{destino.duracion}</p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 inline-flex rounded-lg bg-cyan-100 p-2 text-cyan-700">
                <FiMapPin />
              </div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Modalidad</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                {destino.modalidad || 'Personalizable'}
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-700">
                <FiClock />
              </div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Planificación</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">Asesoría completa</p>
            </article>
          </div>
        </section>

        {/* CONTENIDO PRINCIPAL */}
        <section id="detalle" className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* CARRUSEL */}
          <article className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
            <div className="overflow-hidden rounded-xl">
              <Slider
                {...{
                  dots: true,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 4200,
                  arrows: false
                }}
              >
                {destino.imagenes?.map((img, index) => (
                  <div key={index} className="relative h-[260px] sm:h-[360px] md:h-[430px] lg:h-[500px]">
                    <img
                      src={img}
                      alt={`${destino.nombre} - imagen ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => window.open(img, "_blank")}
                      className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 shadow hover:bg-white"
                    >
                      Ver en grande
                    </button>
                  </div>
                ))}
              </Slider>
            </div>
          </article>

          {/* DESCRIPCIÓN + LISTAS */}
          <article className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                Detalles del viaje
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-700 whitespace-pre-line">
                {destino.descriptivoCompleto}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
                Incluye
              </h3>
              <ul className="space-y-2">
                {destino.incluye?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <FiCheckCircle className="mt-0.5 text-blue-700 shrink-0" />
                    <span className="text-sm sm:text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
                Lo más destacado
              </h3>
              <ul className="space-y-2">
                {destino.highlight?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <FiCheckCircle className="mt-0.5 text-indigo-700 shrink-0" />
                    <span className="text-sm sm:text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        {/* CTA FINAL */}
        <section className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-blue-200/60 bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-10 sm:p-10 text-white shadow-2xl shadow-blue-900/20">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-10 -bottom-14 h-44 w-44 rounded-full bg-cyan-300/20 blur-2xl" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-2xl sm:text-3xl font-semibold">
                  ¿Listo para vivir esta experiencia?
                </h3>
                <p className="mt-3 text-white/90">
                  Te ayudamos a personalizar fechas, actividades y tipo de viaje según tu estilo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 active:scale-[0.98]"
                >
                  Solicitar cotización
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationDetail;