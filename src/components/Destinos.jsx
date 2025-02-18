const destinos = [
    {
        nombre: "Japon1",
        descripcion: "Experiencia en Japón, con un diseño vertical alargado.",
        imagen: "/japon1.jpg"
    },
    {
        nombre: "El secreto mejor guardado del Índico",
        descripcion: "Isla Mauricio: Un destino diseñado para quienes buscan experiencias únicas, donde cada rincón revela aventuras exclusivas y momentos de relajación absoluta.",
        imagen: "/paris.jpg"
    },
    {
        nombre: "¿Qué es para ti la montaña?",
        descripcion: "Desde los Alpes hasta las cumbres de Canadá, cada detalle está pensado para ofrecerte una experiencia única, donde la exclusividad y la aventura se encuentran en cada instante del recorrido.",
        imagen: "/patagonia.jpg"
    },
    {
        nombre: "Tarjeta Regalo NUBA",
        descripcion: "Un regalo de experiencias mágicas y únicas, listas para ser vividas en cualquier rincón del mundo.",
        imagen: "/desierto.jpg"
    }
];

const Destinos = () => {
    return (
        <div style={{ padding: "40px 20px", backgroundColor: "white", maxWidth: "1200px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "30px", color: "#333" }}>Tu próximo viaje</h2>
            <div style={{ display: "flex", gap: "20px" }}>
                {/* Foto de la izquierda (Japon1) alargada verticalmente */}
                <div style={{ flex: "0 0 50%", height: "120vh" }}>
                    <img 
                        src={destinos[0].imagen} 
                        alt={destinos[0].nombre} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    <h3 style={{ marginTop: "15px", fontSize: "1.8rem", color: "#333" }}>{destinos[0].nombre}</h3>
                    <p style={{ color: "#555", fontSize: "1rem" }}>{destinos[0].descripcion}</p>
                </div>
                {/* Imágenes de la derecha en columna */}
                <div style={{ flex: "0 0 50%", display: "flex", flexDirection: "column", gap: "20px" }}>
                    {destinos.slice(1).map((destino, index) => (
                        <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <img 
                                src={destino.imagen} 
                                alt={destino.nombre} 
                                style={{ width: "100%", height: "250px", objectFit: "cover" }} 
                            />
                            <h4 style={{ fontSize: "1.4rem", color: "#333", marginTop: "10px" }}>{destino.nombre}</h4>
                            <p style={{ fontSize: "1rem", color: "#555", textAlign: "center" }}>{destino.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Destinos;