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


const routes_produits = require('./routes/routes_produits');
const routes_salles = require('./routes/routes_salles');
const routes_users_comptes = require('./routes/users/comptes');
const routes_users_paiements = require('./routes/users/paiements');
const routes_users_participations = require('./routes/users/participations');
const routes_users_reservations = require('./routes/users/reservations');
const routes_users_tickets = require('./routes/users/tickets');

const routes_users = require('./routes/routes_users'); // delete this after refacto routes users



app
    .use('/produits', routes_produits)
    .use('/salles', routes_salles)
    .use('/users/comptes', routes_users_comptes)
    .use('/users/paiements', routes_users_paiements)
    .use('/users/participations', routes_users_participations)
    .use('/users/reservations', routes_users_reservations)
    .use('/users/tickets', routes_users_tickets)

    .use('/users', routes_users); // delete this after refacto routes users


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});