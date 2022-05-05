// test https://docs.aws.amazon.com/fr_fr/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html
require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env` });

const express = require('express');
const cors = require('cors');
const session = require('express-session');
// const cookieSession = require('cookie-session');
const MariaDBStore = require('express-session-mariadb-store');
// const MySQLStore = require('express-mysql-session')(session);
const pool = require('./config/database');
// const cookieParser = require('cookie-parser');


const app = express();

//middleware
app.use(express.json());
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
        // methods:['GET', 'POST', 'PUT', 'DELETE'],
    }
));
app.set('trust proxy', 1)
// app.use(cookieParser());

// store bundle
// ============================
// var options = {
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// }
// var sessionStore = new MySQLStore(options);
// =============================

app.use(session({
    // =========================
    store: new MariaDBStore({ pool: pool }),
    // store: sessionStore,
    // =========================
    secret: 'ma_session_super_secret_key',
    // proxy: true,
    saveUninitialized: false,
    resave: false,
    cookie: { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 * 24, secure: true, sameSite: 'none' },
    rolling: true,
     // secure: false
}));

// app.use(cookieSession({
//     name: 'session',
//     secret: 'cat on keyboard',
//     // sameSite: 'none',
//     // secure: true,
//     // Cookie Options
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }))

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