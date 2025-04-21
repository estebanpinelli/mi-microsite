import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Destinations = () => {
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const res = await fetch('/api/destinations'); // proxy se encarga de redirigir a localhost:3001
        const data = await res.json();
        setDestinos(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    fetchDestinos();
  }, []);

  return (
    <div>
      <h1>Destinos</h1>
      <ul>
        {destinos.map((dest, index) => (
          <li key={index}>
            <Link to={`/destination/${index}`}>
              <img src={dest.image} alt={dest.name} width="100" />
              <h2>{dest.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;
