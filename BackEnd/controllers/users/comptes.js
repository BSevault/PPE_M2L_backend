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
        })

    },

    checkUserPassword: async (req, res) => {
        const { user_id } = req.params;
        const { password } = req.body;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL checkUserPassword(?,?)", [user_id, password]);

            console.log(result[0][0].id);
            if (result[0][0].id) {
                return res.status(200).json({ success: `Le `});
            } else {
                return res.status(200).json({ success: `Le compte est activé`});
            }
        }) 
    }
    
    

}