const destinos = [
    {
        id: 1,
        nombre: "Destino 1",
        descripcion: "Experiencia en Japón, con un diseño vertical alargado.",
        imagen: "/japon1.jpg",
        destacado: true,
        precio: 2500,          // Nuevo campo
        duracion: "10 días",   // Nuevo campo
        highlight: ["Tour por Tokio", "Visita al Monte Fuji", "Experiencia cultural en Kioto"], // Nuevo campo
        descriptivoCompleto: "Un viaje completo por lo mejor de Japón, combinando modernidad y tradición. Incluye...", // Nuevo campo
        incluye: ["Vuelos internacionales", "Hoteles 4 estrellas", "Desayunos diarios", "Guía turístico"],
        imagenBanner: "/Japonfotos/japonbanner.jpg", // Nueva imagen principal (1920x1080)
        imagenes: [ // Nuevo array con 10 imágenes
            "/Japonfotos/japon1.jpg",
            "/Japonfotos/japon2.jpg",
            "/Japonfotos/japon3.jpg",
            "/Japonfotos/japon4.jpg",
            "/Japonfotos/japon5.jpg",
            "/Japonfotos/japon6.jpg",
            "/Japonfotos/japon7.jpg",
            "/Japonfotos/japon8.jpg",
            "/Japonfotos/japon9.jpg",
           
        ],
    },
    {
        id: 2,
        nombre: "Destino 2",
        descripcion: "Isla Mauricio: Un destino diseñado para quienes buscan experiencias únicas...",
        imagen: "/paris.jpg",
        destacado: true,
        precio: 3200,
        duracion: "8 días",
        highlight: ["Playas de arena blanca", "Buceo en arrecifes", "Cena en catamarán"],
        descriptivoCompleto: "Paraíso tropical con lujosos resorts y actividades acuáticas...",
        incluye: ["Traslados aeropuerto", "Hotel todo incluido", "Actividades acuáticas"],
        imagenBanner: "/tanzania-banner.jpg", // Nueva imagen principal (1920x1080)
        imagenes: [ // Nuevo array con 10 imágenes
            "/tanzania-1.jpg",
            "/tanzania-2.jpg",
            "/tanzania-3.jpg",
            "/tanzania-4.jpg",
            "/tanzania-5.jpg",
            "/tanzania-6.jpg",
            "/tanzania-7.jpg",
            "/tanzania-8.jpg",
            "/tanzania-9.jpg",
            "/tanzania-10.jpg"
        ],
    },
    {
        id: 3,
        nombre: "Destino 3",
        descripcion: "Desde los Alpes hasta las cumbres de Canadá...",
        imagen: "/patagonia.jpg",
        destacado: true,
        precio: 1800,
        duracion: "12 días",
        highlight: ["Trekking en montañas", "Avistamiento de fauna", "Alojamiento en refugios"],
        descriptivoCompleto: "Aventura extrema para amantes de la naturaleza virgen...",
        incluye: ["Equipo de trekking", "Guías especializados", "Seguro de viaje"],
        imagenBanner: "/tanzania-banner.jpg", // Nueva imagen principal (1920x1080)
        imagenes: [ // Nuevo array con 10 imágenes
            "/tanzania-1.jpg",
            "/tanzania-2.jpg",
            "/tanzania-3.jpg",
            "/tanzania-4.jpg",
            "/tanzania-5.jpg",
            "/tanzania-6.jpg",
            "/tanzania-7.jpg",
            "/tanzania-8.jpg",
            "/tanzania-9.jpg",
            "/tanzania-10.jpg"
        ],
    },
    {
        id: 4,
        nombre: "Destino 4",
        descripcion: "Un regalo de experiencias mágicas y únicas...",
        imagen: "/desierto.jpg",
        destacado: true,
        precio: 2750,
        duracion: "9 días",
        highlight: ["Paseo en camello", "Noche en campamento beduino", "Observación de estrellas"],
        descriptivoCompleto: "Vive la auténtica experiencia del desierto con comodidades modernas...",
        incluye: ["Vuelos domésticos", "Cenas temáticas", "Tour privado"],
        imagenBanner: "/tanzania-banner.jpg", // Nueva imagen principal (1920x1080)
        imagenes: [ // Nuevo array con 10 imágenes
            "/tanzania-1.jpg",
            "/tanzania-2.jpg",
            "/tanzania-3.jpg",
            "/tanzania-4.jpg",
            "/tanzania-5.jpg",
            "/tanzania-6.jpg",
            "/tanzania-7.jpg",
            "/tanzania-8.jpg",
            "/tanzania-9.jpg",
            "/tanzania-10.jpg"
        ],
        
    },
    {
        id: 5,
        nombre: "Destino 5",
        descripcion: "Experiencia genérica...",
        imagen: "/desierto.jpg",
        destacado: false,
        precio: 1500,
        duracion: "5 días",
        highlight: ["City tour", "Museos principales"],
        descriptivoCompleto: "Paquete básico para explorar la ciudad...",
        incluye: ["Alojamiento económico", "Transporte público"],
        imagenBanner: "/tanzania-banner.jpg", // Nueva imagen principal (1920x1080)
        imagenes: [ // Nuevo array con 10 imágenes
            "/tanzania-1.jpg",
            "/tanzania-2.jpg",
            "/tanzania-3.jpg",
            "/tanzania-4.jpg",
            "/tanzania-5.jpg",
            "/tanzania-6.jpg",
            "/tanzania-7.jpg",
            "/tanzania-8.jpg",
            "/tanzania-9.jpg",
            "/tanzania-10.jpg"
        ],
    },
    {
        id: 6,
        nombre: "Destino 6",
        descripcion: "Experiencia genérica...",
        imagen: "/desierto.jpg",
        destacado: false,
        precio: 2100,
        duracion: "7 días",
        highlight: ["Visita a sitios históricos"],
        descriptivoCompleto: "Tour cultural por los principales monumentos...",
        incluye: ["Entradas a museos", "Guía local"],
        imagenBanner: "/tanzania-banner.jpg", // Nueva imagen principal (1920x1080)
        imagenes: [ // Nuevo array con 10 imágenes
            "/tanzania-1.jpg",
            "/tanzania-2.jpg",
            "/tanzania-3.jpg",
            "/tanzania-4.jpg",
            "/tanzania-5.jpg",
            "/tanzania-6.jpg",
            "/tanzania-7.jpg",
            "/tanzania-8.jpg",
            "/tanzania-9.jpg",
            "/tanzania-10.jpg"
        ],
    },
    {
        id: 7,
        nombre: "Destino 7",
        descripcion: "Experiencia genérica...",
        imagen: "/desierto.jpg",
        destacado: false,
        precio: 900,
        duracion: "4 días",
        highlight: ["Tour gratuito", "Actividades comunitarias"],
        descriptivoCompleto: "Viaje económico para mochileros...",
        incluye: ["Albergue compartido", "Mapas de la zona"],
        imagenBanner: "/tanzania-banner.jpg", // Nueva imagen principal (1920x1080)
        imagenes: [ // Nuevo array con 10 imágenes
            "/tanzania-1.jpg",
            "/tanzania-2.jpg",
            "/tanzania-3.jpg",
            "/tanzania-4.jpg",
            "/tanzania-5.jpg",
            "/tanzania-6.jpg",
            "/tanzania-7.jpg",
            "/tanzania-8.jpg",
            "/tanzania-9.jpg",
            "/tanzania-10.jpg"
        ],
    }
];

module.exports = { destinos };