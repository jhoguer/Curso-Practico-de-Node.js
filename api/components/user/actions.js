const response = require('../../../network/response')

const Controller = require('./index')


const list = ( req, res, next ) => {
  Controller.list()
    .then( lista => {
      response.success(req, res, lista, 200)

    })
    .catch(next)
}

const get = ( req, res, next ) => {
  Controller.get(req.params.id)
    .then( user => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

const upsert = ( req, res, next ) => {
  let data = req.body

  Controller.upsert(data)
    .then(user => {
      response.success(req, res, user, 201)
    })
    .catch(next)
}

const remove = ( req, res, next ) => {
  Controller.remove(req.params.id)
    .then( id => {
      response.success( req, res, id, 200 )
    })
    .catch(next)
}

const follow = (req, res, next) => {
  Controller.follow(req.user.id, req.params.id)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}


module.exports = {
  list,
  get,
  upsert,
  remove,
  follow
}