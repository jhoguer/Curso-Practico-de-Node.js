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

const upsert = ( req, res, next) => {
  let data = req.body
  console.log('¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿')
  data.flag = 'create'/////
  console.log('Pillando el req.body------->', data)

  Controller.upsert(data)
    .then(user => {
      response.success(req, res, user, 201)
    })
    .catch(next)
}

const update = ( req, res, next ) => {
  let data = req.body
  console.log('¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿')
  data.flag = 'update'/////
  console.log('Pillando el req.body------->', data)

  Controller.upsert(data)
    .then(user => {
      response.success(req, res, user, 200)
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

const following = (req, res, next) => {
  return Controller.following(req.params.id)
    .then( data => {
      return response.success(req, res, data, 200)
    })
    .catch(next)
}

module.exports = {
  list,
  get,
  upsert,
  update,
  remove,
  follow,
  following,
}