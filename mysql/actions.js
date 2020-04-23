const response = require('../network/response');
const Store = require('../store/mysql');

const list = async (req, res, next) => {
  const datos = await Store.list(req.params.table);
  response.success(req, res, datos, 200);
}

const get = async (req, res, next) => {
  const datos = await Store.get(req.params.table, req.params.id);
  response.success(req, res, datos, 200);
}

const insert = async (req, res, next) => {
  const datos = await Store.insert(req.params.table, req.body);
  response.success(req, res, datos, 201);
}

const upsert = async (req, res, next) => {
  const datos = await Store.upsert(req.params.table, req.body);
  response.success(req, res, datos, 201)
}

module.exports = {
  list,
  get,
  insert,
  upsert
}