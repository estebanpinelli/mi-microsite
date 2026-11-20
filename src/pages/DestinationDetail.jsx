import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiDollarSign,
  FiMapPin,
  FiArrowRight,
  FiClock,
  FiStar,
  FiPlus,
  FiMessageCircle
} from 'react-icons/fi';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../components/Footer';
import { isLocalImage, toWebp } from '../utils/images';
import { setPageStructuredData, clearPageStructuredData } from '../utils/structuredData';
import { parseItinerario, truncar } from '../utils/itinerario';
import { buildDestinoStructuredData, destinoPath, destinoSeoTitle } from '../utils/destinoSeo';
import { SITE_URL, WHATSAPP } from '../config/site';
import Seo from '../components/Seo';

// Página de un destino. La URL ahora usa el "slug" del destino
// (/destino/japon-tokio-hiroshima) en vez del número (/destino/1): una URL
// con palabras le dice a Google (y a quien ve el link en WhatsApp) de qué
// se trata la página. Los links viejos con número siguen funcionando:
// buscamos por slug O por id, y si entraron por id los mandamos a la URL
// nueva (además vercel.json ya hace esa redirección 301 del lado del
// servidor, que es la que ve Google).
const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destino, setDestino] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestino = async () => {
      try {
        const res = await fetch('/data/destinations.json');
        if (!res.ok) throw new Error('Error al cargar los destinos');
        const data = await res.json();
        const found = data.find(d => d.slug === id || String(d.id) === id);
        if (!found || found.publicado === false) throw new Error('Destino no encontrado');
        if (found.slug && found.slug !== id) {
          navigate(destinoPath(found), { replace: true });
        }
        setDestino(found);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDestino();
  }, [id, navigate]);

  // Datos estructurados (schema.org) de ESTE destino: viaje (TouristTrip)
  // con su itinerario, precio, migas de pan y, si las hay, preguntas
  // frecuentes. Se arman en utils/destinoSeo.js porque el script de
  // pre-render del build usa exactamente los mismos datos.
  useEffect(() => {
    if (!destino) return;
    setPageStructuredData(buildDestinoStructuredData(destino));
    return () => clearPageStructuredData();
  }, [destino]);

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-papel">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded-full border-4 border-filete border-t-naranja animate-spin" />
          <p className="mt-4 text-muted">Cargando destino...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500 font-medium">{error}</div>;
  }

  if (!destino) {
    return <div className="text-center py-12 text-muted">Destino no encontrado</div>;
  }

  const itinerario = parseItinerario(destino);
  const secciones = [
    itinerario.etapas.length > 0 && { id: 'itinerario', label: 'Itinerario' },
    destino.salidas?.length > 0 && { id: 'salidas', label: 'Salidas y precios' },
    destino.alojamiento?.length > 0 && { id: 'alojamiento', label: 'Alojamiento' },
    (destino.incluye?.length > 0 || destino.noIncluye?.length > 0) && { id: 'incluye', label: 'Qué incluye' },
    destino.infoUtil?.length > 0 && { id: 'info', label: 'Información útil' },
    destino.faq?.length > 0 && { id: 'faq', label: 'Preguntas frecuentes' },
  ].filter(Boolean);

  return (
    <div className="font-sans antialiased text-tinta bg-papel">
      <Seo
        title={destinoSeoTitle(destino)}
        description={truncar(destino.seoDescription || destino.descripcion)}
        image={
          isLocalImage(destino.imagenBanner)
            ? `${SITE_URL}${destino.imagenBanner}`
            : destino.imagenBanner
        }
        path={destinoPath(destino)}
      />
      {/* HERO */}
      {/* La altura ya no es fija (antes h-[78vh] min-h-[520px]): en
          pantallas mobile bajas, esa altura fija hacía que el título
          terminara tapado por el Navbar fijo cuando el contenido de
          adentro (badge + título + párrafo + botones) necesitaba más
          alto del que el header tenía disponible. Mismo patrón que
          Hero.jsx: el header no fuerza su propia altura, sino que la
          hereda del div de contenido (min-h-screen, en flujo normal),
          y la foto de fondo (position absolute inset-0) se estira para
          cubrir lo que el header termine midiendo. pt-24 en mobile le
          deja lugar al Navbar fijo por arriba; en desktop no hace
          falta porque el Navbar queda transparente sobre la foto. */}
      <header className="relative isolate overflow-hidden">
        <picture>
          {isLocalImage(destino.imagenBanner) && (
            <source srcSet={toWebp(destino.imagenBanner)} type="image/webp" />
          )}
          <img
            src={destino.imagenBanner}
            alt={destino.nombre}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        {/* Mismos valores de degradé que Hero.jsx (Home), verificados ahí
            con muestreo de píxeles reales sobre foto clara y oscura: el
            bloque de texto (badge + título + párrafo + botones) ocupa
            buena parte de la mitad inferior, así que el degradé llega
            bien oscuro (75-90%) en toda esa franja y no solo en el
            borde. Se sacó el resplandor radial que había antes
            (rgba(255,255,255,0.18) cerca de la esquina superior
            izquierda): aclaraba la foto justo donde puede caer el
            badge/título en pantallas bajas, y ya sin él el degradé por sí
            solo da suficiente contraste. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0) 100%)",
          }}
        />
        {/* Refuerzo puntual arriba de todo: el degradé de arriba deja la
            parte superior de la foto casi sin oscurecer a propósito (para
            que la foto respire), pero justo ahí es donde se superpone el
            Navbar fijo con "Destinos" / "Contacto" en blanco. Con
            banners claros (cielos, playas) eso no alcanza para 4.5:1 — se
            midió con muestreo de píxeles reales sobre el banner de Japón
            y daba ~2.7:1. Esta franja extra (~144px, más alta que el
            navbar) es independiente del degradé principal para no
            oscurecer el resto de la foto de arriba. Se dejó con margen
            (85% en vez de 75%, 144px en vez de 112px): con el banner de
            Japón el punto más ajustado daba 4.53 sobre un mínimo de 4.5,
            demasiado justo para confiar en el resto del catálogo, cuyas
            fotos no se pudieron probar acá por una restricción de red
            del entorno (Cloudinary bloqueado), pero sí en producción. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-tinta/85 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 sm:px-6 lg:px-8 pb-14 pt-24 md:pb-20 md:pt-0">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs tracking-[0.18em] text-white/90 uppercase backdrop-blur">
              <FiStar className="text-naranja-tinte" />
              Experiencia seleccionada
            </span>

            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              {destino.nombre}
            </h1>

            {/* Antes acá iba la misma frase genérica en todos los destinos;
                ahora va la descripción propia de cada viaje (texto único por
                página, que es lo que Google premia). */}
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed">
              {destino.descripcion}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-tinta transition hover:bg-naranja-tinte active:scale-[0.98]"
              >
                Reservar ahora
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <a
                href="#itinerario"
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
        <section className="rounded-sm border border-filete bg-white/95 backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4 sm:p-6">
            <article className="rounded-sm border border-filete bg-papel p-4">
              <div className="mb-2 inline-flex rounded-sm bg-naranja-tinte p-2 text-naranja">
                <FiDollarSign />
              </div>
              <p className="text-xs uppercase tracking-wide text-muted">Tarifa base</p>
              <p className="mt-1 text-xl font-semibold text-tinta">
                USD {destino.precio?.toLocaleString()}
              </p>
            </article>

            <article className="rounded-sm border border-filete bg-papel p-4">
              <div className="mb-2 inline-flex rounded-sm bg-naranja-tinte p-2 text-naranja">
                <FiCalendar />
              </div>
              <p className="text-xs uppercase tracking-wide text-muted">Duración</p>
              <p className="mt-1 text-xl font-semibold text-tinta">{destino.duracion}</p>
            </article>

            <article className="rounded-sm border border-filete bg-papel p-4">
              <div className="mb-2 inline-flex rounded-sm bg-naranja-tinte p-2 text-naranja">
                <FiMapPin />
              </div>
              <p className="text-xs uppercase tracking-wide text-muted">Modalidad</p>
              <p className="mt-1 text-xl font-semibold text-tinta">
                {destino.modalidad || 'Personalizable'}
              </p>
            </article>

            <article className="rounded-sm border border-filete bg-papel p-4">
              <div className="mb-2 inline-flex rounded-sm bg-naranja-tinte p-2 text-naranja">
                <FiClock />
              </div>
              <p className="text-xs uppercase tracking-wide text-muted">Planificación</p>
              <p className="mt-1 text-xl font-semibold text-tinta">Asesoría completa</p>
            </article>
          </div>
        </section>

        {/* CONTENIDO PRINCIPAL */}
        <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* CARRUSEL
              self-start: en CSS Grid cada celda se estira por defecto
              hasta el alto de la fila, y la fila la marca la columna de
              texto (mucho más larga). Sin esto, la tarjeta blanca de la
              foto se estiraba hasta ese alto y quedaba un hueco vacío
              debajo de la imagen. */}
          <article className="lg:col-span-7 self-start rounded-sm border border-filete bg-white p-3 sm:p-4">
            <div className="overflow-hidden rounded-sm">
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
                    <picture>
                      {isLocalImage(img) && (
                        <source srcSet={toWebp(img)} type="image/webp" />
                      )}
                      <img
                        src={img}
                        alt={`${destino.nombre} - imagen ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover"
                      />
                    </picture>
                    <button
                      onClick={() => window.open(img, "_blank")}
                      className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-tinta hover:bg-white"
                    >
                      Ver en grande
                    </button>
                  </div>
                ))}
              </Slider>
            </div>
          </article>

          {/* SOBRE ESTE VIAJE + DESTACADOS */}
          <article className="lg:col-span-5 space-y-6">
            <div className="rounded-sm border border-filete bg-white p-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-tinta">
                Sobre este viaje
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-tinta whitespace-pre-line">
                {itinerario.intro || destino.descripcion}
              </p>
            </div>

            {/* "Lo más destacado" es una etiqueta chica tipo eyebrow, no un
                título — va en font-sans (Work Sans) a propósito, para no
                heredar la Fraunces que la regla global le pone a h1/h2/h3. */}
            {destino.highlight?.length > 0 && (
              <div className="rounded-sm border border-filete bg-white p-6">
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted mb-3">
                  Lo más destacado
                </h3>
                <ul className="space-y-2">
                  {destino.highlight.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-tinta">
                      <FiStar className="mt-1 text-naranja shrink-0" />
                      <span className="text-sm sm:text-[15px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </section>

        {/* ============================================================
            EL VIAJE EN DETALLE
            Todo lo que antes era un solo bloque de texto, ordenado en
            secciones. Cada sección aparece SOLO si el destino tiene ese
            dato en destinations.json (ver DATOS-DESTINOS.md), así que se
            pueden ir completando de a poco sin romper nada.
            ============================================================ */}
        <section id="detalle" className="mt-16 scroll-mt-24">
          <p className="uppercase tracking-[0.22em] text-xs text-muted mb-3">
            {destino.duracion} · {destino.modalidad || 'A medida'}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-tinta">
            El viaje en detalle
          </h2>

          {/* Índice de secciones: en mobile se desliza de costado, y queda
              pegado arriba (sticky) mientras se baja por el detalle. */}
          <nav
            aria-label="Secciones del viaje"
            className="sticky top-[72px] z-20 mt-6 -mx-4 sm:mx-0 border-y border-filete bg-papel/95 backdrop-blur"
          >
            <ul className="flex gap-6 overflow-x-auto px-4 sm:px-0 py-3 text-sm font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {secciones.map((s) => (
                <li key={s.id} className="shrink-0">
                  <a href={`#${s.id}`} className="text-tinta hover:text-naranja-texto transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-16">
              {/* ITINERARIO */}
              {itinerario.etapas.length > 0 && (
                <section id="itinerario" className="scroll-mt-36">
                  <h3 className="text-2xl font-semibold text-tinta">
                    {itinerario.tipo === 'dias' ? 'Itinerario día a día' : 'Itinerario por etapas'}
                  </h3>
                  <ol className="mt-8 relative border-l border-filete ml-3">
                    {itinerario.etapas.map((etapa, i) => (
                      <li key={i} className="relative pl-8 pb-8 last:pb-0">
                        <span
                          className="absolute -left-[13px] top-0 grid h-[26px] w-[26px] place-items-center rounded-full border border-naranja bg-papel text-[11px] font-semibold text-tinta"
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        {etapa.etiqueta && (
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-naranja-texto">
                            {etapa.etiqueta}
                          </p>
                        )}
                        <h4 className="mt-1 font-display text-xl text-tinta leading-snug">
                          {etapa.titulo}
                        </h4>
                        {etapa.texto && (
                          <p className="mt-2 text-[15px] leading-relaxed text-tinta/85 whitespace-pre-line">
                            {etapa.texto}
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* SALIDAS Y PRECIOS */}
              {destino.salidas?.length > 0 && (
                <section id="salidas" className="scroll-mt-36">
                  <h3 className="text-2xl font-semibold text-tinta">Salidas y precios</h3>
                  <div className="mt-6 overflow-x-auto rounded-sm border border-filete bg-white">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-papel text-xs uppercase tracking-wide text-muted">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Fecha de salida</th>
                          <th className="px-4 py-3 font-semibold">Precio por persona</th>
                          <th className="px-4 py-3 font-semibold">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {destino.salidas.map((s, i) => (
                          <tr key={i} className="border-t border-filete">
                            <td className="px-4 py-3 font-medium text-tinta">{s.fecha}</td>
                            <td className="px-4 py-3 text-tinta">
                              {s.precio ? `USD ${Number(s.precio).toLocaleString('es-AR')}` : '—'}
                            </td>
                            <td className="px-4 py-3 text-muted">{s.estado || 'Disponible'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {destino.notaPrecios && (
                    <p className="mt-3 text-xs text-muted">{destino.notaPrecios}</p>
                  )}
                </section>
              )}

              {/* ALOJAMIENTO */}
              {destino.alojamiento?.length > 0 && (
                <section id="alojamiento" className="scroll-mt-36">
                  <h3 className="text-2xl font-semibold text-tinta">Alojamiento previsto</h3>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {destino.alojamiento.map((a, i) => (
                      <li key={i} className="rounded-sm border border-filete bg-white p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-naranja-texto">
                          {a.ciudad}{a.noches ? ` · ${a.noches} ${a.noches === 1 ? 'noche' : 'noches'}` : ''}
                        </p>
                        <p className="mt-1 font-display text-lg text-tinta">{a.hotel}</p>
                        {a.categoria && <p className="mt-1 text-sm text-muted">{a.categoria}</p>}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-muted">
                    Hoteles previstos o similares de igual categoría.
                  </p>
                </section>
              )}

              {/* QUÉ INCLUYE / QUÉ NO INCLUYE */}
              {(destino.incluye?.length > 0 || destino.noIncluye?.length > 0) && (
                <section id="incluye" className="scroll-mt-36">
                  <h3 className="text-2xl font-semibold text-tinta">Qué incluye</h3>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {destino.incluye?.length > 0 && (
                      <div className="rounded-sm border border-filete bg-white p-6">
                        <h4 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted mb-3">
                          Incluye
                        </h4>
                        <ul className="space-y-2">
                          {destino.incluye.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-tinta">
                              <FiCheckCircle className="mt-0.5 text-naranja shrink-0" />
                              <span className="text-sm sm:text-[15px]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {destino.noIncluye?.length > 0 && (
                      <div className="rounded-sm border border-filete bg-white p-6">
                        <h4 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted mb-3">
                          No incluye
                        </h4>
                        <ul className="space-y-2">
                          {destino.noIncluye.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-tinta">
                              <FiXCircle className="mt-0.5 text-muted shrink-0" />
                              <span className="text-sm sm:text-[15px]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* INFORMACIÓN ÚTIL (documentación, clima, moneda...) */}
              {destino.infoUtil?.length > 0 && (
                <section id="info" className="scroll-mt-36">
                  <h3 className="text-2xl font-semibold text-tinta">Información útil</h3>
                  <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                    {destino.infoUtil.map((info, i) => (
                      <div key={i} className="rounded-sm border border-filete bg-white p-5">
                        <dt className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                          {info.titulo}
                        </dt>
                        <dd className="mt-2 text-[15px] leading-relaxed text-tinta whitespace-pre-line">
                          {info.texto}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {/* PREGUNTAS FRECUENTES — usa <details>, que abre y cierra sin
                  JavaScript; el texto igual está en la página (Google lo lee). */}
              {destino.faq?.length > 0 && (
                <section id="faq" className="scroll-mt-36">
                  <h3 className="text-2xl font-semibold text-tinta">Preguntas frecuentes</h3>
                  <div className="mt-6 divide-y divide-filete border-y border-filete">
                    {destino.faq.map((f, i) => (
                      <details key={i} className="group py-4">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-tinta [&::-webkit-details-marker]:hidden">
                          {f.pregunta}
                          <FiPlus className="mt-1 shrink-0 text-naranja transition-transform group-open:rotate-45" />
                        </summary>
                        <p className="mt-3 text-[15px] leading-relaxed text-tinta/85 whitespace-pre-line">
                          {f.respuesta}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RESUMEN LATERAL (queda fijo al bajar, en desktop) */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-36 rounded-sm border border-filete bg-white p-6">
                <p className="text-xs uppercase tracking-wide text-muted">Desde</p>
                <p className="mt-1 font-display text-3xl text-tinta">
                  USD {destino.precio?.toLocaleString('es-AR')}
                </p>
                <p className="mt-1 text-xs text-muted">por persona · {destino.duracion}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-tinta px-6 py-3 text-sm font-semibold text-white transition hover:bg-naranja hover:text-tinta"
                  >
                    Solicitar cotización
                    <FiArrowRight />
                  </Link>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola, quiero información sobre el viaje "${destino.nombre}".`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-filete px-6 py-3 text-sm font-medium text-tinta transition hover:bg-naranja-tinte"
                  >
                    <FiMessageCircle />
                    Consultar por WhatsApp
                  </a>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-muted">
                  Agencia de viajes habilitada en Lomas de Zamora, Buenos
                  Aires · Legajo EVT 13190.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mt-12">
          <div className="relative overflow-hidden rounded-sm border border-tinta bg-tinta px-6 py-10 sm:p-10 text-papel">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-10 -bottom-14 h-44 w-44 rounded-full bg-naranja/20 blur-2xl" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="text-2xl sm:text-3xl font-semibold">
                  ¿Listo para vivir esta experiencia?
                </h3>
                <p className="mt-3 text-papel/90">
                  Te ayudamos a personalizar fechas, actividades y tipo de viaje según tu estilo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-papel px-7 py-3 text-sm font-semibold text-tinta transition hover:bg-naranja-tinte active:scale-[0.98]"
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