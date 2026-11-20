// Convierte el texto libre de "descriptivoCompleto" (destinations.json) en
// un itinerario estructurado: una introducción + una lista de etapas, cada
// una con título y texto. Así la página del destino puede mostrarlo como
// una línea de tiempo en vez de un bloque de texto corrido.
//
// Entiende los dos formatos que ya hay en destinations.json:
//
//   1) Día a día (ej. Japón):
//        Día 1: Salida de Buenos Aires hacia Tokio
//        Texto del día...
//
//   2) Por ciudad / etapa, con el título en MAYÚSCULAS (ej. Sudáfrica):
//        CIUDAD DEL CABO
//        Texto de la etapa...
//
// Cualquier párrafo que no empiece con "Día N" ni con un título en
// mayúsculas se toma como introducción.
//
// Si un destino tiene el campo "itinerario" (lista de {titulo, texto}) en
// destinations.json, se usa ese directamente y se ignora este parser.
//
// Este archivo no usa nada del navegador: lo usa tanto la página
// (DestinationDetail.jsx) como el script de pre-render del build
// (scripts/prerender.mjs).

// "Día 1: ...", "Día 3 - ...", "Días 4 al 6: ...", "Días 7 y 8 ..."
const RE_DIA = /^(D[ií]as?\s+\d+(?:\s*(?:-|–|al|y|a)\s*\d+)?)\s*[:.\-–]?\s*(.*)$/i;

const esTituloMayusculas = (linea) => {
  const letras = linea.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, "");
  return (
    letras.length >= 3 &&
    linea.length <= 70 &&
    letras === letras.toUpperCase()
  );
};

export function parseItinerario(destino) {
  if (Array.isArray(destino?.itinerario) && destino.itinerario.length) {
    return {
      intro: destino.itinerarioIntro || "",
      tipo: "manual",
      etapas: destino.itinerario.map((e) => ({
        etiqueta: e.etiqueta || "",
        titulo: e.titulo || "",
        texto: e.texto || "",
      })),
    };
  }

  const texto = (destino?.descriptivoCompleto || "").trim();
  if (!texto || texto === "-") return { intro: "", tipo: "vacio", etapas: [] };

  const bloques = texto
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const intro = [];
  const etapas = [];
  let tipo = "texto";

  for (const bloque of bloques) {
    const [primera, ...resto] = bloque.split("\n");
    const linea = primera.trim();
    const cuerpo = resto.join("\n").trim();

    const dia = linea.match(RE_DIA);
    if (dia) {
      tipo = "dias";
      etapas.push({
        etiqueta: dia[1].replace(/^d[ií]a/i, "Día"),
        titulo: dia[2].trim(),
        texto: cuerpo,
      });
      continue;
    }

    if (esTituloMayusculas(linea) && cuerpo) {
      if (tipo !== "dias") tipo = "etapas";
      etapas.push({ etiqueta: "", titulo: aTitulo(linea), texto: cuerpo });
      continue;
    }

    // Párrafo suelto: si todavía no empezó el itinerario es introducción;
    // si ya empezó, se suma al texto de la última etapa.
    if (etapas.length === 0) intro.push(bloque);
    else etapas[etapas.length - 1].texto += `\n\n${bloque}`;
  }

  return { intro: intro.join("\n\n"), tipo, etapas };
}

// "CIUDAD DEL CABO" -> "Ciudad del Cabo". Las palabras chicas (de, del, y,
// por, el...) quedan en minúscula salvo que sean la primera.
const MINUSCULAS = new Set(["de", "del", "la", "las", "el", "los", "y", "e", "por", "en", "a", "al"]);
function aTitulo(linea) {
  return linea
    .toLowerCase()
    .split(/\s+/)
    .map((p, i) =>
      i > 0 && MINUSCULAS.has(p) ? p : p.charAt(0).toUpperCase() + p.slice(1)
    )
    .join(" ")
    // siglas tipo "XI'AN" -> "Xi'an" queda bien; "ST LUCIA" -> "St Lucia"
    .replace(/'(\w)/g, (m) => m.toLowerCase());
}

// Texto corto para meta descripción (Google corta en ~155 caracteres).
export const truncar = (texto, max = 155) => {
  if (!texto) return texto;
  const limpio = texto.replace(/\s+/g, " ").trim();
  if (limpio.length <= max) return limpio;
  return limpio.slice(0, max - 1).trimEnd() + "…";
};
