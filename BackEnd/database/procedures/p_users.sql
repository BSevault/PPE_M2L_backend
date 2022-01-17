USE M2L_DB;

DELIMITER //

-- get users

-- get user
    -- check user password (authentification)
    -- get user payments services (historique)
    -- get user payments salles (historique)
-- create user
-- update user
-- delete user

-- create user paiement

-- get user reservations (participants: (nom/prénom))
    -- reservations avant date du jour (exclus) 
    -- reservations après date du jour (inclus)

-- create user reservation
-- update user reservation (set is_paid via create paiement)
-- delete user reservation (bloqué post date du jour)


-- get user participations (réservation: (nom_salle, date, admin_resa(nom/prenom)))
    -- participations avant date du jour (exclus)
        -- get réservation covid_state (renvois liste booleen etat covid participants, si 1 covid_state = 1 backend)
    -- participations après date du jour (inclus)

-- create user participation
-- update user participation (set covid state)
-- delete user participation (bloqué post date du jour)

-- get userTickets (historique)

-- get userTicket
    -- create
    -- update
    -- delete



