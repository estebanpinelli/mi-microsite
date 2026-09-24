// El TravelAgency de index.html es fijo porque describe el negocio, que es
// siempre el mismo. Pero los datos de CADA destino (nombre, precio,
// descripción) no existen todavía cuando se genera index.html: el sitio los
// pide por fetch a destinations.json recién cuando el visitante entra a
// /destino/:id. Por eso ese bloque de datos estructurados no puede ir fijo
// en el HTML — hay que insertarlo con JavaScript una vez que ya sabemos qué
// destino se está mostrando. Google sí lee estos bloques agregados así,
// porque su buscador ejecuta el JavaScript de la página antes de leerla
// (a diferencia de otros buscadores más viejos/chicos, que a veces no lo
// hacen — por eso esto complementa al sitemap, no lo reemplaza).

const SCRIPT_ID = "structured-data-dinamico";

// Inserta (o reemplaza si ya había uno) el <script type="application/ld+json">
// que describe la página actual.
export function setPageStructuredData(data) {
  let script = document.getElementById(SCRIPT_ID);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SCRIPT_ID;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

// Se llama al salir de la página (cleanup del useEffect) para que los datos
// de un destino no se queden pegados si el visitante navega a otra ruta
// sin recargar el sitio (es una sola página, así que el <head> no se
// reinicia solo entre rutas).
export function clearPageStructuredData() {
  const script = document.getElementById(SCRIPT_ID);
  if (script) script.remove();
}
