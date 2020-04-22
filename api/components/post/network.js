const express = require('express')
const action = require('./actions')
const secure = require('./secure')

const router = express.Router()


// Routes
router.get('/', action.list)
router.get('/:id', secure('logged'), action.get)
router.patch('/:id', secure('update'), action.patch)
router.post('/:id', secure('logged'), action.upsert)


module.exports = router