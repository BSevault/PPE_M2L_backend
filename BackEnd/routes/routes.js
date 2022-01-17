const router = require('express-promise-router')();

const { getSalles, getOneSalle, createAccount } = require('../controllers/controllers');

router
    .route('/salles')
    .get(getSalles)

router
    .route('/salle/:id')
    .get(getOneSalle)

router
    .route('/registration')
    .post(createAccount)

module.exports = router;