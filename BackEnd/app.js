require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env`});

const express = require('express');
const cors = require('cors');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.status(200).json({success: "Bonjour, vous êtes sur l'api M2L"});
});


const routes = require('./routes/routes');
app.use('/api', routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});