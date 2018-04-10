-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.2.13-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla sprint1.profile
DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `image_profile` varchar(100) DEFAULT NULL,
  `university` varchar(100) NOT NULL,
  `degree` varchar(100) NOT NULL,
  PRIMARY KEY (`email`),
  CONSTRAINT `Profile_User_FK` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla sprint1.profile: ~2 rows (aproximadamente)
DELETE FROM `profile`;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` (`email`, `name`, `surname`, `image_profile`, `university`, `degree`) VALUES
  ('carlos@ulpgc.es', 'Carlos', 'Martel', NULL, 'ULPGC', 'GII'),
  ('david@ulpgc.es', 'David', 'Ramírez', NULL, 'ULPGC', 'GII'),
  ('felix@ulpgc.es', 'Félix', 'Cruz', NULL, 'ULPGC', 'GII'),
  ('geraldo@ulpgc.es', 'Geraldo', 'Rodrigues', NULL, 'ULPGC', 'GII'),
  ('zabai@ulpgc.es', 'Zabai', 'Armas', NULL, 'ULPGC', 'GII');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;

-- Volcando estructura para tabla sprint1.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla sprint1.user: ~5 rows (aproximadamente)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`email`, `password`) VALUES
  ('carlos@ulpgc.es', 'versia'),
  ('david@ulpgc.es', 'versia'),
  ('felix@ulpgc.es', 'versia'),
  ('geraldo@ulpgc.es', 'versia'),
  ('zabai@ulpgc.es', 'versia');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;