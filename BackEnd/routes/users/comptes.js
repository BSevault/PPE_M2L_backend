const router = require('express-promise-router')();

const {
    getAllAccount,
    createAccount,
    getOneAccount,
    updateAccount,
    activeStatusUser,
    checkUserPassword
} = require('../../controllers/users/comptes');

router
    .route('/')     // registration
    .get(getAllAccount)
    .post(createAccount)
    
router
    .route('/:user_id')
    .get(getOneAccount)
    .put(updateAccount)
    .patch(checkUserPassword)

router  
    .route('/:user_id/active')
    .patch(activeStatusUser)

module.exports = router;