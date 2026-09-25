import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#F7F4EF",
        padding: "20px",
        textAlign: "center",
        fontSize: "14px",
        color: "#6B6558",
        borderTop: "1px solid #E4DFD6",
      }}
    >
      {/* Información de dirección y legajo */}
      <div style={{ marginBottom: "10px" }}>
        <p>
          <strong>Dirección:</strong> Loria 449 (C2587ABC), Lomas de Zamora - Buenos Aires - Argentina
        </p>
        <p>
          <strong>Legajo:</strong> (EVT) 13190 Disp 549
        </p>
      </div>

      {/* Redes sociales */}
      <div style={{ marginBottom: "15px", display: "flex", justifyContent: "center", gap: "15px" }}>
        <a
          href="https://www.facebook.com/profile.php?id=61551028650874"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3b5998" }}
        >
          <FaFacebookF size={28} />
        </a>
        <a
          href="https://www.instagram.com/lomasturismoexoticos/?next=%2F"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#E1306C" }}
        >
          <FaInstagram size={28} />
        </a>
      </div>

      {/* Enlaces de navegación */}
      <div style={{ marginBottom: "10px" }}>
        <a
          href="/contacto"
          style={{
            margin: "0 10px",
            textDecoration: "none",
            color: "#1B1B18",
          }}
        >
          Contacto
        </a>
        <a
          href="/legales"
          style={{
            margin: "0 10px",
            textDecoration: "none",
            color: "#1B1B18",
          }}
        >
          Legales
        </a>
        <a
          href="/condiciones"
          style={{
            margin: "0 10px",
            textDecoration: "none",
            color: "#1B1B18",
          }}
        >
          Condiciones Generales
        </a>
      </div>

      {/* Copyright */}
      <div>
        &copy; {new Date().getFullYear()} Lomas Turismo. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;