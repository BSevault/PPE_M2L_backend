const { call } = require('../utils');

module.exports = {
    // squelette
    getAllSalles: async (_, res) => {
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getAllSalles();");
            console.log(result[0]);
            return res.status(200).json({ success: result[0]});
        });
    },

    getActiveSalles: async (_, res) => {
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getActiveSalles();");
            console.log(result[0]);
            return res.status(200).json({ success: result[0] });
        });
    },
    
    getOneSalle: async (req, res) => {
        const { salle_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getOneSalle(?)", [salle_id]);
            return res.status(200).json({ success: result[0] });
        });
    },

    getSalleResas: async (req, res) => {
        const { salle_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL getSalleResas(?)", [salle_id]);
            return res.status(200).json({ success: result[0] });
        });
    },

    createSalle: async (req, res) => {
        const params = Object.values(req.body);
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL createSalle(?,?,?,?,?)", params);
            return res.status(200).json({ success: result });
        });
    },

    updateSalle: async (req, res) => {
        const { salle_id } = req.params;
        const params = Object.values(req.body);
        params.unshift(salle_id);
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL updateSalle(?,?,?,?,?,?)", params);
            return res.status(200).json({ success: result });
        });
    },

    toggleStatusSalle: async (req, res) => {
        const { salle_id } = req.params;
        await call(res, async (connexion) => {
            const result = await connexion.query("CALL toggleStatusSalle(?)", [salle_id]);
            return res.status(200).json({ success: result });
        });
    }

}