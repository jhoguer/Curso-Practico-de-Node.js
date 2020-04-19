const authJwt = require('../../../auth/index')
const TABLA = 'auth'

module.exports = (injectedStore) => {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  const login = async (username, password) => {
    const data = await store.query(TABLA, { username: username })
    console.log('La contraseña que llega es ', data.password)
    if (data.password === password) {
      // Generar token
      return authJwt.sign(data)
      return 'TOKEN'
    } else {
      throw new Error('Informacion Invalidad ')
    }
    
  }

  const upsert = (data) => {
    const authData = {
      id: data.id,
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = data.password
    }

    return store.upsert(TABLA, authData)
  }

  return {
    upsert,
    login
  }
}