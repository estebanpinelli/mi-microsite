import { useState, useEffect } from "react";

const Destinos = () => {
    const [destinos, setDestinos] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
              const response = await fetch('/api/destinations');
              const data = await response.json();
              console.log("Datos recibidos:", data); // 👈 Añade esto
              setDestinations(data);
            } catch (error) {
              console.error('Error:', error);
            }
          };

        fetchDestinations();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white">
            <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">Experiencias Destacadas</h2>
            {destinos.length > 0 && (
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Imagen principal */}
                    <div className="md:w-1/2 h-[60vh] md:h-[120vh]">
                        <img
                            src={destinos[0].imagen}
                            alt={destinos[0].nombre}
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800">
                            {destinos[0].nombre}
                        </h3>
                        <p className="text-gray-600 text-sm">{destinos[0].descripcion}</p>
                    </div>

                    {/* Columnas para el resto de los destinos */}
                    <div className="md:w-1/2 flex flex-col gap-6">
                        {destinos.slice(1).map((destino, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src={destino.imagen}
                                    alt={destino.nombre}
                                    className="w-full h-[250px] object-cover rounded-lg"
                                />
                                <h4 className="text-lg font-semibold text-gray-800 mt-3">
                                    {destino.nombre}
                                </h4>
                                <p className="text-gray-600 text-sm text-center">
                                    {destino.descripcion}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Destinos;