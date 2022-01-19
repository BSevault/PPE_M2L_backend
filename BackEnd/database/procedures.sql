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
CREATE OR REPLACE PROCEDURE createAccount(IN p_nom VARCHAR(255), IN p_prenom VARCHAR(255), IN p_email VARCHAR(255), IN p_tel VARCHAR(50), IN p_password VARCHAR(255), IN p_ddn VARCHAR(255), IN p_adresse VARCHAR(255))
BEGIN
	INSERT INTO Users(nom, prenom, email, tel, password, ddn, adresse)
	VALUES (p_nom, p_prenom, p_email, p_tel, SHA1(p_password), p_ddn, p_adresse);
END //


-- gérer son compte
CREATE OR REPLACE PROCEDURE updateAccount(IN p_id int, IN p_nom VARCHAR(255), IN p_prenom VARCHAR(255), IN p_email VARCHAR(255), IN p_tel VARCHAR(50), IN p_password VARCHAR(255), IN p_ddn VARCHAR(255), IN p_adresse VARCHAR(255))
BEGIN
	UPDATE USERS
	SET
		nom = p_nom, prenom = p_prenom, email = p_email, tel = p_tel, password = SHA1(p_password), ddn = p_ddn, adresse = p_adresse
	WHERE
		id = p_id;
END //


-- voir ses historiques paiements
CREATE OR REPLACE PROCEDURE getHistoriquePaiement (IN p_user_id int)
BEGIN
	SELECT s.nom, r.date_resa, SUM(p.total), r.is_paid FROM paiements p
	INNER JOIN reservations r
	ON p.id_reservation = r.id
	INNER JOIN salles s
	ON r.id_salle = s.id
	WHERE p.id_user = p_user_id
	GROUP BY p.id_reservation;
END //


-- créer une réservation
CREATE OR REPLACE PROCEDURE createReservation (IN p_date VARCHAR(255), IN p_user_id int, IN p_salle_id int, IN p_is_paid BOOLEAN)
BEGIN
	INSERT INTO reservations (date_resa, id_user, id_salle, is_paid) VALUES (p_date, p_user_id, p_salle_id, p_is_paid);
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


