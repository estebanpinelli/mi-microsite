import React from "react";


const QuienesS = () => {
  return (
    <div className="quienesS-banner">
      {/* Contenedor para los dos logos */}
      <div className="quienesS-logos">
        <img
          src="/logo1.png"
          alt="Logo 1"
          className="quienesS-logo"
        />
        <img
          src="/logo2.png"
          alt="Logo 2"
          className="quienesS-logo"
        />
      </div>

      {/* Contenido principal: título y texto */}
      <div className="quienesS-content">
        <h2>WORLD'S LEADING LUXURY TRAVEL 2024</h2>
        <h3>BEYOND LUXURY</h3>
        <p>
          Vivimos los viajes con corazón de ayer y mirada de hoy, como un artesano
          que trabaja hasta conseguir la perfección en cada proyecto, sin dejar
          nunca de aprender. Tenemos la suerte de dedicarnos a aquello que nos
          apasiona: crear experiencias exclusivas, únicas y a medida a través de
          las cuales seguir descubriendo las maravillas que esconde el mundo.
        </p>
      </div>
    </div>
  );
};

export default QuienesS;