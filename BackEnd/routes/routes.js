const router = require('express-promise-router')();

const {
    getSalles, 
    getOneSalle, 
    createAccount, 
    updateAccount,
    getHistoriquePaiement,
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation
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
    .route('/compte/:user_id')
    .get(getHistoriquePaiement)
    .put(updateAccount)

router
    .route('/reservation/:user_id')
    .get(getReservation)
    .post(createReservation)
    .put(updateReservation)
    .delete(deleteReservation)



module.exports = router;