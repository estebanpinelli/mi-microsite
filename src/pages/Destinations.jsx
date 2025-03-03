import { Link } from "react-router-dom";
import destinations from "../data/destinations";

const Destinations = () => {
  return (
    <div>
      <h1>Destinos</h1>
      <ul>
        {destinations.map((dest) => (
          <li key={dest.id}>
            <Link to={`/destination/${dest.id}`}>
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