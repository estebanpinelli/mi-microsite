import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { isLocalImage, toWebp } from "../utils/images";

// Etiqueta chica tipo "JAPÓN · 14 DÍAS": toma el primer segmento del
// nombre (antes de ":" o ",", que es como están escritos casi todos los
// nombres en destinations.json) y lo combina con la duración. Si un
// nombre no tiene separador (ej. "China milenaria entre murallas y
// dragones") se usa completo — no rompe, solo queda una etiqueta más
// larga para ese caso puntual.
const buildEyebrow = (destino) => {
  const primerSegmento = destino.nombre.split(/[:,]/)[0].trim();
  const partes = [primerSegmento.toUpperCase()];
  if (destino.duracion) partes.push(destino.duracion.toUpperCase());
  return partes.join(" · ");
};

// Tarjeta de destino, estilo editorial (foto arriba en proporción vertical,
// contenido debajo, separador fino y precio + link). Es el mismo
// componente que se usa en el home (Destinos.jsx) y en la grilla completa
// de /destinos (Destinations.jsx), para que la tarjeta se vea igual en
// todo el sitio.
const DestinoCard = ({ destino }) => {
  return (
    <Link
      to={`/destino/${destino.id}`}
      className="group block text-tinta border border-filete rounded-sm overflow-hidden hover:border-tinta/30 transition-colors duration-300"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-filete">
        <picture>
          {isLocalImage(destino.imagen) && (
            <source srcSet={toWebp(destino.imagen)} type="image/webp" />
          )}
          <img
            src={destino.imagen}
            alt={destino.nombre}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </picture>
      </div>

      <div className="p-5 md:p-6">
        <p className="uppercase tracking-[0.16em] text-xs font-semibold text-naranja-texto mb-2">
          {buildEyebrow(destino)}
        </p>
        <h3 className="font-display text-xl md:text-2xl font-medium text-tinta mb-2 leading-snug">
          {destino.nombre}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-5">
          {destino.descripcion}
        </p>

        <div className="flex items-center justify-between border-t border-filete pt-4">
          {destino.precio ? (
            <span className="text-sm font-semibold text-tinta">
              Desde USD {destino.precio.toLocaleString()}
            </span>
          ) : (
            <span className="text-sm font-semibold text-muted">
              Próximamente
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-naranja-texto">
            Ver itinerario
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DestinoCard;
