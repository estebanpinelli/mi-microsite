'use strict';
const express = require('express');
const cors = require('cors');
const { destinos } = require('./data/destinations.js');

const app = express();
const port = 3001;

app.use(cors());

app.get('/destinations', (req, res) => {
  res.json(destinos);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
