const router = require('express-promise-router')();

const {
    createAccount,
    updateAccount,
    getAllAccount,
    getOneAccount,
    getUserTickets,
    getOneUserTicket,
    createUserTicket,
    updateOneUserTicket,
    deleteOneUserTicket,
    isCovid,
    getHistoriquePaiement,
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/controller_users');

router
    .route('/')     // registration
    .get(getAllAccount)
    .post(createAccount)
    
router
    .route('/:user_id')
    .get(getOneAccount)
    .put(updateAccount)

router
    .route('/:user_id/participation')
    .put(isCovid)

router
    .route('/:user_id/paiements')
    .get(getHistoriquePaiement)

router
    .route('/:user_id/tickets')
    .get(getUserTickets)
    .post(createUserTicket)

router
    .route('/:user_id/tickets/:ticket_id')
    .get(getOneUserTicket)
    .put(updateOneUserTicket)
    .delete(deleteOneUserTicket)

router
    .route('/:user_id/reservation')
    .get(getReservation)
    .post(createReservation)
    .put(updateReservation)
    .delete(deleteReservation)


module.exports = router;