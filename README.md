# Projets Personnels Encadrés BTS SIO option SLAM session 2022

Cette API concerne :
- Application web de réservations de salles de réunions. [Lien GitHub Front-end](https://github.com/BSevault/PPE_M2L_frontend)
- Application mobile de confirmation des participants, de réservations de services et de déclaration de cas Covid-19. [Lien GitHub App Flutter](https://github.com/BSevault/PPE_M2L_mobile)

## Installation
### Prérequis
Les logiciels ci-dessous sont nécessaire au fonctionnement de notre API, voici les commande pour vérifier qu'ils sont bien installés sur votre système. Sinon, télécharger les et suivez les étapes d'installation dupuis les liens mis à disposition.

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

Créer un utilisateur `root` (avec des droits de création) sous MariaDB pour exécuter la commande d'initialisation de la base de données.

`npm run resetDBLight`

## Lancement
Une fois les étapes de l'intallation effectuée, éxécutez la commande 
`npm run prod` 
depuis le dossier `PPE_M2L_backend`

### Test
Pour vérifier que l'API est fonctionnel, voici ce que doit afficher votre console :
<img src="./docs/capture/Capture%20d’écran%202022-04-14%20212447.png">

Pour s'assurer que l'on peut bien communiquer avec notre API, ouvrez un navigateur web et taper l'url : `localhost:3001/api`

Le résultat doit être <b>`{"success":"Bonjour, vous êtes sur l'api M2L"}`</b>.
Si tel est le cas, tout est fonctionnel.
Sinon vérifiez que tous les logiciels <b>prérequis</b> sont correctement installés. Si le problème persiste vous pouvez nous contacter par le bien de ce repo. 
