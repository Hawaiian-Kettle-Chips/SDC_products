// IMPORTS
require('dotenv').config()

const express = require('express');

const logger = require('./logger.js');
const router = require('./router.js');


// MAIN
const server = express();

server.use(express.json());
// server.use(logger);
server.use('/favicon.ico', express.static('./images/favicon.ico'));
server.use(router);

server.listen(process.env.PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('SERVER: Process ID is', process.pid);
    console.info(`        Listening at http://${process.env.SERVER_URL}:${process.env.PORT}`);
  }
});
