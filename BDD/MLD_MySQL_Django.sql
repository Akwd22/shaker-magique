-- --------------------------------------------------------
-- Hôte:                         mysql-remy-dut.alwaysdata.net
-- Version du serveur:           10.5.5-MariaDB - MariaDB Server
-- SE du serveur:                Linux
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour remy-dut_pts3
CREATE DATABASE IF NOT EXISTS `remy-dut_pts3` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `remy-dut_pts3`;

-- Listage de la structure de la table remy-dut_pts3. auth_group
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. auth_group_permissions
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. auth_permission
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. COCKTAIL
CREATE TABLE IF NOT EXISTS `COCKTAIL` (
  `ID` int(4) NOT NULL AUTO_INCREMENT,
  `INTITULE` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ILLUSTRATIONURL` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CATEGORIE` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `FORCEALC` int(2) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `CHK_CATEGORIE` CHECK (`CATEGORIE` = 'A' or `CATEGORIE` = 'D' or `CATEGORIE` = 'AD')
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. COMPTE
CREATE TABLE IF NOT EXISTS `COMPTE` (
  `ID` int(4) NOT NULL,
  `LOGIN` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `PASSHASH` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `EMAIL` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `DATECREATION` date DEFAULT NULL,
  `DERNIERECONNEXION` date DEFAULT NULL,
  `ENLIGNE` tinyint(1) NOT NULL,
  `SESSIONID` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IDMEMBRE` int(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `LOGIN` (`LOGIN`),
  UNIQUE KEY `EMAIL` (`EMAIL`),
  UNIQUE KEY `SESSIONID` (`SESSIONID`),
  KEY `COMPTE_IDMEMBRE` (`IDMEMBRE`),
  CONSTRAINT `COMPTE_IDMEMBRE` FOREIGN KEY (`IDMEMBRE`) REFERENCES `MEMBRE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. CONTENIR
CREATE TABLE IF NOT EXISTS `CONTENIR` (
  `IDCONTENIR` int(4) NOT NULL AUTO_INCREMENT,
  `IDCOCKTAIL` int(4) DEFAULT NULL,
  `IDINGREDIENT` int(4) DEFAULT NULL,
  `QUANTITE` int(2) NOT NULL,
  `UNITE` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`IDCONTENIR`),
  KEY `CONTENIR_IDCOCKTAIL` (`IDCOCKTAIL`),
  KEY `CONTENIR_IDINGREDIENT` (`IDINGREDIENT`),
  CONSTRAINT `CONTENIR_IDCOCKTAIL` FOREIGN KEY (`IDCOCKTAIL`) REFERENCES `COCKTAIL` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CONTENIR_IDINGREDIENT` FOREIGN KEY (`IDINGREDIENT`) REFERENCES `INGREDIENT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. django_admin_log
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `object_repr` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext COLLATE utf8_unicode_ci NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_user_member_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_user_member_id` FOREIGN KEY (`user_id`) REFERENCES `user_member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. django_content_type
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. django_migrations
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. django_session
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. FAVORI
CREATE TABLE IF NOT EXISTS `FAVORI` (
  `IDCOCKTAIL` int(4) NOT NULL,
  `IDMEMBRE` int(4) NOT NULL,
  PRIMARY KEY (`IDMEMBRE`,`IDCOCKTAIL`),
  KEY `FAVORI_IDCOCKTAIL` (`IDCOCKTAIL`),
  CONSTRAINT `FAVORI_IDCOCKTAIL` FOREIGN KEY (`IDCOCKTAIL`) REFERENCES `COCKTAIL` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FAVORI_IDMEMBRE` FOREIGN KEY (`IDMEMBRE`) REFERENCES `MEMBRE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. INGREDIENT
CREATE TABLE IF NOT EXISTS `INGREDIENT` (
  `ID` int(4) NOT NULL,
  `INTITULE` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `DEGREALCOOL` int(2) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. MEMBRE
CREATE TABLE IF NOT EXISTS `MEMBRE` (
  `ID` int(4) NOT NULL,
  `PRENOM` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NOM` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DATEN` date DEFAULT NULL,
  `GENRE` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IDCOMPTE` int(4) NOT NULL,
  `IDHOTE` int(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MEMBRE_IDCOMPTE` (`IDCOMPTE`),
  KEY `MEMBRE_IDMEMBRE` (`IDHOTE`),
  CONSTRAINT `MEMBRE_IDCOMPTE` FOREIGN KEY (`IDCOMPTE`) REFERENCES `COMPTE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MEMBRE_IDMEMBRE` FOREIGN KEY (`IDHOTE`) REFERENCES `MEMBRE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CHK_GENRE` CHECK (`GENRE` = 'M' or `GENRE` = 'F' or `GENRE` = NULL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. NOTER
CREATE TABLE IF NOT EXISTS `NOTER` (
  `IDNOTER` int(4) NOT NULL AUTO_INCREMENT,
  `IDMEMBRE` int(4) DEFAULT NULL,
  `IDCOCKTAIL` int(4) DEFAULT NULL,
  `NOTE` int(2) NOT NULL,
  PRIMARY KEY (`IDNOTER`),
  KEY `NOTER_IDCOCKTAIL` (`IDCOCKTAIL`),
  KEY `NOTER_IDMEMBRE` (`IDMEMBRE`),
  CONSTRAINT `NOTER_IDCOCKTAIL` FOREIGN KEY (`IDCOCKTAIL`) REFERENCES `COCKTAIL` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `NOTER_IDMEMBRE` FOREIGN KEY (`IDMEMBRE`) REFERENCES `user_member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CHK_NOTE` CHECK (`NOTE` >= 0 and `NOTE` <= 5)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. PREFERENCE
CREATE TABLE IF NOT EXISTS `PREFERENCE` (
  `IDPREFERENCE` int(4) NOT NULL AUTO_INCREMENT,
  `IDINGREDIENT` int(4) DEFAULT NULL,
  `IDMEMBRE` int(4) DEFAULT NULL,
  PRIMARY KEY (`IDPREFERENCE`),
  KEY `PREFERENCE_IDINGREDIENT` (`IDINGREDIENT`),
  KEY `PREFERENCE_IDMEMBRE` (`IDMEMBRE`),
  CONSTRAINT `PREFERENCE_IDINGREDIENT` FOREIGN KEY (`IDINGREDIENT`) REFERENCES `INGREDIENT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PREFERENCE_IDMEMBRE` FOREIGN KEY (`IDMEMBRE`) REFERENCES `user_member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. PROPOSE
CREATE TABLE IF NOT EXISTS `PROPOSE` (
  `IDPROPOSE` int(4) NOT NULL AUTO_INCREMENT,
  `IDCOCKTAIL` int(4) DEFAULT NULL,
  `IDMEMBRE` int(4) DEFAULT NULL,
  PRIMARY KEY (`IDPROPOSE`),
  KEY `PROPOSE_IDCOCKTAIL` (`IDCOCKTAIL`),
  KEY `PROPOSE_IDMEMBRE` (`IDMEMBRE`),
  CONSTRAINT `PROPOSE_IDCOCKTAIL` FOREIGN KEY (`IDCOCKTAIL`) REFERENCES `COCKTAIL` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PROPOSE_IDMEMBRE` FOREIGN KEY (`IDMEMBRE`) REFERENCES `user_member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. STOCKER
CREATE TABLE IF NOT EXISTS `STOCKER` (
  `IDSTOCKER` int(4) NOT NULL AUTO_INCREMENT,
  `IDINGREDIENT` int(4) DEFAULT NULL,
  `IDMEMBRE` int(4) DEFAULT NULL,
  `ENRESERVE` tinyint(1) NOT NULL,
  PRIMARY KEY (`IDSTOCKER`),
  KEY `STOCKER_IDINGREDIENT` (`IDINGREDIENT`),
  KEY `STOCKER_IDMEMBRE` (`IDMEMBRE`),
  CONSTRAINT `STOCKER_IDINGREDIENT` FOREIGN KEY (`IDINGREDIENT`) REFERENCES `INGREDIENT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `STOCKER_IDMEMBRE` FOREIGN KEY (`IDMEMBRE`) REFERENCES `user_member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. token_blacklist_blacklistedtoken
CREATE TABLE IF NOT EXISTS `token_blacklist_blacklistedtoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_id` (`token_id`),
  CONSTRAINT `token_blacklist_blac_token_id_3cc7fe56_fk_token_bla` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. token_blacklist_outstandingtoken
CREATE TABLE IF NOT EXISTS `token_blacklist_outstandingtoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` longtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `jti` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  KEY `token_blacklist_outs_user_id_83bc629a_fk_user_memb` (`user_id`),
  CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_user_memb` FOREIGN KEY (`user_id`) REFERENCES `user_member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. user_member
CREATE TABLE IF NOT EXISTS `user_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `user_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime(6) NOT NULL,
  `birthday` datetime NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `id_hote_id` int(11) DEFAULT NULL,
  `gender` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `email` (`email`),
  KEY `user_member_id_hote_id_cb362f60_fk_user_member_user_id` (`id_hote_id`),
  CONSTRAINT `user_member_id_hote_id_cb362f60_fk_user_member_user_id` FOREIGN KEY (`id_hote_id`) REFERENCES `user_member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. user_member_groups
CREATE TABLE IF NOT EXISTS `user_member_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_member_groups_member_id_group_id_de2aefb0_uniq` (`member_id`,`group_id`),
  KEY `user_member_groups_group_id_5cb2e492_fk_auth_group_id` (`group_id`),
  CONSTRAINT `user_member_groups_group_id_5cb2e492_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `user_member_groups_member_id_d5a34ab2_fk_user_member_id` FOREIGN KEY (`member_id`) REFERENCES `user_member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table remy-dut_pts3. user_member_user_permissions
CREATE TABLE IF NOT EXISTS `user_member_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_member_user_permiss_member_id_permission_id_20bc7a5e_uniq` (`member_id`,`permission_id`),
  KEY `user_member_user_per_permission_id_add12350_fk_auth_perm` (`permission_id`),
  CONSTRAINT `user_member_user_per_member_id_aaff5864_fk_user_memb` FOREIGN KEY (`member_id`) REFERENCES `user_member` (`id`),
  CONSTRAINT `user_member_user_per_permission_id_add12350_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Les données exportées n'étaient pas sélectionnées.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
