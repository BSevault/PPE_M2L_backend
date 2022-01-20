const router = require('express-promise-router')();

const {
    getAllSalles,
    getActiveSalles,
    getOneSalle,
    getSalleResas,
    createSalle,
    updateSalle,
    toggleStatusSalle
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
    .patch(toggleStatusSalle)

router
    .route('/:salle_id/reservations')
    .get(getSalleResas)


module.exports = router;