'use strict';
const express = require('express');
const cors = require('cors');
const { destinos } = require('./data/destinations.js');

const app = express();
const port = 3001;

app.use(cors()); 
console.log('CORS middleware applied');

app.get('/destinations', (req, res) => {
  res.json(destinos); 
  console.log('Sending destinations data');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
