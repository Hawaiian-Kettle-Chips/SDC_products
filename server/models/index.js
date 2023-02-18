// IMPORTS
const db = require('../../database');
const testData = require('../../dev/stub_data');


function getProductByID(id) {
  const queryProd = `
  SELECT *,
  (SELECT json_agg(
    json_build_object(
      'feature', feature,
      'value', value))
      AS features FROM features
      WHERE product_id=${id})
  FROM products WHERE id = ${id};
  `;
  console.log('QUERY:', queryProd);

  return db.query(queryProd)
    .then((prodRes) => {
      return prodRes;
    })
    .catch((error) => { console.error(error); });

  // console.log('test product');
  // return testData.product;
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
  return testData;
}

function testDatabase(response) {
  db.connect()
    .then((client) => {
      client
        .query('SELECT * FROM styles WHERE id = 1')
        .then((dbRes) => {
          response.status(200);
          response.json(dbRes.rows);
        })
        .finally(() => { client.release(); })
    });
}


module.exports = {
  getProductByID,
  getProductStylesByID,
  getRelatedProductIDs,
  returnAllTestData,
  testDatabase
};
