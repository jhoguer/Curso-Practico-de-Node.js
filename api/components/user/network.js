const express = require('express')
const action = require('./actions')

const router = express.Router()

router.get('/', action.list)
router.get('/:id', action.get)
router.post('/', action.upsert)
// router.put('/', action.udpdate)
router.delete('/:id', action.remove)


module.exports = router