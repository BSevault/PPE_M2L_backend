const { call } = require('../utils');

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



    // ------ RESERVATION -------

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
    },

    // ------ PAIEMENTS -------

    getHistoriquePaiement: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getHistoriquePaiement(?)", [user_id] )
            return res.status(200).json({ success: result[0] });
        });
    },



    // ------ TICKETS -------

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
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL isCovid(?)", [ user_id ]);
            
            if (result.affectedRows == 0) {
                return res.status(400).json({ error: "Aucun ligne affectée"});
            } else {
                return res.status(200).json({ success: `Status changé sur ${result.affectedRows} réunions`});
            }
        })
    },

    activeStatusUser: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL activeStatusUser(?)", [ user_id ]);

            return res.status(200).json({ success: `${result.affectedRows} compte a été desactivé`});

        })

    }




}