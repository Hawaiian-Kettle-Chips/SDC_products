// IMPORTS
const db = require('../../database');
const testData = require('../../dev/stub_data');


function getProductByID() {
  console.log('test product');
  return testData.product;
}

function getProductStylesByID() {
  console.log('test styles');
  return testData.styles;
}

function getRelatedProductIDs() {
  console.log('test related');
  return testData.related;
}

function returnAllTestData() {
  console.log('test data:', testData)
  return testData;
}

function testDatabase() {
  db.connect()
    .then((client) => {
      client
        .query('SELECT * FROM styles WHERE id = 1')
        .then((response) => {
          client.release();
          console.log(response.rows);
        })
    });
}


module.exports = {
  getProductByID,
  getProductStylesByID,
  getRelatedProductIDs,
  returnAllTestData,
  testDatabase
};
