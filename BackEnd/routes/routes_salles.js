const router = require('express-promise-router')();

const {
    getAllSalles,
    getActiveSalles,
    getOneSalle,
    getSalleResas,
    createSalle,
    updateSalle,
    activeStatusSalle
} = require('../controllers/controller_salles');

router
    .route('/all')
    .get(getAllSalles)

router
    .route('/')
    .get(getActiveSalles)
    .post(createSalle)

router
    .route('/:salle_id')
    .get(getOneSalle)
    .put(updateSalle)

router
    .route('/:salle_id/reservations')
    .get(getSalleResas)

router
    .route('/:salle_id/activation')
    .put(activeStatusSalle)

module.exports = router;