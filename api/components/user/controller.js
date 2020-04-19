const { nanoid } = require('nanoid')

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
    return store.get( TABLA, id )
  }

  const upsert = ( data ) => {
    const user = {
      name: data.name
    }

    if (data.id) {
      user.id = data.id
    } else {
      user.id = nanoid()
    }

    return store.upsert( TABLA, user )
  }

  const remove = ( id ) => {
    return store.remove(TABLA, id)
  }

  return {
    list,
    get,
    upsert,
    remove
  }
}