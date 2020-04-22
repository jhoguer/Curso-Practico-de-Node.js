const mysql = require('mysql')

const config = require('../config')

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

let connection

const handleCon = () => {
  connection = mysql.createConnection(dbconf)

  connection.connect((err) => {
    if (err) {
      console.error('[db err]', err)
      setTimeout(handleCon, 2000)
    } else {
      console.log('DB Connected!')
    }
  })

  connection.on('error', err => {
    console.error('[db err]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon()
    } else {
      throw err
    }
  })
}

handleCon()

const list = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err)
      
      resolve(data)
    })
  })
}

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, data) => {
      if (err) return reject(err)

      resolve(data)
    })
  })
}



const insert = (table, data) => {
  console.log('En INSERTAR=====>', data)
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

const update = (table, data) => {
  console.log('En UPDATE=====>', data)
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if (err) return reject(err)
      console.log('<++++++++++++++++++++++++++++++++>', result)
      resolve(result)
    })
  })
}

const patch = (table, data, postId) => {
  console.log('En UPDATE=====>', data)
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, postId], (err, result) => {
      if (err) return reject(err)
      console.log('<++++++++++++++++++++++++++++++++>', result)
      resolve(result)
    })
  })
}


const upsert = (table, data) => {
  console.log('En UPSERT UPDATE', data.flag)
  if (data.flag === 'update') {
    delete data.flag
    return patch(table, data)
  } else {
    delete data.flag
    return insert(table, data)
  }
}

const query = (table, query, join) => {
  let joinQuery = ''
  if (join) {
    const key = Object.keys(join)[0]   
    const val = join[key]
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`

    console.log('**Seria parde la query para hacer le JOIN-->', joinQuery)
  }


  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, result) => {
      if (err) return reject(err)
      
      resolve(result[0] || null)
    })
  })
}

const getPost = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE user = "${id}"`, (err, data) => {
      if (err) return reject(err)

      resolve(data)
    })
  })
}

module.exports = {
  list,
  get,
  upsert,
  query,
  getPost,
  patch
}