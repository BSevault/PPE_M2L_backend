const router = require('express-promise-router')();

const {
    getAllSalles
} = require('../controllers/controller_salles');

router
    .route('/')
    .get(getAllSalles)

module.exports = router;