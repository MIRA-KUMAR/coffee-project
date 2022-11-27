const express = require('express');

const read = require('./read');
const readById = require('./readOne')
const router = express.Router();

router.get('/', read);
router.get('/:id', readById);

module.exports = router;