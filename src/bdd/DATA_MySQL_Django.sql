-- --------------------------------------------------------
-- Version du serveur:           5.7.11 - MySQL Community Server (GPL)
-- SE du serveur:                	Win32
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Listage des données de la table shakermagique.auth_group : ~0 rows (environ)
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;

-- Listage des données de la table shakermagique.auth_group_permissions : ~0 rows (environ)
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;

-- Listage des données de la table shakermagique.auth_permission : ~0 rows (environ)
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;

-- Listage des données de la table shakermagique.cocktail : ~0 rows (environ)
/*!40000 ALTER TABLE `cocktail` DISABLE KEYS */;
INSERT INTO `cocktail` (`ID`, `INTITULE`, `ILLUSTRATIONURL`, `CATEGORIE`, `DESCRIPTION`, `FORCEALC`) VALUES
	(1, 'Acapulco', 'cocktail/default.jpg', 'A', 'Verre à COCKTAIL\ntranche d’ananas sur le bord du verre et long zeste de citron vert dans le verre\n\nGlace pilée dans 1/2 shaker\nAjout Tequila, cointreau, ananas, sucre et oeuf\nShake 15 secondes\nServir et ajouter quelques glaçons\nTerminer avec grenadine + la déco', 1),
	(2, 'Alexandra', 'cocktail/default.jpg', 'AD', 'Verre à COCKTAIL\nVerre givré au cacao\n\nQuelques cubes de glace au shaker\nAjout crème de cacao, cognac, crème fraiche\nShake 20 secondes\nServir dans le verre en retenant la glace\nSaupoudrer de cacao', 0),
	(3, 'Blue Lagoon', 'cocktail/default.jpg', 'A', 'Verre à long drink (grand tumbler)\ngivrer fortement le verre au curaçao+sucre\n\nVerser liquides dans le shaker\nAjouter de la glace pilée\nShake 10 secondes\nServir le tout dans le verre givré', NULL),
	(4, 'Godfather', 'cocktail/default.jpg', 'D', 'Verre à digestif\n\nMettre 2 glaçons dans le verre\nAjouter alcools et mélanger', NULL),
	(5, 'Love Cocktail', 'cocktail/default.jpg', 'A', 'Grand tumbler\n\nGlaçons dans 1/2 shaker\nVerser les ingrédients\nShake 5 secondes\nServir dans verres à long drink en retenant la glace\nAjouter 2 glaçons par verre', NULL);
/*!40000 ALTER TABLE `cocktail` ENABLE KEYS */;

-- Listage des données de la table shakermagique.compte : ~0 rows (environ)
/*!40000 ALTER TABLE `compte` DISABLE KEYS */;
/*!40000 ALTER TABLE `compte` ENABLE KEYS */;

-- Listage des données de la table shakermagique.contenir : ~0 rows (environ)
/*!40000 ALTER TABLE `contenir` DISABLE KEYS */;
INSERT INTO `contenir` (`IDCONTENIR`, `IDCOCKTAIL`, `IDINGREDIENT`, `QUANTITE`, `UNITE`) VALUES
	(22, 1, 2, 3, 'doses'),
	(23, 1, 19, 2, 'doses'),
	(24, 1, 30, 1, 'trait'),
	(25, 1, 43, 0, '1/2 blanc'),
	(26, 1, 57, 5, 'doses'),
	(27, 1, 64, 1, 'cc'),
	(28, 2, 8, 1, 'pincee'),
	(29, 2, 21, 1, 'cuillère'),
	(30, 2, 65, 1, 'doses'),
	(31, 2, 66, 2, 'doses'),
	(32, 3, 15, 1, 'doses'),
	(33, 3, 24, 1, 'doses'),
	(34, 3, 62, 1, 'doses'),
	(35, 4, 1, 5, 'doses'),
	(36, 4, 63, 5, 'doses'),
	(37, 5, 34, 2, 'doses'),
	(38, 5, 46, 3, 'doses'),
	(39, 5, 48, 3, 'doses'),
	(40, 5, 56, 2, 'doses');
/*!40000 ALTER TABLE `contenir` ENABLE KEYS */;

-- Listage des données de la table shakermagique.django_admin_log : ~0 rows (environ)
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;

-- Listage des données de la table shakermagique.django_content_type : ~0 rows (environ)
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;

-- Listage des données de la table shakermagique.django_migrations : ~0 rows (environ)
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;

-- Listage des données de la table shakermagique.django_session : ~0 rows (environ)
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;

-- Listage des données de la table shakermagique.favori : ~0 rows (environ)
/*!40000 ALTER TABLE `favori` DISABLE KEYS */;
/*!40000 ALTER TABLE `favori` ENABLE KEYS */;

