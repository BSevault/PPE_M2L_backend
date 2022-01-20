const router = require('express-promise-router')();

const {
<<<<<<< HEAD
    getAllSalles
} = require('../controllers/controller_salles');

router
    .route('/')
    .get(getAllSalles)
=======
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    updateProductQtyById,
    toggleProductIsActiveById
} = require('../controllers/controller_produits');

router
    .route('/')
    .get(getAllProducts)
    .post(createProduct)
    

router
    .route('/:id')
    .get(getProductById)
    .put(updateProductById)
    .patch(updateProductQtyById)
    .delete(toggleProductIsActiveById)
>>>>>>> 2d88c21315e6f719c551b8df9906851c80cb3a9d

module.exports = router;