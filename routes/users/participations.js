const router = require('express-promise-router')();

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
    .get(getParticipations)
    .put(updateParticipantCovidState)
    .delete(deleteParticipation)

router
    .route('/:user_id/participations/before')
    .get(getUserParticipationBefore)

router
    .route('/:user_id/participations/after')
    .get(getUserParticipationAfter)

module.exports = router;