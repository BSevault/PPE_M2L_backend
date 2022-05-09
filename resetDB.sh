#!/bin/bash
read -p "votre mot de passe ?" pwd

mariadb -u root -p$pwd <./database/schema.sql
mariadb -u root -p$pwd <./database/procedures/p_produits.sql
mariadb -u root -p$pwd <./database/procedures/p_salles.sql
mariadb -u root -p$pwd <./database/procedures/p_users.sql
mariadb -u root -p$pwd <./database/permissions.sql
mariadb -u root -p$pwd <./database/light_dummy_datas.sql

echo -e "Reset DB termine"
