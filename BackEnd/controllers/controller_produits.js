const { call } = require('../utils');

module.exports = {
    // squelette
    getAllProducts: async (_, res) => {
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getAllProducts();");
            return res.status(200).json({ success: result[0]});
        });
    },

    getProductById: async (req, res) => {
        const { id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getProductById(?);",[id]);
            return res.status(200).json({ success: result[0]});
        });
    },

    createProduct: async (req, res) => {
        const params = Object.values(req.body);
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL createProduct(?,?,?,?);",params);
            return res.status(200).json({ success: result});
        });
    },

    updateProductById: async (req, res) => {
        const { id }= req.params;
        const params = Object.values(req.body);
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL updateProductById(?,?,?,?,?);",[id,...params]);
            return res.status(200).json({ success: result});
        });
    },

    updateProductQtyById: async (req, res) => {
        const { id }= req.params;
        const params = Object.values(req.body);
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL updateProductById(?,?,?,?,?);",[id,...params]);
            return res.status(200).json({ success: result});
        });
    }, 
    
    toggleProductIsActiveById: async (req, res) => {
        const { id }= req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL toggleProductIsActiveById(?);",[id]);
            return res.status(200).json({ success: result});
        });
    }

}