const auth = require('../../../auth')

module.exports = checkAuth = (action) => {
  const middleware = (req, res, next) => {
    //console.log('Se imprime el req en secure->', req.headers)
    switch(action) {
      case 'update':
        const owner = req.body.id
        auth.check.own(req, owner)
        next()
        break
      
      case 'post':
        auth.check.logged(req)
        next()
        break

      case 'logged':
        auth.check.logged(req)
        next()
        break

      default:
        next()
    }
  }

  return middleware
}