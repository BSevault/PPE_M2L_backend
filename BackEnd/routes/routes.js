const router = require('express-promise-router')();

const {
    getSalles, 
    getOneSalle, 
    createAccount, 
    updateAccount,
    getHistoriquePaiement,
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/controllers');

const {
    getAllAccount,
    getOneAccount,
    getUserTickets,
    getOneUserTicket,
    createUserTicket,
    updateOneUserTicket,
    deleteOneUserTicket
} = require('../controllers/controller_users');

router
    .route('/salles')
    .get(getSalles)

router
    .route('/salle/:id')
    .get(getOneSalle)

router
    .route('/registration')
    .post(createAccount)

router
    .route('/compte')
    .get(getAllAccount)
    
router
    .route('/compte/:user_id')
    .get(getOneAccount)
    .put(updateAccount)

router
    .route('/compte/:user_id/paiements')
    .get(getHistoriquePaiement)

router
    .route('/compte/:user_id/tickets')
    .get(getUserTickets)
    .post(createUserTicket)

router
    .route('/compte/:user_id/tickets/:ticket_id')
    .get(getOneUserTicket)
    .put(updateOneUserTicket)
    .delete(deleteOneUserTicket)

router
    .route('/reservation/:user_id')
    .get(getReservation)
    .post(createReservation)
    .put(updateReservation)
    .delete(deleteReservation)



module.exports = router;