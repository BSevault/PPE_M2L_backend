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
        const { nom, prenom, email, tel, password, ddn, adresse } = req.body;
        const params = [nom, prenom, email, tel, password, ddn, adresse]
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL createAccount(?,?,?,?,?,?,?)", params);
            return res.status(200).json({ success: result })
        })
    }

}