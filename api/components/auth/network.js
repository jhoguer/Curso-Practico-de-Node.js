const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.post('/login', (req, res) => {
  console.log('passsssssss=======>', req.body.password)
  Controller.login(req.body.username, req.body.password)
    .then( token => {
      response.success(req, res, token, 200)
    })
    .catch( err => {
      console.error(err.message)
      response.error(req, res, err.message, 400)
    })
})

module.exports = router