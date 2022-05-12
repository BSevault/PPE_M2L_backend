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
            if (result[0].length < 1) {
                return res.status(300).json({ error: "Aucune Réservations" });
            } else {
                return res.status(200).json({ success: result });
            }
        });
    },

    getBeforeReservation: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getBeforeReservation(?)", [user_id]);
            return res.status(200).json({ success: result });
        });
    },

    getUserParticipationBefore: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getUserParticipationBefore(?)", user_id)
            if (result[0].length < 1) {
                return res.status(300).json({ error: "Aucune participation" });
            } else {
                return res.status(200).json({ success: result });
            }
        });
    },

    getResaParticipants: async (req, res) => {
        const { id_resa } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getResaParticipants(?)", [id_resa] )
            return res.status(200).json({ success: result });
        });
    },

    updatePresentParticipations : async (req, res) => {
        const { id_resa } = req.params;
        const { id_user, is_present } = req.body;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL updateIsPresentParticipants(?,?,?)", [id_resa, id_user, is_present]);
            return res.status(200).json({ success: result });
        })
    },

    updateCheckResa : async (req, res) => {
        const { user_id } = req.params;
        const { id_resa } = req.body;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL updateCheckResa(?,?)", [id_resa, user_id]);
            return res.status(200).json({ success: result });
        });
    },

    isCovid: async (req, res) => {
        const { user_id } = req.params;
        const { date_resa } = req.body;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL isCovid(?,?)", [user_id, date_resa]);
            return res.status(200).json({ success: result });
        });
    },

    // ------ PRODUITS -------

    getAllProducts: async ( _ , res) => {
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getAllProducts()");
            return res.status(200).json({success: result});
        });
    },

    createProductPayment: async (req, res) => {
        const { user_id, resa_id } = req.params;
        const { qte, produit_id } = req.body;
        await call (res, async (connexion) => {
            const result = await connexion.query("CALL createUserPayment(?,?,?,?)", [user_id, qte, resa_id, produit_id]);
            return res.status(200).json({success: result});
        });
    }

}

