const express = require('express')
const bodyParser = require('body-parser')


const config = require('../config.js')
const post = require('./components/post/network')
const errors = require('../network/errors')

const app = express()

app.use(bodyParser.json())


// ROUTER
app.use('/api/post', post)

// Debe ser el ultimo middleware
app.use(errors);

app.listen(config.post.port, () => {
  console.log(`Servicios POST escuchando en el puerto ${config.post.port} http://localhost:${config.post.port}/api/post`)
})