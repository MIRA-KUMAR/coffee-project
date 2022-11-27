const express = require('express');

const coffeeinformation = require('./schemas/coffeeinformation');
const coffeetype = require('./schemas/coffeetype');
const coffeeseller = require('./schemas/coffeeseller');
// const coffeename = require('./schemas/coffeename');

const router = express.Router();

router.use('/coffeeinformation', coffeeinformation);
router.use('/coffeetype', coffeetype);
// router.use('/coffeename', coffeename);
router.use('/coffeeseller', coffeeseller);

module.exports = router;