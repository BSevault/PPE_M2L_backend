const { call } = require('../../utils');

module.exports = {

    createUserPayment: async (req, res) => {
        const { user_id } = req.params;
        const params = Object.values(req.body);
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL createUserPayment(?,?,?,?)", [user_id,...params] )
            return res.status(200).json({ success: result });
        });
    },

    getHistoriquePaiement: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getHistoriquePaiement(?)", [user_id] )
            return res.status(200).json({ success: result[0] });
        });
    }

}