USE M2L_DB;

DELIMITER //

-- Voir salles
CREATE OR REPLACE PROCEDURE getSalles ()
BEGIN
	SELECT id, nom FROM salles;
END //

-- voir salle (carac)
CREATE OR REPLACE PROCEDURE getOneSalle (IN p_nom VARCHAR(255))
BEGIN
	SELECT id, nom, description, capacite, prix FROM salles
	WHERE nom = p_nom;
END //


	-- voir salle (liste resas dates)
	
-- créer salle
-- update salle
-- delete salle