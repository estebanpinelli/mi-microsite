// Pre-render "liviano" de las páginas del sitio. Corre DESPUÉS de vite build
// (ver package.json, script "build").
//
// ¿Qué problema resuelve?
// El sitio es una SPA de React: el servidor siempre devuelve el MISMO
// index.html vacío (<div id="root"></div>) y todo el contenido lo arma
// JavaScript en el navegador. Eso trae dos problemas:
//
//   1) WhatsApp, Facebook, Instagram, LinkedIn y muchos buscadores/IA NO
//      ejecutan JavaScript. Cuando alguien comparte el link de Japón por
//      WhatsApp, la vista previa muestra el título genérico del sitio, no
//      el del viaje. Y esos bots ven una página sin texto.
//   2) Google sí ejecuta JavaScript, pero lo hace en una "segunda pasada"
//      que puede tardar días, y con un sitio nuevo y chico eso frena la
//      indexación.
//
// ¿Qué hace este script?
// Por cada ruta (home, /destinos, /contacto y cada /destino/<slug>) genera
// un archivo .html propio, copia del index.html del build, pero con:
//   - <title>, descripción, canonical y Open Graph DE ESA página
//   - datos estructurados (schema.org) del destino
//   - el texto real de la página (título, itinerario, qué incluye...)
//     dentro de <div id="root">, en HTML simple
//
// Cuando el navegador carga React, React reemplaza ese contenido por la
// página normal (createRoot borra lo que haya adentro de #root). Para que
// el visitante no vea "parpadear" una versión sin estilos, un mini-script
// en el <head> lo oculta si hay JavaScript. Es el MISMO contenido que
// después muestra React, así que no es "cloaking" (mostrarle a Google algo
// distinto que al usuario), que es lo que Google penaliza.
//
// Vercel sirve primero los archivos que existen (dist/destinos.html para
// /destinos, gracias a "cleanUrls" en vercel.json) y solo si no hay
// archivo usa la regla de respaldo hacia la SPA.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SITE_URL } from "../src/config/site.js";
import { ogImage } from "../src/utils/images.js";
import { PAGINAS } from "../src/config/paginas.js";
import { parseItinerario, truncar } from "../src/utils/itinerario.js";
import {
  buildDestinoStructuredData,
  destinoPath,
  destinoSeoTitle,
} from "../src/utils/destinoSeo.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");

const template = readFileSync(join(DIST, "index.html"), "utf-8");
const destinos = JSON.parse(
  readFileSync(join(ROOT, "public/data/destinations.json"), "utf-8")
).filter((d) => d.publicado !== false);

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const absoluta = (src) =>
  typeof src === "string" && src.startsWith("/") ? `${SITE_URL}${src}` : src;

// Párrafos: respeta los saltos de línea del JSON.
const parrafos = (texto = "") =>
  texto
    .split(/\n\s*\n/)
    .map((p) => `<p>${esc(p.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("");

const lista = (items = []) =>
  items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "";

const navDestinos = () =>
  `<nav aria-label="Destinos"><h2>Nuestros viajes</h2><ul>${destinos
    .map(
      (d) =>
        `<li><a href="${destinoPath(d)}">${esc(d.nombre)}</a> · ${esc(d.duracion)}</li>`
    )
    .join("")}</ul></nav>`;

const pie = `<footer><p>Exóticos by Lomasturismo · Agencia de viajes en España 255, Lomas de Zamora, Buenos Aires, Argentina · Legajo EVT 13190</p><p><a href="/contacto">Contacto</a> · <a href="https://wa.me/5491164498183">WhatsApp</a></p></footer>`;

function render({ path, title, description, image, type = "website", jsonLd, contenido }) {
  const url = `${SITE_URL}${path}`;
  const head = [
    `<title data-default="true">${esc(title)}</title>`,
    `<meta data-default="true" name="description" content="${esc(description)}" />`,
    `<link data-default="true" rel="canonical" href="${esc(url)}" />`,
    `<meta data-default="true" property="og:type" content="${type}" />`,
    `<meta data-default="true" property="og:title" content="${esc(title)}" />`,
    `<meta data-default="true" property="og:description" content="${esc(description)}" />`,
    `<meta data-default="true" property="og:url" content="${esc(url)}" />`,
    `<meta data-default="true" property="og:image" content="${esc(absoluta(image))}" />`,
    `<meta data-default="true" property="og:locale" content="es_AR" />`,
    `<meta data-default="true" name="twitter:card" content="summary_large_image" />`,
    // Oculta el contenido estático apenas hay JavaScript (React lo
    // reemplaza enseguida). Sin JavaScript se ve normal.
    `<script>document.documentElement.classList.add("js")</script>`,
    `<style>.js #contenido-estatico{display:none}</style>`,
    jsonLd
      ? `<script type="application/ld+json" id="structured-data-dinamico">${JSON.stringify(
          jsonLd
        ).replace(/</g, "\\u003c")}</script>`
      : "",
  ].join("\n    ");

  let html = template
    // Saca las etiquetas "de fábrica" de index.html (las genéricas)...
    .replace(/\s*<title data-default="true">[\s\S]*?<\/title>/g, "")
    .replace(/\s*<meta data-default="true"[^>]*>/g, "")
    // ...y pone las de esta página.
    .replace("</head>", `    ${head}\n  </head>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root"><div id="contenido-estatico">${contenido}${pie}</div></div>`
    );
  return html;
}

