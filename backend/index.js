'use strict';
const express = require('express');
const cors = require('cors');
const { destinos } = require('./data/destinations.js');

const app = express();
const port = 3001;

// Middleware
app.use(cors()); 
console.log('CORS middleware applied');

// Ruta de API
app.get('/api/destinations', (req, res) => {
  res.json(destinos); 
  console.log('Sending destinations data');
});

// Arranque del servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});