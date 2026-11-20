// Título y descripción (lo que aparece en Google y en la vista previa de
// WhatsApp) de las páginas fijas del sitio. Están acá, y no escritos
// dentro de cada página, porque los usan dos lugares: el componente <Seo>
// de cada página y el pre-render del build (scripts/prerender.mjs), que
// los escribe directo en el HTML para buscadores y WhatsApp.
//
// Pensados para búsquedas desde Argentina: "desde Argentina", "desde
// Buenos Aires", voseo. Título: ideal hasta ~60 caracteres. Descripción:
// hasta ~155 (Google corta el resto).

export const PAGINAS = {
  home: {
    path: "/",
    title: "Viajes a Japón, China y África desde Argentina | Exóticos",
    description:
      "Agencia de viajes en Lomas de Zamora especializada en viajes en grupo reducido y privados a Japón, China, Sudáfrica, Oceanía y más, con salida desde Buenos Aires.",
    image: "/desierto.jpg",
  },
  destinos: {
    path: "/destinos",
    title: "Viajes en grupo reducido y privados desde Argentina | Exóticos",
    description:
      "Circuitos a Japón, China, Sudáfrica, Australia y Nueva Zelanda, Filipinas e Islas Británicas con salida desde Buenos Aires. Grupos reducidos y viajes privados.",
    image: "/fotobannerborneo.jpg",
  },
  contacto: {
    path: "/contacto",
    title: "Contacto | Exóticos by Lomasturismo",
    description:
      "Contactate con Exóticos para planificar tu próximo viaje privado o en grupo reducido. Te respondemos en 24-48 hs hábiles con una propuesta a medida.",
    image: "/contacto.jpg",
  },
};
