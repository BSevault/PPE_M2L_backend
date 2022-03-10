USE M2L_DB;

DELIMITER //

------------------------------USERS ACCOUNT--------------------------------------


-- create user // ok route
CREATE OR REPLACE PROCEDURE createAccount(IN p_nom VARCHAR(255), IN p_prenom VARCHAR(255), IN p_email VARCHAR(255), IN p_tel VARCHAR(50), IN p_password VARCHAR(255), IN p_ddn VARCHAR(255), IN p_adresse VARCHAR(255))
BEGIN
	INSERT INTO USERS(nom, prenom, email, tel, password, ddn, adresse)
	VALUES (p_nom, p_prenom, p_email, p_tel, SHA1(p_password), p_ddn, p_adresse);
END //

-- update user // ok route
CREATE OR REPLACE PROCEDURE updateAccount(IN p_id int, IN p_nom VARCHAR(255), IN p_prenom VARCHAR(255), IN p_email VARCHAR(255), IN p_tel VARCHAR(50), IN p_ddn VARCHAR(255), IN p_adresse VARCHAR(255))
BEGIN
	UPDATE USERS
	SET
		nom = p_nom, prenom = p_prenom, email = p_email, tel = p_tel, ddn = p_ddn, adresse = p_adresse
	WHERE
		id = p_id;
END //

-- update user password
CREATE OR REPLACE PROCEDURE changePassword(IN p_id INT, IN p_old_password VARCHAR(255), IN p_new_password VARCHAR(255))
BEGIN
	UPDATE USERS
	SET
		password = SHA1(p_new_password)
	WHERE
		id = p_id AND SHA1(p_old_password) = password;
END //

-- active status user // ok route
CREATE OR REPLACE PROCEDURE activeStatusUser(IN p_user_id int)
BEGIN
	UPDATE USERS
	SET
		is_active = !is_active
	WHERE id = p_user_id;
END //

-- get users // ok route
CREATE OR REPLACE PROCEDURE getAllAccount()
BEGIN
	SELECT id, nom, prenom, email, tel, ddn, adresse FROM USERS;
END //

-- get user // ok route
CREATE OR REPLACE PROCEDURE getOneAccount(IN p_user_id int)
BEGIN
    SELECT id, nom, prenom, email, tel, ddn, adresse, is_active FROM USERS WHERE id = p_user_id;
END //

-- check user password (authentification) // ok route
CREATE OR REPLACE PROCEDURE checkUserPassword(IN p_id INT, IN p_password VARCHAR(255))
NOT DETERMINISTIC CONTAINS SQL
BEGIN
    SELECT id FROM USERS
    WHERE USERS.id = p_id AND password = SHA1(p_password);
END //

-- get one user by email and password when log in
CREATE OR REPLACE PROCEDURE getAccountIdByEmail(IN p_email VARCHAR(255))
BEGIN
    SELECT id FROM USERS 
	WHERE email = p_email;
END //
    




------------------------------USERS PAIEMENT--------------------------------------


-- create user paiement // route ok
CREATE OR REPLACE PROCEDURE createUserPayment(IN p_id_user INT, IN p_qte INT, IN p_id_reservation INT, IN p_id_produit INT)
NOT DETERMINISTIC CONTAINS SQL
BEGIN
	IF p_id_produit != 1
	THEN
		INSERT INTO PAIEMENTS (qte, id_user, id_reservation, id_produit, total)
		VALUES (p_qte, p_id_user, p_id_reservation, p_id_produit,
		(
			SELECT p_qte*p.prix FROM PRODUITS p
			WHERE p_id_produit = p.id
		));
	ELSE
		UPDATE RESERVATIONS r
		SET r.is_paid = 1
		WHERE p_id_reservation = r.id;
		INSERT INTO PAIEMENTS (qte, id_user, id_reservation, id_produit, total)
		VALUES (1, p_id_user, p_id_reservation, p_id_produit,
		(
			SELECT s.prix FROM SALLES s, RESERVATIONS r
			WHERE p_id_reservation = r.id
			AND r.id_salle = s.id
		));
		
	END IF;
END //


