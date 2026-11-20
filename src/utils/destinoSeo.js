// Todo lo "SEO" de una página de destino en un solo lugar: URL, título
// para Google y datos estructurados (schema.org). Lo usan la página
// (DestinationDetail.jsx) y el pre-render del build (scripts/prerender.mjs),
// así el HTML que ve Google sin JavaScript y lo que arma React son iguales.

import { SITE_URL } from "../config/site.js";
import { parseItinerario, truncar } from "./itinerario.js";

export const destinoPath = (d) => `/destino/${d.slug || d.id}`;

// Título para la pestaña / resultado de Google. Si el destino tiene
// "seoTitle" en destinations.json se usa ese (pensado para búsquedas desde
// Argentina, ej. "Viaje a Japón en grupo desde Argentina"); si no, el nombre.
export const destinoSeoTitle = (d) => d.seoTitle || `${d.nombre} | Exóticos`;

const absoluta = (src) =>
  typeof src === "string" && src.startsWith("/") ? `${SITE_URL}${src}` : src;

export function buildDestinoStructuredData(d) {
  const url = `${SITE_URL}${destinoPath(d)}`;
  const itinerario = parseItinerario(d);

  const viaje = {
    "@type": "TouristTrip",
    "@id": `${url}#viaje`,
    name: d.nombre,
    description: d.seoDescription || d.descripcion,
    url,
    image: [d.imagenBanner, ...(d.imagenes || [])].filter(Boolean).slice(0, 6).map(absoluta),
    touristType: d.modalidad || undefined,
    provider: { "@id": `${SITE_URL}/#agencia` },
    offers: {
      "@type": "Offer",
      price: d.precio,
      priceCurrency: "USD",
      url,
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "Country", name: "Argentina" },
    },
  };

  if (itinerario.etapas.length) {
    viaje.itinerary = {
      "@type": "ItemList",
      numberOfItems: itinerario.etapas.length,
      itemListElement: itinerario.etapas.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: [e.etiqueta, e.titulo].filter(Boolean).join(": "),
        description: truncar(e.texto, 300) || undefined,
      })),
    };
  }

  const grafo = [
    viaje,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Destinos", item: `${SITE_URL}/destinos` },
        { "@type": "ListItem", position: 3, name: d.nombre, item: url },
      ],
    },
  ];

  if (d.faq?.length) {
    grafo.push({
      "@type": "FAQPage",
      mainEntity: d.faq.map((f) => ({
        "@type": "Question",
        name: f.pregunta,
        acceptedAnswer: { "@type": "Answer", text: f.respuesta },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": grafo };
}
