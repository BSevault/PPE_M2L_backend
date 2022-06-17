const router = require('express-promise-router')();

const {
    userIsLogged,
    getAllAccount,
    createAccount,
    getOneAccount,
    updateAccount,
    changePassword,
    activeStatusUser,
    checkUserPassword,
    getAccountIdByEmail,
    logout,
    checkLoginStatus,
    adminCommand,
    checkEmail,
    resetPassword,
} = require('../../controllers/users/comptes');

router
    .route('/')     // registration
    .get(getAllAccount)
    .post(createAccount);

router
    .route('/login')
    .get(checkLoginStatus)
    .post(getAccountIdByEmail);

router
    .route('/logout')
    .get(logout);  
    
router
    .route('/:user_id')
    .get(userIsLogged,getOneAccount)
    .put(updateAccount)
    .patch(checkUserPassword)
    .post(userIsLogged, changePassword);

router  
    .route('/:user_id/active')
    .patch(activeStatusUser);

router
    .route('/:user_id/adm')
    .post(adminCommand);

 router
    .route('/reset/pwd')
    .post(checkEmail)
    .put(resetPassword);
    

module.exports = router;