const router = require('express-promise-router')();

const { userIsLogged } = require('../../controllers/users/comptes');
const {
    createUserPayment,
    getServicesPaymentsByUserId
} = require('../../controllers/users/paiements');

router
    .route('/:user_id/paiements')
    .get(userIsLogged, getServicesPaymentsByUserId)
    .post(createUserPayment)

module.exports = router;