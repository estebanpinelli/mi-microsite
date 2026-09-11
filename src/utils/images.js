// Helpers para servir imágenes locales en WebP con fallback automático a JPG/PNG.
//
// Por qué existe esto: las imágenes que vienen de Cloudinary (URLs que empiezan
// con "http") ya las sirve optimizadas el propio Cloudinary, así que no las tocamos.
// Las imágenes locales (rutas que empiezan con "/", servidas desde public/) las
// convertimos a WebP para que pesen menos, pero mantenemos el archivo original
// (jpg/png) como respaldo por si el navegador del visitante no soporta WebP.

export const isLocalImage = (src) =>
  typeof src === "string" && src.startsWith("/");

export const toWebp = (src) => src.replace(/\.(jpe?g|png)$/i, ".webp");
