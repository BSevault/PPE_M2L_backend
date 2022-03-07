const router = require('express-promise-router')();

const {
    getAllAccount,
    createAccount,
    getOneAccount,
    updateAccount,
    changePassword,
    activeStatusUser,
    checkUserPassword,
    getAccountIdByEmail
} = require('../../controllers/users/comptes');

router
    .route('/')     // registration
    .get(getAllAccount)
    .post(createAccount)

router
    .route('/login')
    .post(getAccountIdByEmail)
    
router
    .route('/:user_id')
    .get(getOneAccount)
    .put(updateAccount)
    .patch(checkUserPassword)
    .post(changePassword)

router  
    .route('/:user_id/active')
    .patch(activeStatusUser)

module.exports = router;