-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.11 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 正在导出表  pts3-dut_pts3.COCKTAIL 的数据：~5 rows (大约)
/*!40000 ALTER TABLE `COCKTAIL` DISABLE KEYS */;
INSERT INTO `COCKTAIL` (`ID`, `INTITULE`, `ILLUSTRATIONURL`, `CATEGORIE`, `DESCRIPTION`, `FORCEALC`) VALUES
	(1, 'Acapulco', 'a', 'A', 'Verre à COCKTAIL\ntranche d’ananas sur le bord du verre et long zeste de citron vert dans le verre\n\nGlace pilée dans 1/2 shaker\nAjout Tequila, cointreau, ananas, sucre et oeuf\nShake 15 secondes\nServir et ajouter quelques glaçons\nTerminer avec grenadine + la déco', 1),
	(2, 'Alexandra', 'a', 'AD', 'Verre à COCKTAIL\nVerre givré au cacao\n\nQuelques cubes de glace au shaker\nAjout crème de cacao, cognac, crème fraiche\nShake 20 secondes\nServir dans le verre en retenant la glace\nSaupoudrer de cacao', 0),
	(3, 'Blue Lagoon', '', 'A', 'Verre à long drink (grand tumbler)\ngivrer fortement le verre au curaçao+sucre\n\nVerser liquides dans le shaker\nAjouter de la glace pilée\nShake 10 secondes\nServir le tout dans le verre givré', NULL),
	(4, 'Godfather', '', 'D', 'Verre à digestif\n\nMettre 2 glaçons dans le verre\nAjouter alcools et mélanger', NULL),
	(5, 'Love Cocktail', '', 'A', 'Grand tumbler\n\nGlaçons dans 1/2 shaker\nVerser les ingrédients\nShake 5 secondes\nServir dans verres à long drink en retenant la glace\nAjouter 2 glaçons par verre', NULL);
/*!40000 ALTER TABLE `COCKTAIL` ENABLE KEYS */;

-- 正在导出表  pts3-dut_pts3.COMPTE 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `COMPTE` DISABLE KEYS */;
/*!40000 ALTER TABLE `COMPTE` ENABLE KEYS */;

-- 正在导出表  pts3-dut_pts3.CONTENIR 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `CONTENIR` DISABLE KEYS */;
INSERT INTO `CONTENIR` (`QUANTITE`, `UNITE`, `IDCOCKTAIL`, `IDINGREDIENT`) VALUES
	('3', 'doses', 1, 2),
	('2', 'doses', 1, 19),
	('1', 'trait', 1, 30),
	('0', '1/2 blanc', 1, 43),
	('5', 'doses', 1, 57),
	('1', 'cc', 1, 64),
	('1', 'pincee', 2, 8),
	('1', 'cuillère', 2, 21),
	('1', 'doses', 2, 65),
	('2', 'doses', 2, 66),
	('1', 'doses', 3, 15),
	('1', 'doses', 3, 24),
	('1', 'doses', 3, 62),
	('5', 'doses', 4, 1),
	('5', 'doses', 4, 63),
	('2', 'doses', 5, 34),
	('3', 'doses', 5, 46),
	('3', 'doses', 5, 48),
	('2', 'doses', 5, 56);
/*!40000 ALTER TABLE `CONTENIR` ENABLE KEYS */;

-- 正在导出表  pts3-dut_pts3.etreami 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `etreami` DISABLE KEYS */;
/*!40000 ALTER TABLE `etreami` ENABLE KEYS */;

-- 正在导出表  pts3-dut_pts3.FAVORI 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `FAVORI` DISABLE KEYS */;
/*!40000 ALTER TABLE `FAVORI` ENABLE KEYS */;

-- 正在导出表  pts3-dut_pts3.INGREDIENT 的数据：~66 rows (大约)
/*!40000 ALTER TABLE `INGREDIENT` DISABLE KEYS */;
INSERT INTO `INGREDIENT` (`ID`, `INTITULE`, `DEGREALCOOL`) VALUES
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
/*!40000 ALTER TABLE `INGREDIENT` ENABLE KEYS */;

-- 正在导出表  pts3-dut_pts3.MEMBRE 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `MEMBRE` DISABLE KEYS */;
/*!40000 ALTER TABLE `MEMBRE` ENABLE KEYS */;

-- 正在导出表  pts3-dut_pts3.NOTER 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `NOTER` DISABLE KEYS */;
/*!40000 ALTER TABLE `NOTER` ENABLE KEYS */;

-- 正在导出表  pts3-dut_pts3.PREFERENCE 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `PREFERENCE` DISABLE KEYS */;
/*!40000 ALTER TABLE `PREFERENCE` ENABLE KEYS */;

-- 正在导出表  pts3-dut_pts3.PROPOSE 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `PROPOSE` DISABLE KEYS */;
/*!40000 ALTER TABLE `PROPOSE` ENABLE KEYS */;

-- 正在导出表  pts3-dut_pts3.STOCKER 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `STOCKER` DISABLE KEYS */;
/*!40000 ALTER TABLE `STOCKER` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;