'use strict';
const express = require('express');
const cors = require('cors');
const { destinos } = require('./data/destinations.js');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para obtener un destino específico por ID
app.get('/api/destinations/:id', (req, res) => {
  try {
    const destinoId = parseInt(req.params.id);
    
    // Validar que el ID sea un número válido
    if (isNaN(destinoId)) {
      return res.status(400).json({ error: 'ID de destino inválido' });
    }

    const destino = destinos.find(d => d.id === destinoId);
    
    if (!destino) {
      return res.status(404).json({ error: 'Destino no encontrado' });
    }

    res.json(destino);

  } catch (error) {
    console.error('Error en /api/destinations/:id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta principal con filtros
app.get('/api/destinations', (req, res) => {
  try {
    const { home, limit } = req.query;
    let resultados = [...destinos];

    if (home === 'true') {
      resultados = resultados.filter(d => d.destacado);
    }

    if (limit && !isNaN(limit)) {
      resultados = resultados.slice(0, parseInt(limit));
    }

    res.json(resultados);

  } catch (error) {
    console.error('Error en /api/destinations:', error);
    res.status(500).json({ error: 'Error al obtener destinos' });
  }
});

// Arranque del servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});