-- get user payments services (historique) // route ok
CREATE OR REPLACE PROCEDURE getServicesPaymentsByUserId(IN p_user_id INT)
NOT DETERMINISTIC CONTAINS SQL
BEGIN
	SELECT p.id, p.qte, p.total, p.id_reservation, p.id_produit
	FROM PAIEMENTS p
	WHERE p_user_id = p.id_user
	AND p.id_produit IS NOT NULL;
END //

    -- get user payments salles (liste des resa non payées) // à router
CREATE OR REPLACE PROCEDURE getAccountResaToPay()
BEGIN
	SELECT u.id, u.nom, u.prenom, u.email, u.tel, u.ddn, u.adresse, r.id, r.date_resa, s.nom, s.prix
	FROM USERS u
	INNER JOIN RESERVATIONS r
	ON u.id = r.id_user
	INNER JOIN SALLES s
	ON r.id_salle = s.id
	WHERE r.is_paid = 0;
END //

-- voir ses historiques paiements groupés par reservation - pertinent ?
CREATE OR REPLACE PROCEDURE getHistoriquePaiement (IN p_user_id int)
BEGIN
	SELECT s.nom, r.date_resa, SUM(p.total), r.is_paid FROM PAIEMENTS p
	INNER JOIN RESERVATIONS r
	ON p.id_reservation = r.id
	INNER JOIN SALLES s
	ON r.id_salle = s.id
	WHERE p.id_user = p_user_id
	GROUP BY p.id_reservation;
END //



    




------------------------------USERS RESERVATION------------------------------------


CREATE OR REPLACE PROCEDURE getAllReservations ()
BEGIN
	SELECT date_resa, is_paid, id_user, id_salle FROM RESERVATIONS;
END //

-- create user reservation // ok route
CREATE OR REPLACE PROCEDURE createReservation (IN p_date VARCHAR(255), IN p_user_id int, IN p_salle_id int, IN p_is_paid BOOLEAN)
BEGIN
	INSERT INTO RESERVATIONS (date_resa, id_user, id_salle, is_paid) VALUES (p_date, p_user_id, p_salle_id, p_is_paid);
	CALL createParticipation (p_user_id, (SELECT id FROM RESERVATIONS WHERE date_resa = p_date AND id_user = p_user_id AND id_salle = P_salle_id));
END //

-- update user reservation (set is_paid via pay reservation) // ok route
CREATE OR REPLACE PROCEDURE updateReservation (IN p_date VARCHAR(255), IN p_resa_id int, IN p_salle_id int)
BEGIN
	UPDATE RESERVATIONS 
	SET date_resa = p_date, id_salle = p_salle_id
	WHERE id = p_resa_id;
END //

-- pay reservation
CREATE OR REPLACE PROCEDURE toggleReservationIsPaid (IN p_date VARCHAR(255), IN p_salle_id INT, IN p_user_id INT)
BEGIN
	UPDATE RESERVATIONS
	set is_paid = !is_paid
	WHERE date_resa = p_date AND id_salle = p_salle_id AND id_user = p_user_id;
END //

-- delete user reservation (bloqué post date du jour) // ok route
	-- // autre solution possible : declare salle id 1 as deleted/inactive salles
CREATE OR REPLACE PROCEDURE deleteReservation (IN p_user_id INT, IN p_resa_id INT)
BEGIN
	DELETE FROM RESERVATIONS
	WHERE id = p_resa_id AND id_user = p_user_id AND date_resa > DATE(NOW());
END //

-- voir ses réservations // ok route
CREATE OR REPLACE PROCEDURE getReservations (IN p_user_id int)
BEGIN
	SELECT r.id, s.nom, r.date_resa, r.is_paid FROM RESERVATIONS r
	INNER JOIN SALLES s
	ON r.id_salle = s.id
	WHERE r.id_user = p_user_id;
END //

    -- voir les comptes qui ont une reservation à venir (admin)
		-- buggée mais innutile pour l'instant
-- CREATE OR REPLACE PROCEDURE getAccountResa()
-- BEGIN
-- 	SELECT u.id, u.nom, u.prenom, u.email, u.tel, u.ddn, u.adresse 
-- 	FROM users u
-- 	INNER JOIN reservations r
-- 	ON u.id = r.id
-- 	WHERE date_resa >= DATE(NOW())
-- END //

