const router = require('express-promise-router')();

const {
    getSalles, 
    getOneSalle, 
    createAccount, 
    updateAccount,
    getHistoriquePaiement
} = require('../controllers/controllers');

router
    .route('/salles')
    .get(getSalles)

router
    .route('/salle/:id')
    .get(getOneSalle)

router
    .route('/registration')
    .post(createAccount)

router
    .route('/compte/:id')
    .get(getHistoriquePaiement)
    .put(updateAccount)


module.exports = router;