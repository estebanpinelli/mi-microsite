// Un solo lugar para el dominio y los datos de contacto del sitio. Lo usan
// el script que genera robots.txt/sitemap.xml, el pre-render del build
// (scripts/) y los componentes, para no tener estos datos escritos a mano
// en varios archivos distintos.
//
// OJO: SITE_URL es el dominio "oficial" (canonical) que se le informa a
// Google. Tiene que ser el dominio que realmente está activo en Vercel; el
// otro dominio (viajesexoticoslt.com) conviene configurarlo en Vercel como
// redirección 301 hacia este.
export const SITE_URL = "https://exoticoslt.com";

// Número de WhatsApp en formato internacional, sin "+" ni espacios.
export const WHATSAPP = "5491164498183";
