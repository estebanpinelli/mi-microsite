import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import BotonWhats from "../components/BotonWhats";

const Contact = () => {
  return (
    <>
      <Navbar />

      {/* Sección de contacto con imagen de fondo */}
      <div
        className="relative h-[75vh] bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: "url('/contacto.jpg')" }}
      >
        {/* Fondo oscuro semi-transparente para mejorar la legibilidad */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Contenido centrado */}
        <div className="relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Contacta con nosotros</h1>
          
          {/* Íconos de contacto */}
          <div className="flex flex-col items-center mt-6 space-y-4">
            {/* Botón de WhatsApp */}
            <div className="w-30 h-30 flex items-center justify-center rounded-full shadow-lg">
              <BotonWhats />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2  px-4 py-2 rounded-lg shadow-lg">
              <span className="text-white -700 text-lg">
                exoticos@lomasturismo.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de formulario */}
      <div className="container mx-auto p-8 min-h-screen">
        <h1 className="text-5xl font-bold text-center mt-16">Contáctanos</h1>
        <p className="text-center mt-6 mb-12 text-xl">
          Si tienes alguna consulta, rellena el formulario a continuación.
        </p>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default Contact;