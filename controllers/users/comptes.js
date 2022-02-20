const { isInteger } = require('lodash');
const { call } = require('../../utils');

module.exports = {

    // ------ USERS -------

    getAllAccount : async ( _ , res) => {
        await call(res, async (connexion) => {

            const result = await connexion.query("CALL getAllAccount()");
            return res.status(200).json({ success: result[0]});
        });
    },

    getOneAccount : async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) =>{

            const result = await connexion.query("CALL getOneAccount(?)", [user_id]);
            return res.status(200).json({ success: result[0]});

        });
    },

    getAccountIdByEmail : async (req, res) => {
        const { email, password } = req.body;
        await call(res, async (connexion) =>{

            const resultId = await connexion.query("CALL getAccountIdByEmail(?)", [email]);
            const id_user = resultId[0][0].id;

            if (isInteger(id_user) && resultId[0].length === 1) {
                const checkPwd = await connexion.query("CALL checkUserPassword(?,?)", [id_user, password]);

                if (checkPwd[0][0] != undefined && id_user === checkPwd[0][0].id) {
                    const user = await connexion.query("CALL getOneAccount(?)", [id_user]);
                    return res.status(200).json({ success: user[0][0]});
                }
            }

            return res.status(401).json({ error: "Email ou mot de passe invalide" });
        });
    },

    createAccount: async (req, res) => {
        const params = Object.values(req.body); // transform object into array
        await call(res, async (connexion) => {

            const checkEmail = await connexion.query("CALL getAccountIdByEmail(?)", [ params[2] ]);
            console.log(checkEmail[0][0]);
            if (checkEmail[0][0] === undefined) {

                const result = await connexion.query("CALL createAccount(?,?,?,?,?,?,?)", params);
                return res.status(200).json({ success: result });
            }

            return res.status(401).json({ error: "Un compte est déjà ouvert avec cette email" });
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

    activeStatusUser: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            await connexion.query("CALL activeStatusUser(?)", [ user_id ]);
            const result = await connexion.query("CALL getOneAccount(?)", [user_id]);

            if (result[0][0].is_active == 0) {
                return res.status(200).json({ success: `Le compte a été desactivé`});
            } else {
                return res.status(200).json({ success: `Le compte est activé`});
            }
        });
    },

    checkUserPassword: async (req, res) => {
        const { user_id } = req.params;
        const { password } = req.body;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL checkUserPassword(?,?)", [user_id, password]);

            console.log(result);
            if (result[0][0]) {
                return res.status(200).json({ success: `Password valide`});
            } else {
                return res.status(400).json({ error: `Password invalide`});
            }

        });
    }
    
    

}