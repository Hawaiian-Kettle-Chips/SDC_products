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

router.get('*', controllers.return404);


module.exports = router;
