const router = require('express-promise-router')();

const {
    getAccountIdByEmail,
    getFutureReservation,
    getBeforeReservation,
    getAllProducts,
    getResaParticipants,
    getUserParticipationBefore,
    updateCheckResa,
    updatePresentParticipations
} = require('../../controllers/flutter/flutter');

router
    .route('/login')
    .post(getAccountIdByEmail);

router
    .route('/:user_id/reservations')
    .get(getFutureReservation)
    .put(updateCheckResa);

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
    .put(updatePresentParticipations);

router.route('/ticket');
router.route('/paiement');


module.exports = router;