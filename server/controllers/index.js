// IMPORTS
const db = require('../../database');
const models = require('../models');


function genericResponse(request, response) {
  console.info('   returning status page');
  response.status(200);
  response.send(`The Server is: ✅
  <p>The Database is: ${db._clients.length > 0 ? '✅' : '❌'}`);
}

function return404Page(request, response) {
  console.info('   returning 404 page');
  response.status(404);
  response.send('<center><h1>🦖<p>His weak tiny arms<p>ineffective in their reach<p>gift you [404]</h1></center>');
}

function returnStatusJson(request, response) {
  console.info('   returning status json');
  response.status(200);
  response.json({ database: db, request_headers: `${request.rawHeaders}` });
}

function getProducts(request, response) {
  models.getProducts(request.query)
    .then((data) => {
      if (data.length) {
        response.status(200);
        response.json(data);
      } else {
        response.sendStatus(204);
      }
    })
    .catch((error) => {
      console.error(error);
      response.sendStatus(500)
    });
}

function getProductByID(request, response) {
  models.getProductByID(request.params.product_id)
    .then((data) => {
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
    .then((data) => {
      response.status(200);
      response.json(data[0].array_agg);
    })
    .catch((error) => {
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

function echoPathAsString(request, response) {
  response.status(200);
  const echoPath = request.path.replaceAll('/','');
  response.send(echoPath);
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
  echoPath: echoPathAsString,
  default: genericResponse
};
