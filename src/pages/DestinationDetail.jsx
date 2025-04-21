import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const res = await fetch('/api/destinations');
        const data = await res.json();
        setDestinos(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    fetchDestinos();
  }, []);

  const index = parseInt(id, 10);
  const destino = destinos.length > 0 ? destinos[index] : null;

    return (
    <div>
      {destino ? (
        <div>
          <h1>{destino.nombre}</h1>
          <img src={destino.imagen} alt={destino.nombre} width="300" />
          <p>{destino.descripcion}</p>
        </div>
      ) : (<h2>Destino no encontrado</h2>)}
    </div>
  );
};

export default DestinationDetail;