// Genera public/robots.txt y public/sitemap.xml automáticamente a partir
// de public/data/destinations.json, en vez de mantenerlos a mano.
//
// ¿Por qué? El sitemap tiene que listar una URL por cada destino
// (/destino/1, /destino/2, ...). Si eso se escribe a mano, el día que
// agregues o saques un destino de destinations.json te vas a olvidar de
// tocar el sitemap tarde o temprano, y vas a terminar con URLs rotas
// listadas (destinos que ya no existen) o destinos nuevos que Google ni
// se entera que existen. Al generarlo en cada build a partir del MISMO
// JSON que ya usa el sitio para mostrar los destinos, sitemap.xml queda
// siempre sincronizado solo, sin que nadie tenga que acordarse de nada.
//
// Se corre automáticamente antes de cada "npm run build" (ver package.json,
// script "build"). También se puede correr a mano con:
//   npm run seo:generate

import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SITE_URL } from "../src/config/site.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DESTINATIONS_PATH = join(ROOT, "public/data/destinations.json");
const ROBOTS_PATH = join(ROOT, "public/robots.txt");
const SITEMAP_PATH = join(ROOT, "public/sitemap.xml");

const today = new Date().toISOString().split("T")[0];

// --- 1) robots.txt -----------------------------------------------------
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
writeFileSync(ROBOTS_PATH, robotsTxt);
console.log(`✓ public/robots.txt generado`);

// --- 2) sitemap.xml ------------------------------------------------------
const destinations = JSON.parse(readFileSync(DESTINATIONS_PATH, "utf-8"));

// El destino "PROXIMAMENTE NUEVOS DESTINOS" (publicado: false) es el mismo
// que ya ocultamos de las páginas de Destinos — tampoco tiene sentido que
// Google lo indexe si un visitante no puede verlo navegando el sitio.
const destinosPublicados = destinations.filter((d) => d.publicado !== false);

// Rutas fijas del sitio (las que no dependen de destinations.json)
const rutasFijas = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/destinos", changefreq: "weekly", priority: "0.9" },
  { loc: "/contacto", changefreq: "monthly", priority: "0.5" },
];

const rutasDestinos = destinosPublicados.map((d) => ({
  loc: `/destino/${d.id}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const todasLasRutas = [...rutasFijas, ...rutasDestinos];

const urlEntries = todasLasRutas
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(SITEMAP_PATH, sitemapXml);
console.log(
  `✓ public/sitemap.xml generado con ${todasLasRutas.length} URLs (${rutasFijas.length} fijas + ${rutasDestinos.length} destinos publicados)`
);
