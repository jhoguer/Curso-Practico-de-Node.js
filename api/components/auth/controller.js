const bcrypt = require('bcrypt')

const authJwt = require('../../../auth/index')
const TABLA = 'auth'

module.exports = (injectedStore) => {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/mysql')
  }

  const login = async (username, password) => {
    const data = await store.query(TABLA, { username: username })

    const isSame = await bcrypt.compare(password, data.password)

    if (isSame) {
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXx')
      return authJwt.sign(data)
    } else {
      throw new Error('Informacion Invalidad Error en contraseña')
    }  
  }

  const upsert = async (data) => {
    const authData = {
      id: data.id,
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5)
    }

    return store.upsert(TABLA, authData)
  }

  return {
    upsert,
    login
  }
}