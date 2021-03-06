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
	INSERT INTO Users(nom, prenom, email, tel, password, ddn, adress)
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


