const router = require('express-promise-router')();

const {
    getReservations,
    createReservation,
    updateReservation,
    toggleReservationIsPaid,
    deleteReservation,
    getBeforeReservation,
    getFutureReservation,
    getReservationCovid,
    // getReservationsCancel
} = require('../../controllers/users/reservations');

// router
//     .route('/')
//     .get(getReservationsCancel)

router
    .route('/:user_id/reservation')
    .get(getReservations)
    .post(createReservation)
    .put(updateReservation)
    .patch(toggleReservationIsPaid)
    .delete(deleteReservation)

router
    .route('/:user_id/reservations')
    .get(getFutureReservation)

router
    .route('/:user_id/reservations/history')
    .get(getBeforeReservation)

router
    .route('/:resa_id/covid_state')
    .get(getReservationCovid)


module.exports = router;