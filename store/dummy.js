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
  return db[tabla]
}

const get = async (tabla, id) => {
  const col = await list(tabla)
  return col.filter( item => item.id === id)[0]  || null
}

const upsert = async (tabla, data) => {
  db[tabla].push(data)
  const register = await list(tabla)
  return register.filter( item => item.id === data.id)[0] || null
}

const remove = async (tabla, id) => {
  const user = await get(tabla, id)
  if (user) {
    db[tabla].pop(user.id)
  }
  return id
}

module.exports = {
  list,
  get,
  upsert,
  remove
}