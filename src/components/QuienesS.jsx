import React from "react";

const QuienesS = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50">
      {/* Decoración de fondo sutil */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-100/40 blur-3xl" />

      <div className="relative grid lg:grid-cols-[260px_1fr] gap-10 p-8 md:p-12 lg:p-14">
        {/* Columna logos */}
     <aside className="flex lg:flex-col items-center lg:items-start justify-center gap-6 lg:gap-8">
  <div className="group rounded-2xl border border-slate-300 bg-slate-900 px-6 py-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
    <img
      src="/Logo1.png"
      alt="Logo Lomas Turismo"
      className="h-auto w-[140px] md:w-[160px] object-contain"
    />
  </div>

  <div className="group rounded-2xl border border-slate-300 bg-slate-900 px-6 py-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
    <img
      src="/Logo2.png"
      alt="Logo marca especializada en viajes"
      className="h-auto w-[140px] md:w-[160px] object-contain"
    />
  </div>
</aside>

        {/* Contenido */}
        <article className="max-w-3xl">
          <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-blue-700/80 font-semibold mb-4">
            Más allá del viaje
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-6">
            La mirada curiosa, <br className="hidden md:block" />
            el alma viajera.
          </h2>

          <div className="h-px w-24 bg-gradient-to-r from-blue-600/70 to-transparent mb-6" />

          <p className="text-slate-700 text-base md:text-lg leading-relaxed">
            Formamos parte de <span className="font-semibold text-slate-900">Lomas Turismo</span>, una
            agencia con más de 20 años de experiencia, y desde este espacio me especializo
            en crear viajes distintos: auténticos, exóticos y con alma. Diseño propuestas a
            medida para quienes no se conforman con lo típico, sino que buscan descubrir el
            mundo con ojos nuevos. Como un artesano, pienso cada itinerario con dedicación,
            combinando lo mejor de la experiencia clásica con una mirada fresca y personal.
          </p>
        </article>
      </div>
    </section>
  );
};

export default QuienesS;