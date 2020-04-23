const { nanoid } = require('nanoid')
const auth = require('../auth/');

const TABLA = 'user'



module.exports = (injectedSore) => {
  let store = injectedSore
  if (!store) {
    store = require('../../../store/remote-mysql')
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
      username: data.username,
      flag: data.flag
    }

    if (data.id) {
      user.id = data.id
    } else {
      user.id = nanoid()
    }

    if (data.password || data.usernaame) {
      console.log('INSERTAR EN AUTH-user=========>', data)
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password,
        flag: data.flag
      })
    }

    console.log('INSERTAR EN USER-user=========>', user)

    return store.upsert( TABLA, user )
  }

  const remove = ( id ) => {
    return store.remove(TABLA, id)
  }

  const follow = (from, to) => {
    return store.upsert(TABLA + '_follow', {
      user_from: from,
      user_to: to,
    })     
  }

  const following = async (user) => {
    console.log('este es el ID->', user)
    const join = {}
    console.log('Esta mierda es-->', join)
    join[TABLA] = 'user_to' // { user: 'user_to }
    console.log('Esta mierda es-->', join)
    const query = { user_from: user }
    console.log('Esta mierda query-->', query)


    return await store.query(TABLA + '_follow', query, join)
  }

  return {
    list,
    get,
    upsert,
    remove,
    follow,
    following,
  }
}