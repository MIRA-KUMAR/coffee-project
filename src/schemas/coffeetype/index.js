const express = require('express');

const read = require('./read'); 
const readById = require('./readOne');
const update = require('./update');
const create = require('./create');
const del = require('./delete');

const router = express.Router();

router.post('/', create);
router.put('/:id', update);
router.get('/', read);
router.get('/:id', readById);
router.delete('/:id', del);
module.exports = router;