import React from "react";


const QuienesS = () => {
  return (
    <div className="quienesS-banner ">
      {/* Contenedor para los dos logos */}
      <div className="quienesS-logos  ">
        <img
          src="/Logo.jpg"
          alt="Logo 1"
          className="quienesS-logo"
        />
        <img
          src="/Logo.jpg"
          alt="Logo 2"
          className="quienesS-logo"
        />
      </div>

      {/* Contenido principal: título y texto */}
      <div className="quienesS-content">
        <h3>MÁS ALLÁ DEL VIAJE</h3>
        <h2>La mirada curiosa, el alma viajera.</h2>
        <p>
          Formamos parte de Lomas Turismo, una agencia con más de 20 años de experiencia, y desde este espacio me especializo en crear viajes distintos: auténticos, exóticos y con alma. Diseños a medida para quienes no se conforman con lo típico, sino que buscan descubrir el mundo con ojos nuevos. Como un artesano, pienso cada itinerario con dedicación, combinando lo mejor de la experiencia clásica con una mirada fresca y personal.
        </p>
      </div>
    </div>
  );
};

export default QuienesS;