-- Listage des données de la table shakermagique.ingredient : ~0 rows (environ)
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` (`ID`, `INTITULE`, `DEGREALCOOL`) VALUES
	(1, 'Amaretto', 28),
	(2, 'Jus d\'ananas', 0),
	(3, 'Angostura', 0),
	(4, 'Armagnac', 52),
	(5, 'Bailey\'s', 17),
	(6, 'Jus de banane', 0),
	(7, 'Bière', 8),
	(8, 'Cacao', 0),
	(9, 'Café', 0),
	(10, 'Calvados', 40),
	(11, 'Campari', 28),
	(12, 'Cannelle', 0),
	(13, 'Liqueur de cassis', 18),
	(14, 'Champagne', 12),
	(15, 'Jus de citron', 0),
	(16, 'Liqueur de citron', 18),
	(17, 'Lait de coco', 0),
	(18, 'Cognac', 38),
	(19, 'Cointreau', 40),
	(20, 'Coca Cola', 0),
	(21, 'Crème', 0),
	(22, 'Pisang Ambon', 17),
	(23, 'Banane', 0),
	(24, 'Curaçao bleu', 17),
	(25, 'Get27', 27),
	(26, 'Get31', 31),
	(27, 'Gin', 40),
	(28, 'Jus de goyave', 0),
	(29, 'Grand Marnier', 40),
	(30, 'Sirop de grenadine', 0),
	(31, 'Kirsch', 45),
	(32, 'Lait', 0),
	(33, 'Limoncello', 28),
	(34, 'Malibu', 18),
	(35, 'Mandarine Napoléon', 38),
	(36, 'Marie Brizard', 25),
	(37, 'Martini Blanc', 16),
	(38, 'Martini Dry', 18),
	(39, 'Martini Rouge', 16),
	(40, 'Miel', 0),
	(41, 'Noix de muscade', 0),
	(42, 'Noilly Prat', 18),
	(43, 'Oeuf', 0),
	(44, 'Jus d\'orange', 0),
	(45, 'Sirop d\'orgeat', 0),
	(46, 'Jus de pamplemousse', 0),
	(47, 'Jus de papaye', 0),
	(48, 'Jus de fruit de la passion', 0),
	(49, 'Passoa', 17),
	(50, 'Pastis', 51),
	(51, 'Jus de pêche', 0),
	(52, 'Sirop de pêche', 0),
	(53, 'Perrier', 0),
	(54, 'Porto', 18),
	(55, 'Rhum ambré', 54),
	(56, 'Rhum blanc', 55),
	(57, 'Tequila', 35),
	(58, 'Tonic', 0),
	(59, 'Vaiona', 20),
	(60, 'Vin blanc', 12),
	(61, 'Vin rouge', 12),
	(62, 'Vodka', 40),
	(63, 'Whisky', 40),
	(64, 'Sucre en poudre', 0),
	(65, 'Crème de cacao', 20),
	(66, 'Cognac', 50);
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;

-- Listage des données de la table shakermagique.membre : ~0 rows (environ)
/*!40000 ALTER TABLE `membre` DISABLE KEYS */;
/*!40000 ALTER TABLE `membre` ENABLE KEYS */;

-- Listage des données de la table shakermagique.noter : ~0 rows (environ)
/*!40000 ALTER TABLE `noter` DISABLE KEYS */;
/*!40000 ALTER TABLE `noter` ENABLE KEYS */;

-- Listage des données de la table shakermagique.preference : ~0 rows (environ)
/*!40000 ALTER TABLE `preference` DISABLE KEYS */;
/*!40000 ALTER TABLE `preference` ENABLE KEYS */;

-- Listage des données de la table shakermagique.propose : ~0 rows (environ)
/*!40000 ALTER TABLE `propose` DISABLE KEYS */;
/*!40000 ALTER TABLE `propose` ENABLE KEYS */;

-- Listage des données de la table shakermagique.stocker : ~0 rows (environ)
/*!40000 ALTER TABLE `stocker` DISABLE KEYS */;
/*!40000 ALTER TABLE `stocker` ENABLE KEYS */;

-- Listage des données de la table shakermagique.token_blacklist_blacklistedtoken : ~0 rows (environ)
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` ENABLE KEYS */;

-- Listage des données de la table shakermagique.token_blacklist_outstandingtoken : ~0 rows (environ)
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` ENABLE KEYS */;

-- Listage des données de la table shakermagique.user_member : ~0 rows (environ)
/*!40000 ALTER TABLE `user_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_member` ENABLE KEYS */;

-- Listage des données de la table shakermagique.user_member_groups : ~0 rows (environ)
/*!40000 ALTER TABLE `user_member_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_member_groups` ENABLE KEYS */;

-- Listage des données de la table shakermagique.user_member_user_permissions : ~0 rows (environ)
/*!40000 ALTER TABLE `user_member_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_member_user_permissions` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
