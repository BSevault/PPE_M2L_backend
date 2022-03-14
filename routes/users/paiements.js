const router = require('express-promise-router')();

const { userIsLogged } = require('../../controllers/users/comptes');
const {
    createUserPayment,
    getServicesPaymentsByUserId,
    getPaymentsByResaId
} = require('../../controllers/users/paiements');

router
    .route('/paiements/:resa_id')
    .get(getPaymentsByResaId)

router
    .route('/:user_id/paiements')
    .get(userIsLogged, getServicesPaymentsByUserId)
    .post(createUserPayment)


module.exports = router;