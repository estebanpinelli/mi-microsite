'use strict';
const express = require('express');
const cors = require('cors');
const { destinos } = require('./data/destinations.js');

const app = express();
const port = 3001;

// Middleware
app.use(cors({ origin: 'https://5175-idx-mi-microsite-1744901452102.cluster-23wp6v3w4jhzmwncf7crloq3kw.cloudworkstations.dev' }));
console.log('CORS middleware applied');

// Ruta de API
app.get('/api/destinations', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    console.log('Destinations data before sending:', destinos);
    res.json(destinos);
    console.log('Sending destinations data');
  } catch (error) {
    console.error('Error sending destinations data:', error);
    res.status(500).json({ error: 'Failed to retrieve destinations' });
  }
});

// Arranque del servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});