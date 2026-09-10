import React from "react";
import Carousel from "../components/Carousel";
import Destinos from "../components/Destinos";
import Footer from "../components/Footer";
import QuienesS from "../components/QuienesS";
import MundialBanner from "../components/MundialBanner";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      {/* HERO / CAROUSEL */}
      <section className="relative">
        <Carousel />

        {/* Degradado inferior para unir con la siguiente sección */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-slate-50" />
      </section>

  

      {/* DESTINOS */}
      <section className="px-4 md:px-8 lg:px-12 py-14 md:py-16">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-blue-700/80 font-semibold">
                Inspírate y elegí tu próximo viaje
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-2">
                Destinos recomendados
              </h2>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-2 md:p-4">
            <Destinos />
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="px-4 md:px-8 lg:px-12 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 md:px-10 py-6 md:py-8">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-blue-700/80 font-semibold">
              Nuestra esencia
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-2">
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