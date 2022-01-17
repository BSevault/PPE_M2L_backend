USE M2L_DB;

DELIMITER //

-- Voir salles
CREATE OR REPLACE PROCEDURE getSalles ()
BEGIN
	SELECT id, nom FROM salles;
END //


-- Voir une salle / caractéristique
CREATE OR REPLACE PROCEDURE getOneSalle (IN p_nom VARCHAR(255))
BEGIN
	SELECT id, nom, description, capacite, prix FROM salles
	WHERE nom = p_nom;
END //


-- créer un compte 
CREATE OR REPLACE PROCEDURE createAccount(IN p_nom VARCHAR(255), IN p_prenom VARCHAR(255), IN p_email VARCHAR(255), IN p_tel INT, IN p_password VARCHAR(255), IN p_ddn VARCHAR(255), IN p_adress VARCHAR(255))
BEGIN
	INSERT INTO users(nom, prenom, email, tel, password, ddn, adress)
	VALUES (p_nom, p_prenom, p_email, p_tel, p_password, p_ddn, p_adress);
END //


-- gérer son compte
CREATE OR REPLACE PROCEDURE updateAccount(IN p_id int, IN p_nom VARCHAR(255), IN p_prenom VARCHAR(255), IN p_email VARCHAR(255), IN p_tel INT, IN p_password VARCHAR(255), IN p_ddn VARCHAR(255), IN p_adress VARCHAR(255))
BEGIN
	UPDATE USERS
	SET
		nom = p_nom, prenom = p_prenom, email = p_email, tel = p_tel, password = p_password, ddn = p_ddn, adress = p_adress
	WHERE
		id = p_id;
END //


-- supprimer un compte (admin)
CREATE OR REPLACE PROCEDURE deleteAccount(IN p_user_id int)
BEGIN
	DELETE FROM users
	WHERE id = p_user_id;
END //


-- voir les comptes (admin)
CREATE OR REPLACE PROCEDURE getAllAccount()
BEGIN
	SELECT id, nom, prenom, email, tel, ddn, adresse FROM users;
END //


-- voir un compte (admin)
CREATE OR REPLACE PROCEDURE getOneAccount(IN p_user_id int)
BEGIN
	SELECT id, nom, prenom, email, tel, ddn, adresse FROM users WHERE id = p_user_id;
END //


-- voir les comptes qui ont une reservation à venir (admin)
CREATE OR REPLACE PROCEDURE getAccountResa(IN p_date_resa int)
BEGIN
	SELECT u.id, u.nom, u.prenom, u.email, u.tel, u.ddn, u.adresse 
	FROM users u
	INNER JOIN reservations r
	ON u.id = r.id
	WHERE date_resa > p_date_resa;
END //


-- voir les comptes qui ont une reservation à payer (admin)
CREATE OR REPLACE PROCEDURE getAccountResaToPay()
BEGIN
	SELECT u.id, u.nom, u.prenom, u.email, u.tel, u.ddn, u.adresse, r.id, r.date_resa, s.nom, s.prix
	FROM users u
	INNER JOIN reservations r
	ON u.id = r.id
	INNER JOIN salles s
	ON r.id_salle = s.id
	WHERE r.is_paid = 0;
END //


-- voir l'historique paiements salles
CREATE OR REPLACE PROCEDURE getHistoriquePaiementSalle (IN p_user_id int)
BEGIN
	SELECT s.nom, r.date_resa, SUM(p.total), r.is_paid FROM paiements p
	INNER JOIN reservations r
	ON p.id_reservation = r.id
	INNER JOIN salles s
	ON r.id_salle = s.id
	WHERE p.id_user = p_user_id AND p.id_produit = null
	GROUP BY p.id_reservation;
END //


-- voir l'historique des paiements produits
CREATE OR REPLACE PROCEDURE getHistoriquePaiementProduit (IN p_user_id int)
BEGIN
	SELECT s.nom, r.date_resa, pr.nom_produit, p.qte, p.total, r.is_paid  FROM paiement p
	INNER JOIN reservations r
	ON p.id_reservation = r.id
	INNER JOIN salles s
	ON r.id_salle = s.id
	INNER JOIN produits pr
	ON p.id_produit = pr.id
	WHERE p.id_user = p_user_id AND p.qte > 1;
END //


