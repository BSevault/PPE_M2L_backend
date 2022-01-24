const router = require('express-promise-router')();

const {
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

module.exports = router;