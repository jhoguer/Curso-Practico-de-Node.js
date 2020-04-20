const TABLA = 'post'

module.exports = (injectedStore) => {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/mysql')
  }

  const list = () => {
    return store.list(TABLA)
  }

  return {
    list,
  }
}