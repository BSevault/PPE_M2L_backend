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
        const { date, salle_id, resa_id } = req.body;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL updateReservation(?,?,?)", [date, resa_id, salle_id]);
            return res.status(200).json({ success: result });
        });
    },

    deleteReservation: async (req, res) => {
        const { user_id } = req.params;
        const { resa_id } = req.body; 
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL deleteReservation(?,?)", [user_id, resa_id]);
            return res.status(200).json({ success: result });
        });
    },

    toggleReservationIsPaid: async (req, res) => {
        const { user_id } = req.params;
        const { date, salle_id } = req.body;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL toggleReservationIsPaid(?,?,?)", [date, salle_id, user_id]);
            return res.status(200).json({ success: result });
        });
    },

    getBeforeReservation: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getBeforeReservation(?)", [user_id]);
            return res.status(200).json({ success: result });
        });
    },

    getFutureReservation: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getFutureReservation(?)", [user_id]);
            return res.status(200).json({ success: result });
        });
    },

    getReservationCovid: async (req, res) => {
        const { resa_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getReservationCovid(?)", [resa_id]);
            return res.status(200).json({ success: result });
        });
    }
    
}