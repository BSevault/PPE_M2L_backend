const router = require('express-promise-router')();

const {
    getAccountIdByEmail,
    getFutureReservation,
    getBeforeReservation,
    getAllProducts,
    getResaParticipants,
    getUserParticipationBefore
} = require('../../controllers/flutter/flutter');

router
    .route('/login')
    .post(getAccountIdByEmail);

router
    .route('/:user_id/reservations')
    .get(getFutureReservation);

router
    .route('/:user_id/reservations/history')
    .get(getBeforeReservation);

router
    .route('/:user_id/participations/history')
    .get(getUserParticipationBefore)

router
    .route('/produits')
    .get(getAllProducts);

router
    .route('/:id_resa/participants')
    .get(getResaParticipants)

router.route('/ticket');
router.route('/paiement');


module.exports = router;