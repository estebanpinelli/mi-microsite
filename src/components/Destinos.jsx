import { useState, useEffect } from "react";
import DestinoCard from "./DestinoCard";

const Destinos = () => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/data/destinations.json");
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        const data = await response.json();
        setDestinos(data.filter((d) => d.publicado !== false));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  if (loading) return <p className="text-center mt-8 text-muted">Cargando destinos...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  if (destinos.length === 0) {
    return <p className="text-center mt-8 text-muted">No hay destinos disponibles aún.</p>;
  }

  const destinosVisibles = destinos.slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {destinosVisibles.map((destino) => (
        <DestinoCard key={destino.id} destino={destino} />
      ))}
    </div>
  );
};

export default Destinos;
