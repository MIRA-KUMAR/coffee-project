const express = require('express');

const read = require('./read'); 
const readById = require('./readOne');
const update = require('./update');
const create = require('./create');
const del = require('./delete');

const router = express.Router();

router.get('/', read);
router.get('/:id', readById);
router.put('/:id', update);
router.post('/', create);
router.delete('/:id', del);

module.exports = router;