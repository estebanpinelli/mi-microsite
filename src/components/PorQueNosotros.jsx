import { Award, Handshake, Headset, BadgeDollarSign, Compass } from "lucide-react";

// Franja "¿Por qué Exóticos?" de Home (inspirada en el "Why Black Tomato?"):
// título centrado, una rayita decorativa y una fila de beneficios, cada uno
// con un ícono de trazo fino arriba y el texto abajo. Los íconos van en el
// naranja de marca (son decorativos, no texto, así que no les aplica el
// mínimo de contraste de WCAG que obliga a usar naranja-texto). La fila
// usa flex-wrap + justify-center (no grid) para que, en mobile con 2 por
// fila, el quinto beneficio quede centrado y no colgado a la izquierda.
const BENEFICIOS = [
  { icono: Award, titulo: "20 años de experiencia" },
  { icono: Handshake, titulo: "Partners internacionales" },
  { icono: Headset, titulo: "Asistencia en viaje 24 horas" },
  {
    icono: BadgeDollarSign,
    titulo: "Mejor precio",
    texto: "Te garantizamos la mejor calidad-precio del mercado",
  },
  { icono: Compass, titulo: "Viajes a tu medida" },
];

const PorQueNosotros = () => {
  return (
    <section className="px-4 md:px-8 lg:px-12 py-14 md:py-20 bg-white border-b border-filete">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-display uppercase tracking-[0.08em] text-3xl md:text-5xl font-medium text-tinta">
          ¿Por qué Exóticos?
        </h2>
        <span
          className="block h-px w-16 bg-naranja/60 mx-auto mt-6 mb-12 md:mb-14"
          aria-hidden="true"
        />

        <ul className="flex flex-wrap justify-center gap-y-10">
          {BENEFICIOS.map(({ icono: Icono, titulo, texto }) => (
            <li key={titulo} className="flex flex-col items-center w-1/2 md:w-1/3 lg:w-1/5 px-3">
              <Icono
                className="h-12 w-12 md:h-14 md:w-14 text-naranja mb-5"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl text-tinta tracking-wide leading-snug max-w-[14rem]">
                {titulo}
              </p>
              {texto && (
                <p className="text-sm text-muted mt-2 max-w-[14rem] leading-relaxed">
                  {texto}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PorQueNosotros;
