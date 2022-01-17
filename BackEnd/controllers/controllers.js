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
        const { user_id } = req.params; // en vrai ça serais plutôt un token qu'une id
        const params = Object.values(req.body);
        params.unshift(user_id);
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL updateAccount(?,?,?,?,?,?,?,?)", params);
            return res.status(200).json({ success: result });
        });
    },

    getHistoriquePaiement: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getHistoriquePaiement(?)", [user_id] )
            return res.status(200).json({ success: result[0] });
        });
    },

    getReservation: async (req, res) => {
        const { user_id } = req.params;
        await call(res,  async (connexion) => {
            const result = await connexion.query("CALL getReservation(?)", [user_id]);
            return res.status(200).json({ success: result[0]});
        });
    },

    createReservation: async (req, res) => {
        const { user_id } = req.params;
        const { date, salle_id, is_paid } = req.body;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL createReservation(?,?,?,?)", [date, user_id, salle_id, is_paid]);
            return res.status(200).json({ success: result });
        });
    },

    updateReservation: async (req, res) => {
        const { user_id } = req.params;
        const { date, salle_id } = req.body; // nous faudra une procédure pour payer
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL updateReservation(?,?,?)", [date, user_id, salle_id]);
            return res.status(200).json({ success: result });
        });
    },

    deleteReservation: async (req, res) => {
        const { user_id } = req.params;
        const { date, salle } = req.body; // Plus simple avec l'id salle peut être
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL deleteReservation(?,?,?)", [date, user_id, salle]);
            return res.status(200).json({ success: result });
        });
    }

}