const express = require('express')
const action = require('./actions')

const router = express.Router()


// Routes
router.get('/', action.list)


module.exports = router