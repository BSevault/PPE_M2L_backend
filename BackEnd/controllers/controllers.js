const pool = require('../config/database');
const { call } = require('../utils');

module.exports = {
    getSalles: async (_, res) => {
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getSalles();");
            return res.status(200).json({ success: result[0]});
        });
    },

    getOneSalle: async (req, res) => {
        const { id } = req.params;
        await call(res, async (connexion) => {            
            const result = await connexion.query("CALL getOneSalle(?)", [id]);
            return res.status(200).json({ success: result[0] });
        });
    },

    createAccount: async (req, res) => {
        const params = Object.values(req.body); // transform object into array
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL createAccount(?,?,?,?,?,?,?)", params);
            return res.status(200).json({ success: result });
        });
    },

    updateAccount: async (req, res) => {
        const { id } = req.params; // en vrai ça serais plutôt un token qu'une id
        const params = Object.values(req.body);
        params.unshift(id);
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL updateAccount(?,?,?,?,?,?,?,?)", params);
            return res.status(200).json({ success: result });
        });
    },

    getHistoriquePaiement: async (req, res) => {
        const { id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getHistoriquePaiement(?)", [id] )
            return res.status(200).json({ success: result[0] })
        });
    }

}