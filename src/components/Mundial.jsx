import Footer from '../components/Footer';

const paquetes = [
  {
    id: 1,
    titulo: "Fase de grupo 1 partidos",
    imagen: "https://res.cloudinary.com/dtcjnhb0v/image/upload/v1756217964/leo-messi-seleccion-argentina-mundial-qatar-2022-scaled_cavfs3.jpg",
    incluye: [
      "1 Tickets a eleccion en fase de grupos",
      "3 noches de alojamiento",
      "Acompañante en destino",
      "traslados al estadio."
    ],
    precio: "Desde USD 2.890"
  },
  {
    id:2,
    titulo: "Fase de grupo 2 partidos",
    imagen: "https://res.cloudinary.com/dtcjnhb0v/image/upload/v1758790441/descarga_pucrm7.jpg",
    incluye: [
      "2 Tickets a eleccion en fase de grupos",
      "6 noches de alojamiento.",
      "Acompañante en destino",
      "traslados al estadio"
    ],
    precio: "Desde USD 5.490"
  },
  {
    id: 3,
    titulo: "Fase de grupo 3 partidos",
    imagen: "https://res.cloudinary.com/dtcjnhb0v/image/upload/v1756218197/686ce4bf39ba0_eyz0kr.jpg",
    incluye: [
      "3 Tickets fase de grupos.",
      "8 noches de alojamiento.",
      "Acompañante en destino ",
      "traslados al estadio."
    ],
    precio: "Desde USD 7.990"
  },
  {
    id: 4, 
    titulo: "Paquete Final ",
    imagen: "https://res.cloudinary.com/dtcjnhb0v/image/upload/v1758790213/Mundial_final_qqrm0w.jpg",
    incluye: [
      "2 Tickets (1 Semifinal a elección + Final).",
      "8 noches de alojamiento.",
      "vuelo entre ciudades sedes ",
      "traslados al estadio."
    ],
    precio: "Desde USD 23.700"
  },
];

const Mundial = () => {
  return (
    <div className="max-w-full mx-auto bg-white">
      {/* Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="https://res.cloudinary.com/dtcjnhb0v/image/upload/v1756218196/seleccion-argentina-con-trofeo-copa-mundial-fifa-11268_c93h3l.jpg"
          alt="Mundial 2026"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Mundial FIFA 2026
            </h1>
          </div>
        </div>
      </div>

      {/* Cards de paquetes (solo los 3 primeros) */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        {paquetes.slice(0,3).map((paquete) => (
          <div
            key={paquete.id}
            className="relative rounded-2xl shadow-lg overflow-hidden group"
          >
            <img
              src={paquete.imagen}
              alt={paquete.titulo}
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-black/60 flex flex-col p-6 text-white transition-opacity duration-300">
              <h3 className="text-2xl font-bold mb-4">{paquete.titulo}</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {paquete.incluye.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {paquete.precio}
            </div>
          </div>
        ))}
      </div>

      {/* Paquete final destacado */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="relative rounded-2xl shadow-xl overflow-hidden group">
          <img
            src={paquetes[3].imagen}
            alt={paquetes[3].titulo}
            className="w-full h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-black/60 flex flex-col justify-center p-8 text-white transition-opacity duration-300">
            <h3 className="text-3xl font-bold mb-6 text-center">{paquetes[3].titulo}</h3>
            <ul className="list-disc list-inside text-lg space-y-2 max-w-md mx-auto">
              {paquetes[3].incluye.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {paquetes[3].precio}
          </div>
        </div>
      </div>

      {/* Observaciones */}
      <div className="max-w-4xl mx-auto px-6 pb-16 text-gray-800 space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4 text-center">Observaciones</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Categoria de TIKCETS 1 y 2 a eleccion para partidos de ARGENTINA</li>
            <li>Hoteles 4 o 5 estrallas a eleccion SIN desayuno</li>
            <li>Sujeto a disponibilidad.</li>
            <li>No incluye el vuelo internacional</li>
            <li>Fechas y sedes a confirmar luego del sorteo.</li>
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Mundial;
