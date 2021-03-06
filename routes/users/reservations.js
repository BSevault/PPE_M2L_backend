const router = require('express-promise-router')();

const { userIsLogged } = require('../../controllers/users/comptes');
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
    .get(userIsLogged, getReservations)
    .post(createReservation)
    .put(updateReservation)
    .patch(toggleReservationIsPaid)
    .delete(deleteReservation)

router
    .route('/:user_id/reservations')
    .get(userIsLogged, getFutureReservation)

router
    .route('/:user_id/reservations/history')
    .get(userIsLogged, getBeforeReservation)

router
    .route('/:resa_id/covid_state')
    .get(userIsLogged, getReservationCovid)

router
    .route('/reservation/participants')
    .post(getResaParticipants)

module.exports = router;