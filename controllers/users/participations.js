const { call } = require('../../utils');

module.exports = {

    createParticipant: async (req, res) => {
        const { resa_id, email } = req.body;
        await call(res, async (connexion) => {

            const checkEmail = await connexion.query("CALL getAccountIdByEmail(?)", [email]);
            if (checkEmail[0][0] === undefined) {
                return res.status(401).json({ error: "Un compte est déjà ouvert avec cette email" });
            }
            const result = await connexion.query("CALL createParticipation(?,?)", [email, resa_id])
            return res.status(200).json({ success: result });
        });
    },

    getParticipations: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getUserParticipations(?)", user_id)
            if (result[0].length < 1) {
                return res.status(300).json({ error: "Aucune participation" });
            } else {
                return res.status(200).json({ success: result[0] });
            }
        });
    },

    getUserParticipationBefore: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getUserParticipationBefore(?)", user_id)
            if (result[0].length < 1) {
                return res.status(300).json({ error: "Aucune participation" });
            } else {
                return res.status(200).json({ success: result[0] });
            }
        });
    },

    getUserParticipationAfter: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getUserParticipationAfter(?)", user_id)
            if (result[0].length < 1) {
                return res.status(300).json({ error: "Aucune participation" });
            } else {
                return res.status(200).json({ success: result[0] });
            }
        });
    },

    updateParticipantCovidState: async (req, res) => {
        const { user_id } = req.params;
        const { date_positive } = req.body
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL isCovid(?,?)", [user_id, date_positive])
            return res.status(200).json({ success: result });
        });
    },

    deleteParticipation: async (req, res) => {
        const { user_id, resa_id } = req.body
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL deleteParticipation(?,?)", [user_id, resa_id])
            return res.status(200).json({ success: result });
        });
    }

}