const express = require('express');
const bodyParser = require('body-parser');


const router = require('./network')



const config = require('../config');

const app = express();

app.use(bodyParser.json());

// Rutas
app.use('/', router);

app.listen(config.mysqlService.port, () => {
  console.log('Servicio de mysql excuchando en el puerto', config.mysqlService.port);
})