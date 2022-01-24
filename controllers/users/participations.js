const { call } = require('../../utils');

module.exports = {

    createParticipant: async (req, res) => {
        const { user_id, resa_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL createParticipation(?,?)", [user_id, resa_id] )
            return res.status(200).json({ success: result });
        });
    }, 

    getParticipationsByUserId: async (req, res) => {
        const { user_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getUserParticipations(?)", user_id )
            return res.status(200).json({ success: result[0] });
        });
    }
    
}