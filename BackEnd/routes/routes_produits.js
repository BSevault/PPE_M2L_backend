const router = require('express-promise-router')();

const {
    getSalles
} = require('../controllers/controller_produits');

router
    .route('/')
    .get(getSalles)

module.exports = router;