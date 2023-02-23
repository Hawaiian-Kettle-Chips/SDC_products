// IMPORTS
const express = require('express');
const router = express.Router();

const controllers = require('./controllers');


router.get('/', controllers.default);

router.get('/products', controllers.getProducts);
router.get('/products/:product_id', controllers.getProductByID);
router.get('/products/:product_id/styles', controllers.getProductStylesByID);
router.get('/products/:product_id/related', controllers.getRelatedProductIDs);

// this is a non-static temporary route from https://loader.io and will echo this path
router.get('/loaderio-7bbd3dba52a57734eb2411c49f7dec65', controllers.verifyLoaderIO);

router.get('/status', controllers.status);
router.get('/testDB', controllers.testDB);
router.get('/testData', controllers.testData);

router.get('*', controllers.return404);


module.exports = router;
