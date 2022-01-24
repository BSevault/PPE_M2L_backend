-- M2L SQL DB CREATE SCRIPT --
DROP DATABASE IF EXISTS M2L_DB;

CREATE DATABASE M2L_DB;

USE M2L_DB;

CREATE TABLE USERS(
   id INT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(255) NOT NULL,
   prenom VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   tel VARCHAR(50),
   PASSWORD TEXT NOT NULL,
   ddn DATE NOT NULL,
   adresse VARCHAR(255),
   is_active BOOLEAN NOT NULL DEFAULT 1,
   PRIMARY KEY(id)
);

CREATE TABLE SALLES(
   id INT NOT NULL AUTO_INCREMENT,
   nom VARCHAR(255) NOT NULL,
   description VARCHAR(255),
   capacite INT NOT NULL,
   prix FLOAT NOT NULL,
   is_active BOOLEAN NOT NULL DEFAULT 1,
   PRIMARY KEY(id)
);

CREATE TABLE PRODUITS(
   id INT NOT NULL AUTO_INCREMENT,
   nom_produit VARCHAR(255) NOT NULL,
   description VARCHAR(255),
   qte_dispo INT NOT NULL,
   prix FLOAT NOT NULL,
   is_active BOOLEAN NOT NULL DEFAULT 1,
   PRIMARY KEY(id)
);

CREATE TABLE TICKETS(
   id INT NOT NULL AUTO_INCREMENT,
   date_ticket DATE NOT NULL,
   date_probleme DATE NOT NULL DEFAULT '1850-01-01',
   description TEXT NOT NULL,
   id_user INT NOT NULL,
   id_salle INT,
   id_produit INT,
   PRIMARY KEY(id),
   FOREIGN KEY(id_salle) REFERENCES SALLES(id),
   FOREIGN KEY(id_produit) REFERENCES PRODUITS(id),
   FOREIGN KEY(id_user) REFERENCES USERS(id)
);

CREATE TABLE RESERVATIONS(
   id INT NOT NULL AUTO_INCREMENT,
   date_resa DATE NOT NULL,
   is_paid BOOLEAN NOT NULL DEFAULT 0,
   id_user INT NOT NULL,
   id_salle INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_salle) REFERENCES SALLES(id),
   FOREIGN KEY(id_user) REFERENCES USERS(id)
);

CREATE TABLE PAIEMENTS(
   id INT NOT NULL AUTO_INCREMENT,
   qte INT NOT NULL DEFAULT 1,
   total FLOAT NOT NULL,
   id_user INT NOT NULL,
   id_reservation INT NOT NULL,
   id_produit INT DEFAULT 0,
   PRIMARY KEY(id),
   FOREIGN KEY(id_user) REFERENCES USERS(id),
   FOREIGN KEY(id_produit) REFERENCES PRODUITS(id),
   FOREIGN KEY(id_reservation) REFERENCES RESERVATIONS(id)
);

-- ALTER TABLE paiements
-- DROP FOREIGN KEY paiements_ibfk_2;

-- ALTER TABLE paiements
-- ADD
--    CONSTRAINT paiements_ibfk_2
--    FOREIGN KEY (id_produit) REFERENCES produits(id)
--    ON DELETE RESTRICT
--    ON UPDATE SET DEFAULT;

CREATE TABLE PARTICIPANTS(
   id INT NOT NULL AUTO_INCREMENT,
   covid_positive BOOLEAN NOT NULL,
   id_user INT NOT NULL,
   id_reservation INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_user) REFERENCES USERS(id),
   FOREIGN KEY(id_reservation) REFERENCES RESERVATIONS(id)
);

-- INSERT INTO SALLES (nom, description, capacite, prix)
-- VALUES 
-- ('Majorelle', 'Service de sonorisation et vidéo projecteur disponible', 30, 2000),
-- ('Restauration et convivialité', 'Service de sonorisation et vidéo projecteur disponible', 50, 3000),
-- ('Grüber', 'Vidéo projecteur disponible', 20, 1000),
-- ('Lamour', 'Service de sonorisation et vidéo projecteur disponible', 25, 1500),
-- ('Amphithéâtre', 'Service de sonorisation et vidéo projecteur disponible', 100, 3500),
-- ('Longwy', 'Vidéo projecteur disponible', 15, 800),
-- ('Daum', 'Vidéo projecteur disponible', 20, 1000),
-- ('Gallé', 'Vidéo projecteur disponible', 20, 1000),
-- ('Corbin', 'Vidéo projecteur disponible', 20, 1000),
-- ('Baccarat', 'Vidéo projecteur disponible', 20, 1000);