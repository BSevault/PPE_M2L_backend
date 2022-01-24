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
    deleteReservation,
    activeStatusUser
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
    .route('/:user_id/active')
    .get(activeStatusUser)

router
    .route('/:user_id/participation')
    .put(isCovid)

router
    .route('/:user_id/paiements')
    .get(getHistoriquePaiement)




module.exports = router;