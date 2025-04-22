'use strict';
const express = require('express');
const cors = require('cors');
const { destinos } = require('./data/destinations.js');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de API con filtros
app.get('/api/destinations', (req, res) => {
  try {
    const { home, limit } = req.query;
    let resultados = [...destinos]; // Copiamos el array original

    // Filtro para destinos destacados
    if (home === 'true') {
      resultados = resultados.filter(d => d.destacado);
    }

    // Límite de resultados
    if (limit && !isNaN(limit)) {
      resultados = resultados.slice(0, parseInt(limit));
    }

    console.log('Destinos enviados:', resultados);
    res.json(resultados);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener destinos' });
  }
});

// Arranque del servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});