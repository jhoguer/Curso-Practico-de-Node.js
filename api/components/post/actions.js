const response = require('../../../network/response')
const Controller = require('./index')



// Functions
const list = (req, res, next) => {
  Controller.list()
  .then(data => {
    response.success(req, res, data, 200)
  })
  .catch(next)
}

const upsert = (req, res, next) => {
  Controller.upsert(req.body)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

module.exports = {
  list,
  upsert,
}