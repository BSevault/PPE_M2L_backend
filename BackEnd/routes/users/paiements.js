const router = require('express-promise-router')();

const {
    createUserPayment
} = require('../../controllers/users/paiements');

router
    .route('/')
    .post(createUserPayment)

module.exports = router;