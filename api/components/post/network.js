const express = require('express')
const action = require('./actions')
const secure = require('./secure')

const router = express.Router()


// Routes
router.get('/', action.list)
router.get('/:id', secure('logged'), action.get)
router.post('/', secure('post'), action.upsert)


module.exports = router