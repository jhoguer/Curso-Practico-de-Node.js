const db = {
  'user': [
    {
      id: '1',
      name: 'Carlos'
    }
  ]
}
 console.log(db)
 console.log(db.user)
 console.log(db['user'])

const list = async (tabla) => {
  console.log(tabla)
  return db[tabla] || []
}

const get = async (tabla, id) => {
  const col = await list(tabla)
  return col.filter( item => item.id === id)[0]  || null
}

const upsert = async (tabla, data) => {
  if (!db[tabla]) {
    db[tabla] = []
  }
  db[tabla].push(data)

  console.log(db)
  // const register = await list(tabla)
  // return register.filter( item => item.id === data.id)[0] || null
}

const remove = async (tabla, id) => {
  const user = await get(tabla, id)
  if (user) {
    db[tabla].pop(user.id)
  }
  return id
}

const query = async (tabla, q) => {
  console.log('Esta en la query=>', q)
  let col = await list(tabla)
  let keys = Object.keys(q)
  let key = keys[0];

  console.log('la keyssss ',keys)
  console.log('la ky ',key)
  console.log('------------------->',col.filter( item => item[key] === q[key] || null ))

  return col.filter( item => item[key] === q[key] || null )[0]
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}