import Footer from '../components/Footer';

const paquetes = [
  {
    id: 1,
    titulo: "Team Specific 3 (3 partidos de fase de grupos)",
    imagen: "https://res.cloudinary.com/dtcjnhb0v/image/upload/v1756218196/seleccion-argentina-con-trofeo-copa-mundial-fifa-11268_c93h3l.jpg",
    incluye: [
      "3 Tickets categoría a seleccionar con seguimiento a la Selección Argentina.",
      "14 noches de alojamiento SIN desayuno en hotel categoría a seleccionar.",
      "2 vuelos entre ciudades sedes (traslado hotel/aeropuerto/hotel incluido).",
      "3 traslados hotel/estadio/hotel en servicio regular."
    ],
    precio: "Desde USD 13.200"
  },
  {
    id: 2,
    titulo: "Team Specific 1/2 o 2/3 (2 partidos de fase de grupos)",
    imagen: "https://res.cloudinary.com/dtcjnhb0v/image/upload/v1756217964/leo-messi-seleccion-argentina-mundial-qatar-2022-scaled_cavfs3.jpg",
    incluye: [
      "2 Tickets categoría a seleccionar para 1er+2do partido o 2do+3er partido con Argentina.",
      "8 noches de alojamiento SIN desayuno.",
      "1 vuelo entre ciudades sedes (traslado hotel/aeropuerto/hotel incluido).",
      "2 traslados hotel/estadio/hotel en servicio regular."
    ],
    precio: "Desde USD 7.600"
  },
  {
    id: 3,
    titulo: "Paquete Final Round Series",
    imagen: "https://res.cloudinary.com/dtcjnhb0v/image/upload/v1756218197/686ce4bf39ba0_eyz0kr.jpg",
    incluye: [
      "2 Tickets (1 Semifinal a elección + Final).",
      "8 noches de alojamiento SIN desayuno.",
      "1 vuelo entre ciudades sedes (traslado hotel/aeropuerto/hotel incluido).",
      "2 traslados hotel/estadio/hotel en servicio regular."
    ],
    precio: "Desde USD 20.150"
  }
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

      {/* Cards de paquetes */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        {paquetes.map((paquete) => (
          <div
            key={paquete.id}
            className="relative rounded-2xl shadow-lg overflow-hidden group"
          >
            <img
              src={paquete.imagen}
              alt={paquete.titulo}
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay base con info */}
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 text-white transition-opacity duration-300">
              <h3 className="text-2xl font-bold mb-4">{paquete.titulo}</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {paquete.incluye.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Overlay que aparece al pasar el mouse con el precio */}
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {paquete.precio}
            </div>
          </div>
        ))}
      </div>

      {/* Observaciones + Forma de pago */}
      <div className="max-w-4xl mx-auto px-6 pb-16 text-gray-800 space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4 text-center">Observaciones</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Sujeto a disponibilidad al momento de la reserva en firme.</li>
            <li>Tarifas NETAS por persona en dólares.</li>
            <li>NO INCLUYE DESAYUNO, NI AÉREOS INTERNACIONALES, NI TRANSFER IN-OUT, NI NINGÚN SERVICIO NO MENCIONADO.</li>
            <li>No incluye IVA.</li>
            <li>No incluye gastos de transferencia, administrativos y bancarios (ver en formas de pago).</li>
            <li>No incluye los TAX correspondientes a cada ciudad – a confirmar luego del sorteo.</li>
            <li>Todos los traslados son regulares.</li>
            <li>Fechas y sedes a confirmar luego del sorteo.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4 text-center">Forma de pago</h2>
          <p className="font-semibold">EN DÓLARES</p>
          <ul className="list-disc list-inside ml-4 mb-4">
            <li>Mediante transferencia: adicionando USD 100 de gastos de transferencia al exterior + 2% de gastos adm y bancarios.</li>
            <li>Mediante depósito bancario: adicionando USD 100 de gastos de transferencia al exterior + 2% de gastos adm y bancarios + 1% de comisión del banco en caso de corresponder.</li>
          </ul>

          <p className="font-semibold">EN PESOS</p>
          <p className="ml-4">Tipo de cambio vendedor del Banco Nación + percepción RG 5463 (30%).</p>
          <ul className="list-disc list-inside ml-4 mb-4">
            <li>Mediante transferencia: adicionando USD 100 de gastos de transferencia al exterior + 2% de gastos adm y bancarios.</li>
            <li>Mediante depósito bancario: adicionando USD 100 de gastos de transferencia al exterior + 2% de gastos adm y bancarios + 1% de comisión del banco en caso de corresponder.</li>
          </ul>

          <p className="font-semibold">Calendario de pago</p>
          <ul className="list-disc list-inside ml-4">
            <li>50% al momento de la confirmación.</li>
            <li>50% antes del 15 de marzo de 2026.</li>
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Mundial;