-- get user reservations (participants: (nom/prénom))
CREATE OR REPLACE PROCEDURE getUserReservations (IN p_user_id INT)
BEGIN
	SELECT r.id, s.nom, s.description, r.date_resa, s.prix, is_paid  FROM RESERVATIONS r
	INNER JOIN SALLES s
	ON r.id_salle = s.id
	WHERE r.id_user = p_user_id;
END //

    -- reservations avant date du jour (exclus) 
CREATE OR REPLACE PROCEDURE getBeforeReservation (IN p_user_id int)
BEGIN
	SELECT r.id, s.nom, s.description, r.date_resa, s.prix, is_paid  FROM RESERVATIONS r
	INNER JOIN SALLES s
	ON r.id_salle = s.id
	WHERE r.id_user = p_user_id AND date_resa < DATE(NOW());
END //

    -- reservations après date du jour (inclus)
CREATE OR REPLACE PROCEDURE getFutureReservation (IN p_user_id int)
BEGIN
	SELECT r.id, s.nom, s.description, r.date_resa, s.prix, is_paid  FROM RESERVATIONS r
	INNER JOIN SALLES s
	ON r.id_salle = s.id
	WHERE r.id_user = p_user_id AND date_resa >= DATE(NOW());
END //

-- get réservation covid_state (renvois liste booleen etat covid participants, si 1 covid_state = 1 backend)
CREATE OR REPLACE PROCEDURE getReservationCovid (IN p_id_resa INT)
BEGIN
	SELECT covid_positive FROM PARTICIPANTS
	WHERE covid_positive = 1 AND id_reservation = p_id_resa;  
END //

-- CREATE OR REPLACE PROCEDURE getReservationsCancel()
-- BEGIN
-- 	SELECT r.id as id_reservation, s.nom as nom_salle, r.date_resa, r.motif_annul FROM reservations r
-- 	INNER JOIN salles s
-- 	ON r.id_salle = s.id
-- 	WHERE is_annule = 1;
-- END //




------------------------------USERS PARTICIPANTS------------------------------------


-- get user participations (réservation: (nom_salle, date, admin_resa(nom/prenom)))
CREATE OR REPLACE PROCEDURE getUserParticipations (IN p_user_id INT)
BEGIN
	SELECT s.nom nom_salle, r.date_resa, u.nom, u.prenom FROM RESERVATIONS r
	INNER JOIN PARTICIPANTS p
	ON p.id_reservation = r.id
	INNER JOIN SALLES s
	ON r.id_salle = s.id
	INNER JOIN USERS u
	ON u.id = r.id_user
	WHERE p_user_id = p.id_user;
END //

    -- participations avant date du jour (exclus)
CREATE OR REPLACE PROCEDURE getUserParticipationBefore (IN p_user_id INT)
BEGIN
	SELECT s.nom nom_salle, r.date_resa, u.nom, u.prenom FROM RESERVATIONS r
	INNER JOIN PARTICIPANTS p
	ON p.id_reservation = r.id
	INNER JOIN SALLES s
	ON r.id_salle = s.id
	INNER JOIN USERS u
	ON u.id = r.id_user
	WHERE p_user_id = p.id_user AND r.date_resa < DATE(NOW());
END //
        
    -- participations après date du jour (inclus)
CREATE OR REPLACE PROCEDURE getUserParticipationAfter (IN p_user_id INT)
BEGIN
	SELECT s.nom nom_salle, r.date_resa, u.nom, u.prenom FROM RESERVATIONS r
	INNER JOIN PARTICIPANTS p
	ON p.id_reservation = r.id
	INNER JOIN SALLES s
	ON r.id_salle = s.id
	INNER JOIN USERS u
	ON u.id = r.id_user
	WHERE p_user_id = p.id_user AND r.date_resa >= DATE(NOW());
END //

-- create user participation
CREATE OR REPLACE PROCEDURE createParticipation (IN p_id_user INT, IN p_id_resa INT)
BEGIN
	INSERT INTO PARTICIPANTS (covid_positive, id_user, id_reservation) VALUES (0, p_id_user, p_id_resa);
