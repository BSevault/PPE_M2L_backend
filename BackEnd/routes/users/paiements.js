const router = require('express-promise-router')();

const {
    createUserPayment,
    getServicesPaymentsByUserId
} = require('../../controllers/users/paiements');

router
    .route('/:user_id/paiements')
    .get(getServicesPaymentsByUserId)
    .post(createUserPayment)

module.exports = router;