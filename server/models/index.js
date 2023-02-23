// IMPORTS
const db = require('../../database');
const testData = require('../../dev/stub_data');


function getProducts(queries) {

  const count = queries.count || 5;
  const offset = queries.page || 0;
  const query = `SELECT
  *
  FROM products
  ORDER BY id ASC
  LIMIT ${count}
  OFFSET ${offset * count}
  `;

  return db.query(query)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => { console.error(error); });
}

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

  return db.query(queryProd)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => { console.error(error); });

  // // This took on average ~20% longer over 1000 requests
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

  // // Basic Stubbed Test Data
  // console.log('test product');
  // return testData.product;
}

function getProductStylesByID(id) {
  const queryStyles = `
  SELECT "productId",
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'style_id', id,
      'name', name,
      'original_price', original_price,
      'sale_price', sale_price,
      'default?', default_style,
      'photos', (
        WITH photoRows AS (
          SELECT * FROM photos WHERE "styleId" = styles.id
        )
        SELECT JSON_AGG(
          JSON_BUILD_OBJECT(
            'thumbnail_url', thumbnail_url::text,
            'url', url::text
          )
        )
        FROM photoRows
      ),
      'skus', (
        SELECT JSON_OBJECT_AGG(
          skus.id::text,
          JSON_BUILD_OBJECT(
            'quantity', quantity,
            'size', size
          )
        )
        FROM skus
        WHERE "styleId" = styles.id
      )
    )
  )
  AS results
  FROM styles WHERE "productId" = ${id}
  GROUP BY "productId";
  `;

  return db.query(queryStyles)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => { console.error(error); });
}

function getRelatedProductIDs() {
  const queryFeat = `SELECT
    ARRAY_AGG (
	    related_product_id
    )
    FROM relations
    WHERE current_product_id = 40352;
  `;

  return db.query(queryFeat)
    .then((results) => {
      return results.rows;
    })
    .catch((error) => { console.error(error); });
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
  getProducts,
  getProductByID,
  getProductStylesByID,
  getRelatedProductIDs,
  returnAllTestData,
  testDatabase
};