END //

-- update user participation (set covid state) to delete
CREATE OR REPLACE PROCEDURE updateParticipantCovidState (IN p_id_user INT, IN p_id_reservation INT, IN p_covid_state INT)
BEGIN
	UPDATE PARTICIPANTS
	SET covid_positive = p_covid_state
	WHERE id_user = p_id_user AND id_reservation = p_id_reservation;
END //

-- delete user participation (bloqué post date du jour)
CREATE OR REPLACE PROCEDURE deleteParticipation (IN p_id_user INT, IN p_id_reservation INT)
BEGIN
	DELETE p FROM PARTICIPANTS p
	INNER JOIN RESERVATIONS r
	ON p.id_reservation = r.id
	WHERE p.id_user = p_id_user AND r.id = p_id_reservation and r.date_resa > DATE(NOW());
END //

-- get userTickets (historique)
CREATE OR REPLACE PROCEDURE getUserTickets (IN p_user_id int)
BEGIN
	SELECT t.id, t.date_ticket, t.date_probleme, s.nom, p.nom_produit, t.description
	FROM TICKETS t
	INNER JOIN SALLES s
	ON t.id_salle = s.id
	INNER JOIN PRODUITS p 
	ON t.id_produit = p.id
	WHERE t.id_user = p_user_id;
END //

-- cas covid positif
CREATE OR REPLACE PROCEDURE isCovid (IN p_user_id int, IN p_date_positive DATE)
BEGIN
	UPDATE PARTICIPANTS
	SET covid_positive = 1
    WHERE id_user = p_user_id AND id_reservation IN (
		SELECT id FROM RESERVATIONS
		WHERE date_resa BETWEEN DATE(p_date_positive) AND ADDDATE(DATE(p_date_positive), INTERVAL 10 DAY)
	);
END //

-- get participations with resa_id
CREATE OR REPLACE PROCEDURE getResaParticipants(IN p_resa_id INT)
BEGIN
	SELECT u.id, u.nom, u.prenom, u.email
	FROM USERS u
	INNER JOIN PARTICIPANTS p
	ON u.id = p.id_user
	WHERE p.id_reservation = p_resa_id;

END //




------------------------------USERS TICKETS------------------------------------


-- get userTicket // ok route
CREATE OR REPLACE PROCEDURE getOneUserTicket (IN p_user_id int, IN p_id int)
BEGIN
	SELECT t.date_ticket, t.description, t.date_probleme, s.nom
	FROM TICKETS t
	INNER JOIN SALLES s
	ON t.id_salle = s.id
	WHERE t.id_user = p_user_id AND t.id = p_id;
END //

    -- create // ok route
CREATE OR REPLACE PROCEDURE createUserTicket (IN p_date_probleme date, IN p_description VARCHAR(255), IN p_user_id int)
BEGIN
	INSERT INTO TICKETS (date_ticket, date_probleme, description, id_user, id_salle)
	VALUES (NOW(), p_date_probleme, p_description, p_user_id, (
		SELECT s.id FROM SALLES s 
		INNER JOIN RESERVATIONS r 
		ON s.id = r.id_salle 
		WHERE r.date_resa = date_probleme));
END //


    -- update // ok route 
CREATE OR REPLACE PROCEDURE updateOneUserTicket (IN p_ticket_id int, IN p_date_probleme date, IN p_description VARCHAR(255), IN p_user_id int)
BEGIN
	UPDATE TICKETS
	SET date_probleme = p_date_probleme, description = p_description, id_user = p_user_id
	WHERE id = p_ticket_id;
END //

	-- toggle ticket status
CREATE OR REPLACE PROCEDURE toggleTicketStatus (IN p_ticket_id INT, IN p_user_id INT)
BEGIN
	UPDATE TICKETS
	SET
		statut = !statut
	WHERE id_user = p_user_id AND id = p_ticket_id;
END //


    -- delete // ok route
CREATE OR REPLACE PROCEDURE deleteOneUserTicket (IN p_ticket_id int, IN p_user_id int)
BEGIN
DELETE FROM TICKETS
	WHERE id_user = p_user_id AND id = p_ticket_id;
END //
