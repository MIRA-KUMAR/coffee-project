const express = require('express');

const read = require('./read'); 
const readById = require('./readOne');
const update = require('./update');
const router = express.Router();

router.get('/', read);
router.get('/:id', readById);
router.put('/:id', update);

module.exports = router;