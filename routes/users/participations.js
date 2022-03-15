const router = require('express-promise-router')();

const { userIsLogged } = require('../../controllers/users/comptes');
const {
    createParticipant, 
    getParticipations,
    getUserParticipationBefore, 
    getUserParticipationAfter, 
    updateParticipantCovidState, 
    deleteParticipation
} = require('../../controllers/users/participations');

router
    .route('/:user_id/participations')
    .post(createParticipant)
    .get(userIsLogged, getUserParticipationBefore)
    // .get(userIsLogged, getParticipations)
    .put(updateParticipantCovidState)
    .delete(deleteParticipation)

// router
//     .route('/:user_id/participations/before')
//     .get(userIsLogged, getUserParticipationBefore)

router
    .route('/:user_id/participations/history')
    .get(userIsLogged, getUserParticipationAfter)

module.exports = router;