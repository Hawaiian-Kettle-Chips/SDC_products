// IMPORTS
const express = require('express');
const router = express.Router();

const controllers = require('./controllers');


router.get('/', controllers.default);

router.get('/products', controllers.getProducts);
router.get('/products/:product_id', controllers.getProductByID);
router.get('/products/:product_id/styles', controllers.getProductStylesByID);
router.get('/products/:product_id/related', controllers.getRelatedProductIDs);

router.get('/status', controllers.status);
router.get('/testDB', controllers.testDB);
router.get('/testData', controllers.testData);

// this is a non-static temporary route from https://loader.io and will echo this path
router.get(`/${process.env.LOADER_IO_URL}`, controllers.echoPath);

router.get('*', controllers.return404);


module.exports = router;
