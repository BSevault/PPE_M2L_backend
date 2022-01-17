USE M2L_DB;

DELIMITER //

-- Voir salles
CREATE OR REPLACE PROCEDURE getSalles ()
BEGIN
	SELECT id, nom FROM salles;
END //

-- voir salle (carac)
	-- voir salle (liste resas dates)
-- créer salle
-- update salle
-- delete salle