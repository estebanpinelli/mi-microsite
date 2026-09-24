import { useEffect } from "react";
import { SITE_URL } from "../config/site";

// Componente para meta tags dinámicos por página (título de la pestaña,
// descripción, Open Graph). Se usa una vez en cada página: <Seo title=... />.
//
// No usa ninguna librería externa (como react-helmet-async) porque no hace
// falta: desde React 19, si renderizás una etiqueta <title>, <meta> o <link>
// en cualquier componente, React la "levanta" sola hasta el <head> del
// documento, sin importar en qué parte del árbol de componentes esté. Antes
// de React 19 esto no existía (por eso nació react-helmet-async), pero como
// este proyecto ya usa React 19, no tiene sentido sumar una dependencia
// extra para reimplementar algo que React ya trae de fábrica. Menos
// dependencias = menos peso, menos cosas para actualizar con el tiempo.
//
// Ojo: esto SOLO cambia el título/meta después de que React ya cargó y
// renderizó en el navegador. index.html tiene sus propios <title>/<meta>
// "de arranque" (los que ve Google si no ejecuta JavaScript, y los que se
// ven una fracción de segundo antes de que React tome control). Para que
// el preview de WhatsApp/Instagram también cambie por página hace falta
// pre-renderizado o SSR — eso lo dejamos para más adelante, como ya
// habíamos hablado.
//
// Detalle importante que probé antes de dar esto por terminado: React NO
// reemplaza las etiquetas de arranque de index.html, solo agrega las
// nuevas al lado. Eso significa que sin hacer nada más, quedarían DOS
// <title> y DOS de cada <meta> al mismo tiempo en el documento — el título
// de la pestaña termina viéndose bien de casualidad (el navegador usa el
// primero, y el de React queda primero), pero cualquier cosa que lea la
// meta descripción o las og:* (Google, un bot, este mismo código) puede
// terminar leyendo la vieja en vez de la nueva. Por eso las etiquetas
// "de fábrica" en index.html están marcadas con data-default="true", y acá
// abajo las borramos apenas se monta la primera página: así en el momento
// en que React ya está corriendo, queda un solo juego de etiquetas, limpio
// y correcto.
const Seo = ({ title, description, image, path = "", type = "website" }) => {
  const url = `${SITE_URL}${path}`;

  useEffect(() => {
    document
      .querySelectorAll('[data-default="true"]')
      .forEach((el) => el.remove());
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph: lo que leen WhatsApp, Instagram, Facebook, etc. al
          armar la vista previa de un link compartido */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
    </>
  );
};

export default Seo;
