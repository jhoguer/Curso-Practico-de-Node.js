const express = require('express');

const actions = require('./actions');



const router = express.Router();

router.get('/:table', actions.list);
router.get('/:table/:id', actions.get);
router.put('/:table', actions.upsert);


module.exports = router;


