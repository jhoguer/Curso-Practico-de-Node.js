const TABLA = 'user'


module.exports = (injectedSore) => {
  let store = injectedSore
  if (!store) {
    store = require('../../../store/dummy')
  }
  const list = () => {
    return store.list(TABLA)
  }

  const get = ( id ) => {
    return store.get(TABLA, id)
  }

  return {
    list,
    get
  }
}