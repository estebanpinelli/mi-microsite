import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

// Hero de Home: un video a pantalla completa (estilo Black Tomato) como
// fondo, en vez de la foto fija anterior. El video está alojado en
// Cloudinary; el póster es el primer cuadro del mismo video (Cloudinary lo
// genera cambiando la extensión a .jpg con so_0), así mientras el video
// carga —o si el navegador no lo reproduce— se ve una imagen coherente en
// vez de un fondo vacío.
const HERO_VIDEO =
  "https://res.cloudinary.com/dtcjnhb0v/video/upload/v1790349907/0925_1_uvsoaf.mp4";
const HERO_POSTER =
  "https://res.cloudinary.com/dtcjnhb0v/video/upload/so_0/v1790349907/0925_1_uvsoaf.jpg";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-tinta">
      {/* muted + playsInline son obligatorios para que el autoplay funcione
          en mobile (iOS/Android bloquean el autoplay con sonido). Es
          decorativo, por eso aria-hidden. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

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
            "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0) 100%)",
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
                (#C1631E) es un tono medio que, como texto chico, nunca
                llega a 4.5:1 sobre una foto clara (4.14 en el mejor caso,
                contra blanco puro) por más oscuro que se ponga el degradé
                — llegar a un contraste seguro ahí exigiría un degradé casi
                negro sólido, lo que taparía la foto. La marca sigue
                presente con la rayita naranja (decorativa, no es texto que
                deba leerse) antes de la etiqueta. */}
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
