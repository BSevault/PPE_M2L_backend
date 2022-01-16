const router = require('express-promise-router')();

const { testGet } = require('../controllers/controllers');

router
    .route('/test')
    .get(testGet)

module.exports = router;