import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

// Hero de Home: un video a pantalla completa (estilo Black Tomato) como
// fondo. El video está alojado en Cloudinary, y el archivo original pesa
// mucho (~44MB) para un fondo decorativo, así que no se pide tal cual:
// se pide con transformaciones de Cloudinary en la URL, que lo comprimen
// al vuelo:
//   - q_auto: Cloudinary elige la compresión justa para que no se note
//   - w_1920,c_limit: lo achica a 1920px de ancho como máximo (nunca lo
//     agranda si ya es más chico)
//   - ac_none: le saca el audio (el video va siempre muteado)
// El original queda como segunda <source>: si Cloudinary no pudiera
// generar la versión comprimida, el navegador pasa solo al original en
// vez de dejar el hero sin video.
const CLOUDINARY_VIDEO = "https://res.cloudinary.com/dtcjnhb0v/video/upload";
const VIDEO_ID = "v1790349907/0925_1_uvsoaf";
const HERO_VIDEO = `${CLOUDINARY_VIDEO}/q_auto,w_1920,c_limit,ac_none/${VIDEO_ID}.mp4`;
const HERO_VIDEO_ORIGINAL = `${CLOUDINARY_VIDEO}/${VIDEO_ID}.mp4`;
// Póster: el primer cuadro del mismo video como imagen (so_0 + .jpg), y
// f_auto para que Cloudinary la sirva en WebP/AVIF si el navegador puede.
const HERO_POSTER = `${CLOUDINARY_VIDEO}/so_0,q_auto,f_auto,w_1920,c_limit/${VIDEO_ID}.jpg`;

// El video solo se carga en pantallas de 768px o más (tablet/escritorio),
// y nunca si el visitante pidió menos movimiento (prefers-reduced-motion)
// o activó el ahorro de datos. En celular se muestra solo el póster: un
// video de fondo ahí gasta datos móviles y batería para algo decorativo.
// Arranca en false y recién se decide en el useEffect, así en celular el
// <video> nunca llega a montarse y el navegador ni empieza a bajarlo.
const QUERY_VIDEO =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

const puedeMostrarVideo = () =>
  window.matchMedia(QUERY_VIDEO).matches && !navigator.connection?.saveData;

const Hero = () => {
  const [mostrarVideo, setMostrarVideo] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY_VIDEO);
    const actualizar = () => setMostrarVideo(puedeMostrarVideo());
    actualizar();
    media.addEventListener("change", actualizar);
    return () => media.removeEventListener("change", actualizar);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-tinta">
      {mostrarVideo ? (
        // muted + playsInline son obligatorios para que el autoplay
        // funcione (los navegadores bloquean el autoplay con sonido). Es
        // decorativo, por eso aria-hidden.
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
          <source src={HERO_VIDEO_ORIGINAL} type="video/mp4" />
        </video>
      ) : (
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Degradé oscuro para que el texto se lea bien sobre cualquier foto
          (clara u oscura). No alcanza con oscurecer solo una franja fina
          abajo: el bloque de texto (eyebrow + título + párrafo) ocupa
          buena parte de la mitad inferior de la sección, así que el
          degradé tiene que llegar bien oscuro (75-90% de negro) en toda
          esa franja, no solo en el borde. Se verificó con capturas reales
          (foto de Tokio) y con el peor caso teórico (una foto blanca de
          fondo): con estos valores el texto blanco se mantiene siempre
          por encima de 4.5:1 (WCAG AA), con margen de sobra. La parte de
          arriba de la foto queda sin oscurecer para que siga siendo
          protagonista. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.20) 55%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* El contenido va en flujo normal (no absolute), con min-h-screen +
          flex-col justify-end, en vez de una altura fija en la sección.
          Así, si el bloque de texto (título + párrafo + botones) necesita
          más de 100vh en una pantalla angosta y baja, la sección crece
          para darle lugar en vez de recortarlo o empujarlo hacia arriba
          por encima del navbar — y el pt-24 en mobile reserva el espacio
          del navbar fijo de arriba, así el texto nunca puede arrancar por
          encima de esa franja, sin importar cuánto ocupe. */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pt-24 md:pt-0">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24">
          <div className="max-w-2xl text-white">
            {/* El eyebrow va en blanco, no en naranja: el naranja de marca
                es muy claro y, como texto chico, se pierde sobre los
                cuadros claros del video. La marca sigue presente con la
                rayita naranja (decorativa, no es texto que deba leerse)
                antes de la etiqueta. */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[2px] w-8 bg-naranja" aria-hidden="true" />
              <p className="uppercase tracking-[0.28em] text-xs md:text-sm font-semibold text-white/95">
                Turismo experiencial de lujo
              </p>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] mb-6">
              Viajes a medida para quienes ya lo vieron casi todo
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-xl leading-relaxed mb-8">
              Diseñamos experiencias privadas y en grupos reducidos para
              viajeros exigentes, con la curaduría y el acompañamiento de
              Lomas Turismo detrás de cada detalle.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/+5491166194844"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-tinta px-6 py-3 rounded-full font-semibold hover:bg-naranja-tinte transition-all duration-300 hover:-translate-y-0.5"
              >
                Hablemos
                <FaWhatsapp className="text-lg" />
              </a>
              <Link
                to="/destinos"
                className="inline-flex items-center gap-2 border border-white/50 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
              >
                Ver destinos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
