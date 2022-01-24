const router = require('express-promise-router')();

const {
    getReservations, 
    createReservation,
    updateReservation,
    toggleReservationIsPaid,
    deleteReservation
} = require('../../controllers/users/reservations');

router
    .route('/:user_id/reservation')
    .get(getReservations)
    .post(createReservation)
    .put(updateReservation)
    .patch(toggleReservationIsPaid)
    .delete(deleteReservation)
    

module.exports = router;