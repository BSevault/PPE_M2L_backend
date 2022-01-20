const { call } = require('../utils');

module.exports = {
    // squelette
    getAllSalles: async (_, res) => {
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getAllSalles();");
            return res.status(200).json({ success: result[0]});
        });
    }
}