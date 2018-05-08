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


-- Volcando estructura de base de datos para sprint2
DROP DATABASE IF EXISTS `sprint2`;
CREATE DATABASE IF NOT EXISTS `sprint2` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sprint2`;

-- Volcando estructura para tabla sprint2.friends
DROP TABLE IF EXISTS `friends`;
CREATE TABLE IF NOT EXISTS `friends` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sender` int(10) unsigned NOT NULL,
  `receiver` int(10) unsigned NOT NULL,
  `friend_request` tinyint(1) NOT NULL DEFAULT -1,
  PRIMARY KEY (`id`),
  KEY `sender_friends_users_FK` (`sender`),
  KEY `receiver_friends_users_FK` (`receiver`),
  CONSTRAINT `receiver_friends_users_FK` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sender_friends_users_FK` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla sprint2.friends: ~0 rows (aproximadamente)
DELETE FROM `friends`;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` (`id`, `sender`, `receiver`, `friend_request`) VALUES
	(16, 3, 2, 1),
	(17, 3, 4, 1),
	(18, 3, 5, 1),
	(19, 3, 6, 1);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;

-- Volcando estructura para tabla sprint2.groups
DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `group_admin` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groups_users_FK` (`group_admin`),
  CONSTRAINT `groups_users_FK` FOREIGN KEY (`group_admin`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla sprint2.groups: ~0 rows (aproximadamente)
DELETE FROM `groups`;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;

-- Volcando estructura para tabla sprint2.group_members
DROP TABLE IF EXISTS `group_members`;
CREATE TABLE IF NOT EXISTS `group_members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group` int(10) unsigned NOT NULL,
  `member` int(10) unsigned NOT NULL,
  `group_request` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `group_members_users_FK` (`member`),
  KEY `group_members_groups_FK` (`group`),
  CONSTRAINT `group_members_groups_FK` FOREIGN KEY (`group`) REFERENCES `groups` (`id`),
  CONSTRAINT `group_members_users_FK` FOREIGN KEY (`member`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla sprint2.group_members: ~0 rows (aproximadamente)
DELETE FROM `group_members`;
/*!40000 ALTER TABLE `group_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_members` ENABLE KEYS */;

-- Volcando estructura para tabla sprint2.messages
DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sender` int(10) unsigned NOT NULL,
  `receiver` int(10) unsigned NOT NULL,
  `read` tinyint(1) DEFAULT 0,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_messages_users_FK` (`sender`),
  KEY `receiver_messages_users_FK` (`receiver`),
  CONSTRAINT `receiver_messages_users_FK` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sender_messages_users_FK` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla sprint2.messages: ~0 rows (aproximadamente)
DELETE FROM `messages`;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;

-- Volcando estructura para tabla sprint2.posts
DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `posts-user_id` (`user_id`),
  CONSTRAINT `posts-user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla sprint2.posts: ~0 rows (aproximadamente)
DELETE FROM `posts`;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Volcando estructura para tabla sprint2.profiles
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT 'Nombre',
  `surname` varchar(100) NOT NULL DEFAULT 'Apellidos',
  `image_profile` varchar(100) DEFAULT NULL,
  `university` varchar(100) NOT NULL DEFAULT 'Versia',
  `degree` varchar(100) NOT NULL DEFAULT 'No tiene estudios, es de Magisterio.',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId_profiles_UN` (`user_id`),
  KEY `profiles_users_FK` (`email`),
  CONSTRAINT `profiles_users_FK` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userId_profiles_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla sprint2.profiles: ~5 rows (aproximadamente)
DELETE FROM `profiles`;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` (`id`, `user_id`, `email`, `name`, `surname`, `image_profile`, `university`, `degree`) VALUES
	(2, 2, 'carlos@ulpgc.es', 'Carlos', 'Apellidos', NULL, 'Versia', 'No tiene estudios, es de Magisterio.'),
	(3, 3, 'david@ulpgc.es', 'David', 'Apellidos', NULL, 'Versia', 'No tiene estudios, es de Magisterio.'),
	(4, 6, 'felix@ulpgc.es', 'Félix', 'Apellidos', NULL, 'Versia', 'No tiene estudios, es de Magisterio.'),
	(5, 4, 'geraldo@ulpgc.es', 'Geraldo', 'Apellidos', NULL, 'Versia', 'No tiene estudios, es de Magisterio.'),
	(6, 5, 'zabai@ulpgc.es', 'Zabai', 'Apellidos', NULL, 'Versia', 'No tiene estudios, es de Magisterio.');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;

-- Volcando estructura para tabla sprint2.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_users_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla sprint2.users: ~5 rows (aproximadamente)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`) VALUES
	(2, 'carlos@ulpgc.es', '$2b$10$ux2k/kwYBKY3k29Wu34pVeYGbXqAoTBzMG2gQi/aTUi9eDzgMiyfC'),
	(3, 'david@ulpgc.es', '$2b$10$ux2k/kwYBKY3k29Wu34pVeYGbXqAoTBzMG2gQi/aTUi9eDzgMiyfC'),
	(4, 'geraldo@ulpgc.es', '$2b$10$ux2k/kwYBKY3k29Wu34pVeYGbXqAoTBzMG2gQi/aTUi9eDzgMiyfC'),
	(5, 'zabai@ulpgc.es', '$2b$10$ux2k/kwYBKY3k29Wu34pVeYGbXqAoTBzMG2gQi/aTUi9eDzgMiyfC'),
	(6, 'felix@ulpgc.es', '$2b$10$ux2k/kwYBKY3k29Wu34pVeYGbXqAoTBzMG2gQi/aTUi9eDzgMiyfC');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
