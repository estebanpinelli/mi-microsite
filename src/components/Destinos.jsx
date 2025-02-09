const destinos = [
    {
        nombre: "Tokio, Japón",
        descripcion: "Una ciudad vibrante donde la tradición y la tecnología se encuentran.",
        imagen: "/tokio.jpg",
    },
    {
        nombre: "París, Francia",
        descripcion: "La ciudad del amor, famosa por la Torre Eiffel y su gastronomía.",
        imagen: "/paris.jpg",
    },
    {
        nombre: "Patagonia, Argentina",
        descripcion: "Paisajes impresionantes con montañas, glaciares y lagos cristalinos.",
        imagen: "/patagonia.jpg",
    }
];

const Destinos = () => {
    return (
        <div style={{ padding: "60px 20px", textAlign: "center", backgroundColor: "#f8f8f8" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>Nuestros Destinos</h2>
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                {destinos.map((destino, index) => (
                    <div key={index} style={{ 
                        backgroundColor: "white",
                        padding: "15px",
                        borderRadius: "12px",
                        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                        transition: "transform 0.3s",
                        cursor: "pointer"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <img src={destino.imagen} alt={destino.nombre} style={{ 
                            width: "100%", 
                            height: "200px", 
                            objectFit: "cover", 
                            borderRadius: "10px" 
                        }} />
                        <h3 style={{ margin: "15px 0 10px", fontSize: "1.5rem" }}>{destino.nombre}</h3>
                        <p style={{ color: "#555", fontSize: "1rem" }}>{destino.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Destinos;