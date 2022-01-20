const { call } = require('../utils');

module.exports = {

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

    getUserTickets : async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getUserTickets(?)", [user_id]);
            return res.status(200).json({ success: result[0] });
        });
    },

    getOneUserTicket : async (req, res) => {
        const { user_id, ticket_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query('CALL getOneUserTicket(?,?)', [user_id, ticket_id]);
            return res.status(200).json({ success: result[0] });
        });
    },

    createUserTicket : async (req, res) => {
        const { user_id } = req.params;
        const { date_probleme, desc_ticket } = req.body;
        await call(res, async (connexion) => {
            await connexion.query("CALL createUserTicket(?,?,?)", [date_probleme, desc_ticket, user_id]);
            return res.status(200).json({ success: "Ticket créé"});
        });
    },

    updateOneUserTicket : async (req, res) => {
        const { user_id, ticket_id } = req.params;
        const { date_probleme, desc_ticket } = req.body;
        await call(res, async (connexion) => {
            await connexion.query("CALL updateOneUserTicket(?,?,?,?)", [ticket_id,date_probleme, desc_ticket, user_id]);
            return res.status(200).json({ success: "Ticket modifié"});
        });
    },

    deleteOneUserTicket: async (req, res) => {
        const { user_id, ticket_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL deleteOneUserTicket(?,?)", [ticket_id, user_id]);

            if (result.affectedRows == 0) {
                return res.status(300).json({ error: "Aucun ticket supprimé" });
            } else {
                return res.status(200).json({ success: `${result.affectedRows} Ticket supprimé`});
            }

        });
    },

    isCovid: async (req, res) => {
        const { user_id } = req.params;
        await call(res, (connexion) => {
            const result = await connexion.query("CALL isCovid(?)", [ user_id ]);
            
            if (result.affectedRows == 0) {
                return res.status(300).json({ error: "Aucun ligne affectée"});
            } else {
                return res.status(200).json({ success: `Status changé sur ${resultresult.affectedRows} réunions`});
            }
        })
    }




}