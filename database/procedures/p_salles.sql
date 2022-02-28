USE M2L_DB;

DELIMITER //

-- Voir toute SALLES
CREATE OR REPLACE PROCEDURE getAllSalles ()
BEGIN
	SELECT id, nom FROM SALLES;
END //

-- Voir SALLES active
CREATE OR REPLACE PROCEDURE getActiveSalles ()
BEGIN
	SELECT id, nom, description, capacite, prix from SALLES
	WHERE is_active = 1;
END //

-- voir salle (carac)
CREATE OR REPLACE PROCEDURE getOneSalle (IN p_id INT)
BEGIN
	SELECT id, nom, description, capacite, prix FROM SALLES
	WHERE id = p_id;
END //

-- voir salle (liste resas dates)
CREATE OR REPLACE PROCEDURE getSalleResas (IN p_id INT)
BEGIN
	SELECT date_resa FROM RESERVATIONS
	WHERE p_id = id_salle AND date_resa >= DATE(NOW());
END //

-- créer salle
CREATE OR REPLACE PROCEDURE createSalle (IN p_nom VARCHAR(255), IN p_desc VARCHAR(255), IN p_capa INT, IN p_prix FLOAT, IN p_active BOOLEAN)
BEGIN
	INSERT INTO SALLES (nom, description, capacite, prix, is_active) VALUES (p_nom, p_desc, p_capa, p_prix, p_active);
END //

-- update salle
CREATE OR REPLACE PROCEDURE updateSalle (IN p_id INT, IN p_nom VARCHAR(255), IN p_desc VARCHAR(255), IN p_capa INT, IN p_prix FLOAT, IN p_active BOOLEAN)
BEGIN
	UPDATE SALLES
	SET nom = p_nom, description = p_desc, capacite = p_capa, prix = p_prix, is_active = p_active
	WHERE id = p_id;
END //

-- toggle active status
CREATE OR REPLACE PROCEDURE toggleStatusSalle (IN p_id INT)
BEGIN
	UPDATE SALLES
	SET is_active = !is_active
	WHERE id = p_id;	
END //