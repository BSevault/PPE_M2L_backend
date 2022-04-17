const { call } = require('../../utils');
const { isInteger } = require('lodash');

module.exports = {

    // ------ USERS -------

    getAccountIdByEmail: async (req, res) => {
        const { email, password } = req.body;
        await call(res, async (connexion) => {

            const resultId = await connexion.query("CALL getAccountIdByEmail(?)", [email]);
            const id_user = resultId[0][0]?.id;

            if (isInteger(id_user) && resultId[0].length === 1) {
                const checkPwd = await connexion.query("CALL checkUserPassword(?,?)", [id_user, password]);

                if (checkPwd[0][0] != undefined && id_user === checkPwd[0][0].id) {
                    const user = await connexion.query("CALL getOneAccount(?)", [id_user]);
                    if (user[0][0].is_active) {
                        return res.status(200).json({ success: user[0][0] });
                    }
                }
            }

            return res.status(401).json({ error: "Email ou mot de passe invalide" });
        });
    },

    getFutureReservation: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getFutureReservation(?)", [user_id]);
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

    getResaParticipants: async (req, res) => {
        const { id_resa } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getResaParticipants(?)", [id_resa] )
            return res.status(200).json({ success: result });
        });
    },

}