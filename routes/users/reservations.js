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
    getAllReservations,
    getResaParticipants
    // getReservationsCancel
} = require('../../controllers/users/reservations');

router
    .route('/all/reservations')
    .get(getAllReservations)

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

router
    .route('/reservation/participants')
    .get(getResaParticipants)

module.exports = router;