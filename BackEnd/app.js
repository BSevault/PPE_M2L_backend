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
const routes_produits = require('./routes/routes_produits');
app.use('/produits', routes_produits);
const routes_salles = require('./routes/routes_salles');
app.use('/salles', routes_salles);
const routes_users = require('./routes/routes_users');
app.use('/users', routes_users);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});