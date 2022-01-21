const { call } = require('../../utils');

module.exports = {

    // si paiement d'une réservation, p_id_produit doit être null
    createUserPayment: async (req, res) => {
        const { user_id } = req.params;
        const params = Object.values(req.body);
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL createUserPayment(?,?,?,?)", [user_id,...params] )
            return res.status(200).json({ success: result });
        });
    },

    getServicesPaymentsByUserId: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getServicesPaymentsByUserId(?)", [user_id] )
            return res.status(200).json({ success: result[0] });
        });
    }

}