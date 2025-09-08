import React, { useState } from "react";
import { Link } from "react-router-dom";

const MundialBanner = () => {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="flex justify-center mt-8 px-4">
      {!minimized ? (
        <div
          className="relative w-full max-w-4xl h-28 rounded-xl overflow-hidden shadow-lg flex items-center text-white px-6"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dtcjnhb0v/image/upload/v1756217964/leo-messi-seleccion-argentina-mundial-qatar-2022-scaled_cavfs3.jpg')", // 👈 cambia esta URL por la tuya
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay para oscurecer la imagen */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Contenido */}
          <div className="relative flex items-center gap-4 flex-1">
            {/* Logo */}
            <img
              src="https://res.cloudinary.com/dtcjnhb0v/image/upload/v1757347527/thoughts-on-the-official-2026-fifa-world-cup-logo-v0-caz7irbxtn0b1_es5jmm.webp"
              alt="Logo Mundial"
              className="w-20 h-20 rounded-lg object-contain"
            />

            {/* Texto */}
            <div>
              <h3 className="text-lg font-semibold">
                Especial Mundial 2026 Experience
              </h3>
              <p className="text-gray-200 text-xs">
                Paquetes exclusivos con experiencias premium
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="relative flex gap-3 items-center">
            <Link
              to="/mundial"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-all font-medium text-sm shadow hover:shadow-md"
            >
              Descubrir
            </Link>
            <button
              onClick={() => setMinimized(true)}
              className="text-gray-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setMinimized(false)}
          className="bg-black text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-gray-800 group"
        >
          <span>Mundial 2026</span>
        </button>
      )}
    </div>
  );
};

export default MundialBanner;
