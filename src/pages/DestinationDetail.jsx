import { useParams } from "react-router-dom";
import destinations from "../data/destinations";

const DestinationDetail = () => {
  const { id } = useParams();
  const destination = destinations.find((dest) => dest.id === id);

  if (!destination) {
    return <h2>Destino no encontrado</h2>;
  }

  return (
    <div>
      <h1>{destination.name}</h1>
      <img src={destination.image} alt={destination.name} width="300" />
      <p>{destination.description}</p>
    </div>
  );
};

export default DestinationDetail;