function escribir(rutaArchivo, html) {
  const destino = join(DIST, rutaArchivo);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, html);
}

// --- 0) Respaldo de la SPA ---------------------------------------------
// Copia intacta del index.html del build, para cualquier ruta que no tenga
// su propio .html (vercel.json reescribe a este archivo). Así una URL
// desconocida no muestra el contenido de la home.
writeFileSync(join(DIST, "spa.html"), template);

// --- 1) Páginas fijas ----------------------------------------------------
escribir(
  "index.html",
  render({
    ...PAGINAS.home,
    contenido: `<main><h1>Exóticos: viajes en grupo reducido y privados desde Argentina</h1><p>${esc(
      PAGINAS.home.description
    )}</p>${destinos
      .map(
        (d) =>
          `<article><h2><a href="${destinoPath(d)}">${esc(d.nombre)}</a></h2><p>${esc(
            d.descripcion
          )}</p><p>${esc(d.duracion)} · ${esc(d.modalidad || "")} · Desde USD ${esc(
            d.precio
          )}</p></article>`
      )
      .join("")}</main>`,
  })
);

escribir(
  "destinos.html",
  render({
    ...PAGINAS.destinos,
    contenido: `<main><h1>Nuestros destinos</h1><p>${esc(
      PAGINAS.destinos.description
    )}</p>${navDestinos()}</main>`,
  })
);

escribir(
  "contacto.html",
  render({
    ...PAGINAS.contacto,
    contenido: `<main><h1>Contacto</h1><p>${esc(
      PAGINAS.contacto.description
    )}</p><p>WhatsApp: +54 9 11 6449-8183</p><p>Dirección: España 255, Lomas de Zamora, Buenos Aires, Argentina</p></main>`,
  })
);

// --- 2) Una página por destino -----------------------------------------
for (const d of destinos) {
  const it = parseItinerario(d);
  const secciones = [
    `<h1>${esc(d.nombre)}</h1>`,
    `<p>${esc(d.descripcion)}</p>`,
    `<ul><li>Duración: ${esc(d.duracion)}</li><li>Modalidad: ${esc(
      d.modalidad || "A medida"
    )}</li><li>Desde USD ${esc(d.precio)} por persona</li></ul>`,
    it.intro ? `<h2>Sobre este viaje</h2>${parrafos(it.intro)}` : "",
    d.highlight?.length ? `<h2>Lo más destacado</h2>${lista(d.highlight)}` : "",
    it.etapas.length
      ? `<h2>${it.tipo === "dias" ? "Itinerario día a día" : "Itinerario por etapas"}</h2><ol>${it.etapas
          .map(
            (e) =>
              `<li><h3>${esc([e.etiqueta, e.titulo].filter(Boolean).join(": "))}</h3>${parrafos(
                e.texto
              )}</li>`
          )
          .join("")}</ol>`
      : "",
    d.salidas?.length
      ? `<h2>Salidas y precios</h2><ul>${d.salidas
          .map(
            (s) =>
              `<li>${esc(s.fecha)}${s.precio ? ` · USD ${esc(s.precio)}` : ""}${
                s.estado ? ` · ${esc(s.estado)}` : ""
              }</li>`
          )
          .join("")}</ul>`
      : "",
    d.alojamiento?.length
      ? `<h2>Alojamiento previsto</h2>${lista(
          d.alojamiento.map((a) =>
            [a.ciudad, a.hotel, a.categoria, a.noches ? `${a.noches} noches` : ""]
              .filter(Boolean)
              .join(" · ")
          )
        )}`
      : "",
    d.incluye?.length ? `<h2>Incluye</h2>${lista(d.incluye)}` : "",
    d.noIncluye?.length ? `<h2>No incluye</h2>${lista(d.noIncluye)}` : "",
    d.infoUtil?.length
      ? `<h2>Información útil</h2>${d.infoUtil
          .map((i) => `<h3>${esc(i.titulo)}</h3>${parrafos(i.texto)}`)
          .join("")}`
      : "",
    d.faq?.length
      ? `<h2>Preguntas frecuentes</h2>${d.faq
          .map((f) => `<h3>${esc(f.pregunta)}</h3>${parrafos(f.respuesta)}`)
          .join("")}`
      : "",
    `<p><a href="/contacto">Solicitar cotización</a></p>`,
  ].join("");

  escribir(
    `${destinoPath(d).slice(1)}.html`,
    render({
      path: destinoPath(d),
      title: destinoSeoTitle(d),
      description: truncar(d.seoDescription || d.descripcion),
      image: ogImage(d.imagenBanner),
      jsonLd: buildDestinoStructuredData(d),
      contenido: `<main><nav><a href="/">Inicio</a> › <a href="/destinos">Destinos</a></nav><article>${secciones}</article>${navDestinos()}</main>`,
    })
  );
}

console.log(
  `✓ pre-render: ${3 + destinos.length} páginas con título, descripción y contenido propios`
);
