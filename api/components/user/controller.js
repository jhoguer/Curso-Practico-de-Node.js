const { nanoid } = require('nanoid')
const auth = require('../auth/');

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

  const upsert = async ( data ) => {
    const user = {
      name: data.name,
      username: data.username
    }

    if (data.id) {
      user.id = data.id
    } else {
      user.id = nanoid()
    }

    if (data.password || data.usernaame) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password,
      })
    }

    return store.upsert( TABLA, user )
  }

  const remove = ( id ) => {
    return store.remove(TABLA, id)
  }

  const follow = (from, to) => {
    store.upsert(TABLA + '_follow', {
      user_from: from,
      user_to: to,
    })
  }

  return {
    list,
    get,
    upsert,
    remove,
    follow,
  }
}