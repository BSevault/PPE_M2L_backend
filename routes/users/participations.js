const router = require('express-promise-router')();

const {
    createParticipant, 
    getParticipationsByUserId
} = require('../../controllers/users/participations');

router
    .route('/:user_id/:resa_id')
    .post(createParticipant)

router
    .route('/:user_id/participations')
    .get(getParticipationsByUserId)

module.exports = router;