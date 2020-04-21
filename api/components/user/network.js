const express = require('express')
const secure = require('./secure')
const action = require('./actions')

const router = express.Router()

router.get('/', action.list)
router.post('/follow/:id', secure('follow'), action.follow)
router.get('/:id/following', action.following)
router.get('/:id', action.get)
router.post('/', action.upsert)
router.put('/', secure('update'), action.update)
router.delete('/:id', action.remove)


module.exports = router