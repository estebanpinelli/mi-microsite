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

// Las fotos de Cloudinary están subidas en tamaño original (3-4 MB). Cloudinary
// puede entregar una versión achicada al vuelo si se le agregan parámetros a la
// URL, justo después de "/upload/". Las locales (/...) no se tocan.
const transformarCloudinary = (src, transformacion) => {
  if (typeof src !== "string" || !src.includes("res.cloudinary.com")) return src;
  // Si la URL ya trae una transformación (ej. "/upload/w_800/"), se respeta.
  if (/\/upload\/[a-z]{1,3}_[^/]+\/v\d/.test(src)) return src;
  return src.replace("/upload/", `/upload/${transformacion}/`);
};

// Imagen para la vista previa de WhatsApp/Facebook (og:image): 1200x630, JPG
// liviano. WhatsApp no muestra la vista previa si la imagen pesa demasiado
// (con las de 3 MB directamente no aparecía nada).
// La extensión se cambia a .jpg: así Cloudinary la entrega como JPG aunque la
// original sea .avif/.webp (formatos que algunas apps no muestran en la vista
// previa).
export const ogImage = (src) => {
  const t = transformarCloudinary(src, "w_1200,h_630,c_fill,g_auto,q_auto:good");
  return t === src ? src : t.replace(/\.(avif|webp|png|jpe?g)$/i, ".jpg");
};

// Imagen para mostrar en la página: ancho máximo según dónde se use, formato y
// calidad automáticos (WebP/AVIF si el navegador lo soporta).
export const optimizada = (src, ancho = 1600) =>
  transformarCloudinary(src, `w_${ancho},c_limit,q_auto,f_auto`);
