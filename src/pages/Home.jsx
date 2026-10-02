import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import Destinos from "../components/Destinos";
import PorQueNosotros from "../components/PorQueNosotros";
import Footer from "../components/Footer";
import QuienesS from "../components/QuienesS";
import Seo from "../components/Seo";
import { SITE_URL } from "../config/site";

const Home = () => {
  return (
    <div className="min-h-screen bg-papel text-tinta antialiased">
      <Seo
        title="Exóticos | Viajes privados y de lujo a Japón, Islandia, Egipto, China, Bali y África"
        description="Exóticos diseña viajes privados y en grupos reducidos a destinos como Japón, Islandia, Egipto, China, Bali y safaris africanos, para viajeros que buscan experiencias auténticas y a medida."
        image={`${SITE_URL}/desierto.jpg`}
        path="/"
      />
      {/* HERO */}
      <Hero />
      {/* DESTINOS */}
      <section className="px-4 md:px-8 lg:px-12 py-14 md:py-16">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted font-semibold">
                Inspírate y elegí tu próximo viaje
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-tinta mt-2">
                Destinos recomendados
              </h2>
            </div>
          </div>

          <Destinos />

          {/* Botón a la página de destinos, centrado debajo de las tarjetas.
              Va en tinta (oscuro) con texto blanco y no en naranja: el
              naranja de marca es claro y con texto blanco encima no se
              lee bien. */}
          <div className="flex justify-center pt-4">
            <Link
              to="/destinos"
              className="inline-flex items-center gap-2 bg-tinta text-white px-8 py-3.5 rounded-full font-semibold shadow-sm hover:bg-naranja hover:text-tinta transition-all duration-300 hover:-translate-y-0.5"
            >
              Todos nuestros destinos
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="px-4 md:px-8 lg:px-12 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-filete bg-white shadow-sm">
          <div className="border-b border-filete px-6 md:px-10 py-6 md:py-8">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted font-semibold">
              Nuestra esencia
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-tinta mt-2">
              Quiénes somos
            </h2>
          </div>

          <div className="px-6 md:px-10 py-8 md:py-10">
            <QuienesS />
          </div>
        </div>
      </section>

      {/* POR QUÉ EXÓTICOS */}
      <PorQueNosotros />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;