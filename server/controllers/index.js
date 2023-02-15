// IMPORTS
const db = require('../../database');
const models = require('../models');


function genericResponse(request, response) {
  console.info('   returning status page');
  response.status(200);
  response.send(`The Server is: ✅
  <p>The Database is ready for queries: ${db.readyForQuery ? '✅' : '❌'}`);
}

function return404Page(request, response) {
  console.info('   returning 404 page');
  response.status(404);
  response.send('<center><h1>🦖<p>His weak tiny arms<p>ineffective in their reach<p>gift you [404]</h1></center>');
}

function returnStatusJson(request, response) {
  console.info('   returning status json');
  response.status(200);
  response.json({ database: db });
}

function getProductByID() { }
function getProductStylesByID() { }
function getRelatedProductIDs() { }


module.exports = {
  getProductByID,
  getProductStylesByID,
  getRelatedProductIDs,
  return404: return404Page,
  status: returnStatusJson,
  default: genericResponse
};
