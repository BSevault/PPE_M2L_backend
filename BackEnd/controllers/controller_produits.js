const { call } = require('../utils');

module.exports = {
    // squelette
    getAllProducts: async (_, res) => {
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getAllProducts();");
            return res.status(200).json({ success: result[0]});
        });
    }
}