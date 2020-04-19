const response = require('../../../network/response')
const Controller = require('./index')


const list = ( req, res ) => {
  Controller.list()
    .then( lista => {
      response.success(req, res, lista, 200)

    })
    .catch( err => response.error(req, res, err.message, 500))
}

const get = ( req, res ) => {
  Controller.get(req.params.id)
    .then( user => {
      response.success(req, res, user, 200)
    })
    .catch( err => response.error(req, res, err.message, 500))
}

const upsert = ( req, res ) => {
  let data = req.body

  Controller.upsert(data)
    .then(user => {
      response.success(req, res, user, 201)
    })
    .catch( err => response.error(req, res, err.message, 500))
}

const remove = ( req, res ) => {
  Controller.remove(req.params.id)
    .then( id => {
      response.success( req, res, id, 200 )
    })
    .catch( err => response.error( req, res, err.message, 500))
}

module.exports = {
  list,
  get,
  upsert,
  remove
}