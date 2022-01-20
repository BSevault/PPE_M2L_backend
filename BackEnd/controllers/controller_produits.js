const { call } = require('../utils');

module.exports = {
    // squelette
    getSalles: async (_, res) => {
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getSalles();");
            return res.status(200).json({ success: result[0]});
        });
    }
}