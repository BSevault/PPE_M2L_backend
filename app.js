// test https://docs.aws.amazon.com/fr_fr/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html
require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env` });

const express = require('express');
const cors = require('cors');
const session = require('express-session');


const pool = require('./config/database');
const cookieParser = require('cookie-parser');


const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV == 'dev') {
    app.use(cors(
        {
            credentials: true,
            //     origin: [
            //         "http://localhost:3000", "http://192.168.0.61:3000", "http://ec2-15-188-50-121.eu-west-3.compute.amazonaws.com", 
            //     "http://15.188.50.121", "http://192.168.1.46", "http://15.237.109.149:3000", 
            //     "http://172.31.19.222:3000", "http://192.168.0.47:80", "http://192.168.0.47:3000", 
            //     "http://192.168.0.47"
            // ]
            origin: true,
            // origin: 'localhost:3000',
            // methods:['GET', 'POST', 'PUT', 'DELETE'],
        }
    ));
}



app.use(session({
    secret: 'ma_session_super_secret_key',
    // store ?
    saveUninitialized: false,
    resave: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
}));


app.get('/api', (_, res) => {
    res.status(200).json({ success: "Bonjour, vous êtes sur l'api M2L" });
});


const routes_produits = require('./routes/routes_produits');
const routes_salles = require('./routes/routes_salles');
const routes_users_comptes = require('./routes/users/comptes');
const routes_users_paiements = require('./routes/users/paiements');
const routes_users_participations = require('./routes/users/participations');
const routes_users_reservations = require('./routes/users/reservations');
const routes_users_tickets = require('./routes/users/tickets');
// routes flutter
const routes_flutter = require('./routes/flutter/flutter');

const routes_users = require('./routes/routes_users'); // delete this after refacto routes users



app
    .use('/produits', routes_produits)
    .use('/salles', routes_salles)
    .use('/users', routes_users_comptes)
    .use('/users', routes_users_paiements)
    .use('/users', routes_users_participations)
    .use('/users', routes_users_reservations)
    .use('/users', routes_users_tickets)
    // routes flutter
    .use('/flutter', routes_flutter)

    .use('/users', routes_users); // delete this after refacto routes users



    
const PORT = process.env.PORT;
// console.log(PORT);
// console.log(process.env.USER);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});