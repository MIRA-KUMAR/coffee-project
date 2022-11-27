const express = require('express');

const read = require('./read');
// const readById = require('./readById')
const router = express.Router();

router.get('/', read);
// router.get('/:id', readById);

module.exports = router;