const express = require('express');

const search = require('./search'); 

const router = express.Router();

router.post('/', search);

module.exports = router;