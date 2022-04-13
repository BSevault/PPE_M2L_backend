const router = require('express-promise-router')();

const {
    getAccountIdByEmail
} = require('../../controllers/flutter/flutter');

router
    .route('/login')
    .post(getAccountIdByEmail);

router.route('/reservation');
router.route('/participation');
router.route('/ticket');
router.route('/paiement');


module.exports = router;