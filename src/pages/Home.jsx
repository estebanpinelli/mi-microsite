import Carousel from "../components/Carousel";
import Destinos from "../components/Destinos";
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
      {/* HERO / CAROUSEL */}
      <section className="relative">
        <Carousel />

        {/* Degradado inferior para unir con la siguiente sección */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-papel" />
      </section>

  

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

          <div className="rounded-2xl border border-filete bg-white shadow-sm p-2 md:p-4">
            <Destinos />
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

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;