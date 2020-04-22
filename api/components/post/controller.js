const TABLA = 'post'

module.exports = (injectedStore) => {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/mysql')
  }

  const list = () => {
    return store.list(TABLA)
  }

  const get = (id) => {
    return store.getPost(TABLA, id)
  }

  const upsert = (data, postId) => {
    return store.patch(TABLA, data, postId)
  }

  return {
    list,
    get,
    upsert,
  }
}