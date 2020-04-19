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
  // console.log(tabla)
  return db[tabla]
}

const get = async (tabla, id) => {
  const col = await list(tabla)
  return col.filter( item => item.id === id)[0]  || null
}

const upsert = (tabla, data) => {
  db[tabla].push(data)
}

const remove = (tabla, id) => {
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}