/*

J'ai pas été assez explicite sur la liste des procédures
On y reviendras avec le front end ça sera plus pertinent je pense

*/

const { call } = require('../../utils');

// ------ RESERVATION -------
module.exports = {
    getReservations: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getReservations(?)", [user_id]);
            return res.status(200).json({ success: result[0] });
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