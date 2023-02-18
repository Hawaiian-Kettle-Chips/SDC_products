// IMPORTS
const db = require('../../database');
const models = require('../models');


function genericResponse(request, response) {
  console.info('   returning status page');
  response.status(200);
  response.send(`The Server is: ✅
  <p>The Database is ready for queries: ${db._clients.length > 0 ? '✅' : '❌'}`);
}

function return404Page(request, response) {
  console.info('   returning 404 page');
  response.status(404);
  response.send('<center><h1>🦖<p>His weak tiny arms<p>ineffective in their reach<p>gift you [404]</h1></center>');
}

function returnStatusJson(request, response) {
  console.info('   returning status json');
  response.status(200);
  response.json({ database: db, ip: `${request.header}` });
}

function getProducts(request, response) {
  // request parameters
  // INT    page    default 1   page to return
  // INT    count   default 5   results per page
  response.sendStatus(501);
}

function getProductByID(request, response) {
  models.getProductByID(request.params.product_id)
    .then((data) => {
      console.log('DATA:', data)
      if (data.length) {
        response.status(200);
        response.json(data[0]);
      } else {
        response.sendStatus(204);
      }
    })
    .catch((error) => {
      console.error(error);
      response.sendStatus(500)
    });
}

function getProductStylesByID(request, response) {
  models.getProductStylesByID(request.params.product_id)
    .then((data) => {
      console.log('DATA:', data)
      response.status(200);
      response.json(data[0]);
    })
    .catch((error) => {
      console.error(error);
      response.sendStatus(500)
    });
}

function getRelatedProductIDs(request, response) {
  models.getRelatedProductIDs()
  .then((data)=>{
    console.log('DATA:', data)
    response.status(200);
    response.json(data[0].array_agg);
  })
  .catch((error)=>{
    console.error(error);
    response.sendStatus(500);
  });
}

function testDatabase(request, response) {
  models.testDatabase(response);
}

function testData(request, response) {
  response.status(200);
  response.send(models.returnAllTestData());
}


module.exports = {
  getProducts,
  getProductByID,
  getProductStylesByID,
  getRelatedProductIDs,
  return404: return404Page,
  status: returnStatusJson,
  testDB: testDatabase,
  testData: testData,
  default: genericResponse
};
