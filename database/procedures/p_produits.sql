USE M2L_DB;

DELIMITER //

-- get produits
CREATE OR REPLACE PROCEDURE getAllProducts()
NOT DETERMINISTIC CONTAINS SQL
BEGIN
    SELECT id, nom_produit, description, qte_dispo, prix
    FROM PRODUITS;
END //

-- get produit
CREATE OR REPLACE PROCEDURE getProductById(IN p_id INT)
NOT DETERMINISTIC CONTAINS SQL
BEGIN
    SELECT id, nom_produit, description, qte_dispo, prix
    FROM PRODUITS
    WHERE id = p_id;
END //

-- create produit
CREATE OR REPLACE PROCEDURE createProduct (IN p_nom VARCHAR(255), IN p_description VARCHAR(255), IN p_qte INT, IN p_prix FLOAT)
NOT DETERMINISTIC CONTAINS SQL
BEGIN
    INSERT INTO PRODUITS (nom_produit, description, qte_dispo, prix)
    VALUES (p_nom, p_description, p_qte, p_prix);
END //

-- update produit 
    -- update complet
CREATE OR REPLACE PROCEDURE updateProductById (IN p_id INT, IN p_nom VARCHAR(255), IN p_description VARCHAR(255), IN p_qte INT, IN p_prix FLOAT)
NOT DETERMINISTIC CONTAINS SQL
BEGIN
    UPDATE PRODUITS
    SET nom_produit = p_nom, description = p_description, qte_dispo = p_qte, prix = p_prix
    WHERE id = p_id;
END //

    -- update qte
CREATE OR REPLACE PROCEDURE updateProductQtyById (IN p_id INT, IN p_qte INT)
NOT DETERMINISTIC CONTAINS SQL
BEGIN
    UPDATE PRODUITS
    SET qte_dispo = qte_dispo + p_qte
    WHERE id = p_id;
END //


-- delete produit
CREATE OR REPLACE PROCEDURE toggleProductIsActiveById (IN p_id INT)
NOT DETERMINISTIC CONTAINS SQL
BEGIN
    UPDATE PRODUITS
    SET is_active = !is_active
    WHERE id = p_id;
END //


-- CREATE OR REPLACE PROCEDURE my_procedure ()
-- NOT DETERMINISTIC CONTAINS SQL
-- BEGIN

-- END //