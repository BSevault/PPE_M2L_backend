const pool = require('../config/database');
const { call } = require('../utils');

module.exports = {
    testGet: (_, res) => {
        return res.status(200).json({ success: "Yep, ça marche"})
    }
}