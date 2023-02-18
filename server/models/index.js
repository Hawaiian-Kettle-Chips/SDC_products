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
    .then((results) => {
      return results.rows;
    })
    .catch((error) => { console.error(error); });

  // This took on average ~20% longer over 1000 requests
  // const queryProd = `SELECT * FROM products WHERE id = ${id};`;
  // const queryFeat = `SELECT feature, value FROM features WHERE product_id = ${id};`;
  // let chained = new Promise((resolve) => {
  //   let data;
  //   db.query(queryProd)
  //     .then((prodRes) => {
  //       db.query(queryFeat)
  //         .then((featRes) => {
  //           data = prodRes.rows[0];
  //           console.log('db said', data, prodRes.rows)
  //           data.features = featRes.rows
  //           resolve(data);
  //         })
  //         .catch((error) => { console.error(error); });
  //     })
  //     .catch((error) => { console.error(error); });
  // });
  // return chained;

  // console.log('test product');
  // return testData.product;
}

function getProductStylesByID(id) {
  const queryStyles = `SELECT *,
  (SELECT json_agg(
    json_build_object(
      'style_id', id,
      'name', name,
      'original_price', original_price,
      'sale_price', sale_price,
      'default?', default_style
      ))
      AS styles FROM styles
      WHERE "productId"=${id})
  FROM products WHERE id = ${id};
  `;

  console.log('QUERY:', queryStyles);

  return db.query(queryStyles)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => { console.error(error); });

  // console.log('test styles');
  // return testData.styles;
}

function getRelatedProductIDs() {
  const queryFeat = `SELECT
    ARRAY_AGG (
	    related_product_id
    )
    FROM relations
    WHERE current_product_id = 40352;
  `;

  console.log('QUERY:', queryFeat);

  return db.query(queryFeat)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => { console.error(error); });

  // console.log('test related');
  // return testData.related;
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
