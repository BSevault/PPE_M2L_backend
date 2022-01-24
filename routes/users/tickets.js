const router = require('express-promise-router')();

const {
    getUserTickets,
    getOneUserTicket,
    createUserTicket,
    updateOneUserTicket,
    deleteOneUserTicket
} = require('../../controllers/users/tickets');

router
    .route('/:user_id/tickets')
    .get(getUserTickets)
    .post(createUserTicket)

router
    .route('/:user_id/tickets/:ticket_id')
    .get(getOneUserTicket)
    .put(updateOneUserTicket)
    .delete(deleteOneUserTicket)

module.exports = router;