# Projets Personnels Encadrés BTS SIO option SLAM session 2022

Cette API concerne :
- Application web de réservations de salles de réunions. [Lien GitHub Front-end](https://github.com/BSevault/PPE_M2L_frontend)
- Application mobile de confirmation des participants, de réservations de services et de déclaration de cas Covid. [Lien GitHub App Flutter](https://github.com/BSevault/PPE_M2L_mobile)

## Installation
### Prérequis
Les logiciels ci-dessous sont nécessaires au fonctionnement de notre API, voici les commandes pour vérifier qu'ils sont bien installés sur votre système. Sinon, télécharger les et suivez les étapes d'installation depuis les liens mis à disposition.

* Git `git --version` ou télécharger et installer [Git](https://git-scm.com/downloads)
* NPM `npm --version` ou télécharger et installer [NPM](https://www.npmjs.com/package/download)
* Node `node --version` ou télécharger et installer [Node.js](https://nodejs.org/en/)
* MariaDB `mariadb --version` ou télécharger et installer [MariaDB](https://mariadb.com/fr/downloads/)

### Installation de l'API

Cloner le repo GitHub et préparer l'api Node.js
```
git clone https://github.com/BSevault/PPE_M2L_backend.git  
cd PPE_M2L_backend
npm install
```
La commande `npm install` va installer toutes les dépendences liées au projet.

### Base de données
#### Création des utilisateurs

Créer un utilisateur `root` (avec des droits de création) sous MariaDB pour exécuter la commande d'initialisation de la base de données.

Créer un fichier ***permissions.sql*** dans le dossier `./PPE_M2L_backend/database/`
Dans celui-ci on va créer un utilisateur "webapp" qui n'aura que les droits d'exécution de procédures stockées sur notre base de données.

Script SQL à inclure dans le fichier ***permissions.sql*** :

```sql
CREATE OR REPLACE USER 'webapp'@'localhost' IDENTIFIED BY 'PopCorn2Bret@gn€';
GRANT EXECUTE ON M2L_DB.* TO 'webapp'@'localhost';
```
Le mot de passe `PopCorn2Bret@gn€` est à titre indicatif, vous pouvez mettre celui que vous désirez.

#### Création des variables d'environnements

Créer un fichier ***prod.env*** dans le dossier `./PPE_M2L_backend/config/`
Ce fichier va contenir les variables de connexion à la base de données.
Exemple de de fichier .env

```js
#General
PORT=3001               -> Port d'écoute du serveur Express

#Database
HOST=localhost          -> Adresse de la base de données
USER=webapp             -> Utilisateur de la base de donneés
PASSWORD=Zod€7c@arT48   -> Mot de passe de l'utilisateur de la base de données
DATABASE=m2l_db         -> Nom de la base de données dans MariaDB
DB_PORT=3306            -> Port d'écoute de la base de données.
```

#### Initialisation de la base de données
Pour créer la base de données, insérer les procédures SQL et des données tests, et créer l'utilisateur webapp

##### Sous Windows
Exécutez le script : `npm run resetWin`
Et entrez votre mot de passe d’utilisateur root MariaDB

##### Sous Linux 
Exécutez la série de scripts :

``` bash
sudo mariadb -u root -p <./database/schema.sql
sudo mariadb -u root -p <./database/procedures/p_produits.sql
sudo mariadb -u root -p <./database/procedures/p_salles.sql
sudo mariadb -u root -p <./database/procedures/p_users.sql
sudo mariadb -u root -p <./database/permissions.sql
sudo mariadb -u root -p <./database/light_dummy_datas.sql
```

Ou utilisez le script suivant : `npm run resetLinux`
Et entrez votre mot de passe d’utilisateur root MariaDB

## Lancement
Une fois les étapes de l'intallation effectuée, éxécuter la commande 
`npm run prod` 
depuis le dossier `PPE_M2L_backend`

### Test
Pour vérifier que l'API est fonctionnelle, voici ce que doit afficher votre console :
<img src="./docs/capture/Capture%20d’écran%202022-04-14%20212447.png">

Pour s'assurer que l'on peut bien communiquer avec notre API, ouvrir un navigateur web et taper l'url : `localhost:3001/api`

Le résultat doit être <b>`{"success":"Bonjour, vous êtes sur l'api M2L"}`</b>.
Si tel est le cas, tout est fonctionnel.
Sinon vérifier que tous les logiciels <b>prérequis</b> sont correctement installés. Si le problème persiste vous pouvez nous contacter par le biais de ce repo. 
