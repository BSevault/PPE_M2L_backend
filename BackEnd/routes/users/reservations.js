const router = require('express-promise-router')();

const {
    getReservations
} = require('../../controllers/users/reservations');

router
    .route('/:user_id/reservations')
    .get(getReservations)

module.exports = router;