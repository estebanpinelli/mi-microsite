import { FiArrowRight } from "react-icons/fi";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
import { SITE_URL } from "../config/site";

const Contact = () => {
  return (
    <>
      <Seo
        title="Contacto | Exóticos"
        description="Contactate con Exóticos para planificar tu próximo viaje privado o en grupo reducido. Te respondemos en 24-48 hs hábiles con una propuesta a medida."
        image={`${SITE_URL}/contacto.jpg`}
        path="/contacto"
      />
      {/* Sección de contacto con imagen de fondo */}
      <div className="bg-contacto relative h-[75vh] min-h-[520px] bg-cover bg-center flex flex-col items-center justify-center text-white">
        {/* Fondo oscuro semi-transparente para mejorar la legibilidad */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Contenido centrado */}
        <div className="relative text-center px-6">
          <p className="uppercase tracking-[0.28em] text-xs md:text-sm font-semibold text-white/80 mb-5">
            Estamos para ayudarte
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold">
            Contacta con nosotros
          </h1>

          {/* Vías de contacto: antes acá adentro se repetía el botón
              flotante de WhatsApp (BotonWhats, que es position:fixed y ya
              se muestra en TODAS las páginas desde el Navbar) — quedaba
              duplicado exactamente en el mismo lugar de la pantalla, sin
              cumplir ninguna función acá. Se reemplaza por dos accesos
              directos reales: WhatsApp (mismo número, como link inline) y
              el mail, ambos con el mismo estilo sobrio de botón-pastilla
              que ya usamos en el hero del home y en /destinos. */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="https://wa.me/5491166194844?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-tinta px-6 py-3 rounded-full font-medium hover:bg-naranja-tinte transition-all duration-300 hover:-translate-y-0.5"
            >
              Escribinos por WhatsApp
              <FiArrowRight className="text-base" />
            </a>
            <a
              href="mailto:exoticos@lomasturismo.com"
              className="inline-flex items-center gap-2 border border-white/50 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
            >
              exoticos@lomasturismo.com
            </a>
          </div>
        </div>
      </div>

      {/* Sección de formulario */}
      <div className="bg-papel text-tinta py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-center uppercase tracking-[0.22em] text-xs text-muted mb-3">
            Formulario de contacto
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-center text-tinta">
            Contáctanos
          </h2>

          <p className="text-center mt-4 mb-12 md:mb-16 text-base md:text-lg max-w-2xl mx-auto text-muted">
            Si tienes alguna consulta, rellena el formulario a continuación.
          </p>

          <ContactForm />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;