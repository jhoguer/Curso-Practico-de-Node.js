const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config')

const router = require('./network')
//const config = require('../config');


const app = express();

app.use(bodyParser.json());

// Rutas
app.use('/', router);

app.listen(config.cacheService.port, () => {
  console.log('Servicio de cache Redis excuchando en el puerto', config.cacheService.port);
})