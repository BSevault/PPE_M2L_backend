const router = require('express-promise-router')();

const { userIsLogged } = require('../../controllers/users/comptes');
const {
    getUserTickets,
    getOneUserTicket,
    createUserTicket,
    updateOneUserTicket,
    deleteOneUserTicket,
    toggleTicketStatus
} = require('../../controllers/users/tickets');

router
    .route('/:user_id/tickets')
    .get(userIsLogged, getUserTickets)
    .post(createUserTicket)

router
    .route('/:user_id/tickets/:ticket_id')
    .get(userIsLogged, getOneUserTicket)
    .put(updateOneUserTicket)
    .patch(toggleTicketStatus)
    .delete(deleteOneUserTicket)

module.exports = router;