-- créer une réservation
CREATE OR REPLACE PROCEDURE createReservation (IN p_date VARCHAR(255), IN p_user_id int, IN p_salle_id int)
BEGIN
	INSERT INTO reservations (date_resa, id_user, id_salle) VALUES (p_date, p_user_id, p_salle_id);
END //


-- modifier une réservation
CREATE OR REPLACE PROCEDURE updateReservation (IN p_date VARCHAR(255), IN p_user_id int, IN p_salle_id int)
BEGIN
	UPDATE reservations 
	SET date_resa = p_date, id_salle = p_salle_id
	WHERE id_user = p_user_id;
END //


-- supprimer une réservation
CREATE OR REPLACE PROCEDURE deleteReservation (IN p_date VARCHAR(255), IN p_user_id int, IN p_salle VARCHAR(255))
BEGIN
	DELETE r FROM reservations r
	INNER JOIN salles s
	ON s.nom = p_salle
	WHERE id_user = p_user_id AND date_resa = p_date;
END //


-- voir ses réservations
CREATE OR REPLACE PROCEDURE getReservation (IN p_user_id int)
BEGIN
	SELECT s.nom, r.date_resa, r.is_paid FROM reservations r
	INNER JOIN salles s
	ON r.id_salle = s.id
	WHERE r.id_user = p_user_id;
END //


-- voir ses réservations à payer
CREATE OR REPLACE PROCEDURE getReservationToPay (IN p_user_id int)
BEGIN
	SELECT s.nom, r.date_resa, s.prix FROM reservations r
	INNER JOIN salles s
	ON r.id_salle = s.id
	WHERE r.is_paid = 0;
END //


-- voir ses réservations à venir
CREATE OR REPLACE PROCEDURE getFuturReservation (IN p_user_id int)
BEGIN
	SELECT s.nom, s.description, r.date_resa, s.prix, is_paid  FROM reservations r
	INNER JOIN salles s
	ON r.id_salle = s.id
	WHERE date_resa > DATE(NOW());
END //


-- voir les participants à une réservation
CREATE OR REPLACE PROCEDURE getParticipants (IN p_resa_id int)
BEGIN
	SELECT s.nom, r.date_resa, u.prenom, u.nom 
	FROM participants p
	INNER JOIN reservation r
	ON p.id_reservation = r.id
	INNER JOIN salles s
	ON r.id_salle = s.id;
END //

-- ajouter des participants 
CREATE OR REPLACE PROCEDURE addParticipant (IN p_user_id int, IN p_resa_id int)
BEGIN
	INSERT INTO participants (covid_positive, id_user, id_reservation)
	VALUES (DEFAULT, p_user_id, p_resa_id);
END //

-- cas covid positif
CREATE OR REPLACE PROCEDURE isCovid (IN p_user_id int)
BEGIN
	UPDATE participants
	SET covid_positive = 1
    WHERE id_user = p_user_id AND id_reservation IN (
		SELECT id FROM reservations
		WHERE date_resa > DATE(NOW())
	);
END //

-- get userTickets (historique)
CREATE OR REPLACE PROCEDURE getUserTickets (IN p_user_id int)
BEGIN
	SELECT t.date_ticket, t.description, t.date_probleme, s.nom
	FROM tickets t
	INNER JOIN salles s
	ON t.id_salle = s.id
	WHERE t.id_user = p_user_id;
END //


-- get userTicket
CREATE OR REPLACE PROCEDURE getOneUserTicket (IN p_user_id int, IN p_id int)
BEGIN
	SELECT t.date_ticket, t.description, t.date_probleme, s.nom
	FROM tickets t
	INNER JOIN salles s
	ON t.id_salle = s.id
	WHERE t.id_user = p_user_id AND t.id = p_id;
END //

    -- create
CREATE OR REPLACE PROCEDURE createUserTicket (IN p_date_ticket date, IN p_date_probleme date, IN p_description VARCHAR(255), IN p_user_id int, IN )
BEGIN
	INSERT INTO tickets (date_ticket, date_probleme, description, id_user, id_salle)
	VALUES (DATE(NOW()), p_date_probleme, p_description, p_user_id, (
		SELECT s.id FROM salles s 
		INNER JOIN reservations r 
		ON s.id = r.id_salle 
		WHERE r.date_resa = date_probleme));
END //
    -- update

    -- delete
