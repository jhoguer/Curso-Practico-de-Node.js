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

const get = (req, res, next) => {
  const id = req.params.id
  Controller.get(id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

const upsert = (req, res, next) => {
  req.body.flag = 'create'
  Controller.upsert(req.body)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

const patch = (req, res, next) => {
  if (req.body.text) {
    const postNewText = {
      text: req.body.text
    }
    const postId = req.params.id
    req.body.flag = 'update'
    Controller.upsert(postNewText, postId)
      .then(post => {
        response.success(req, res, post, 200)
      })
      .catch(next)
  }
}

module.exports = {
  list,
  get,
  upsert,
  patch,
}