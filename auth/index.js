const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

const secret = config.jwt.secret

const sign = (data) => {
  data = JSON.parse(JSON.stringify(data))
  return jwt.sign(data, secret)
}

const verify = (token) => {
  try {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', jwt.verify(token, secret))
    return jwt.verify(token, secret)

  } catch(err) {
    throw error('Se reompio en verify', 500)
  }
}

const getToken = (auth) => {
  if (!auth) {
    throw error('No viene token', 401)
  }

  if (auth.indexOf('Bearer') === -1) {
    throw error('Formato invalido', 500)
  }

  let token = auth.replace('Bearer ', '')
  console.log('---------------------->', token)
  return token
}

const decodeHeader = (req) => {
  console.log('ES el token autorizzz', req.headers.authorization)
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  console.log('Token decodificado=================>', decoded)

  req.user = decoded

  return decoded
}

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req)
    console.log(decoded)

    if (decoded.id !== owner) {
      throw error('No puedes hacer esto', 401)
    }
  },
  logged: (req) => {
    const decoded = decodeHeader(req)
  },
}




module.exports = {
  sign,
  check,
}