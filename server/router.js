// IMPORTS
const express = require('express');
const router = express.Router();

const controllers = require('./controllers');


router.get('/', controllers.default);

router.get('*', controllers.return404);


module.exports = router;
