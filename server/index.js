// IMPORTS
require('dotenv').config();
const express = require('express');

const db = require('../database');

const logger = require('./logger.js');
const router = require('./router.js');


// MAIN
const server = express();

server.use(express.json());
server.use(logger);
server.use(router);

server.listen(process.env.PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.clear();
    console.info('=== SERVER ON', '='.repeat(42));
    console.info(`SERVER:\tListening at http://${process.env.SERVER_URL}:${process.env.PORT}`);
    console.info(`DB:\tListening at http://${db.host}:${db.port}`);
  }
});
