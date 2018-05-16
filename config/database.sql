-- MySQL dump 10.16  Distrib 10.2.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: sprint2
-- ------------------------------------------------------
-- Server version	10.2.14-MariaDB-10.2.14+maria~artful-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friends` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sender` int(10) unsigned NOT NULL,
  `receiver` int(10) unsigned NOT NULL,
  `friend_request` tinyint(1) NOT NULL DEFAULT -1,
  PRIMARY KEY (`id`),
  KEY `sender_friends_users_FK` (`sender`),
  KEY `receiver_friends_users_FK` (`receiver`),
  CONSTRAINT `receiver_friends_users_FK` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sender_friends_users_FK` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (10,2,1,1),(11,3,2,1);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_members`
--

DROP TABLE IF EXISTS `group_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_members` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_members`
--

LOCK TABLES `group_members` WRITE;
/*!40000 ALTER TABLE `group_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `group_admin` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groups_users_FK` (`group_admin`),
  CONSTRAINT `groups_users_FK` FOREIGN KEY (`group_admin`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,1,4,0,'geraldo@ulpgc.es'),(2,1,4,0,'mensaje21'),(3,2,1,0,'test'),(4,2,1,0,'test'),(5,2,1,0,'prueba'),(6,2,3,0,'test'),(7,2,3,0,'test\n');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_users_FK` (`user_id`),
  KEY `posts_posts_FK` (`parent_id`),
  CONSTRAINT `posts_posts_FK` FOREIGN KEY (`parent_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,3,'Mi primer post','2018-05-07 08:54:54',NULL),(2,1,'Primer post de Carlos','2018-05-07 08:54:54',NULL),(3,2,'Primer post de David','2018-05-07 08:54:54',NULL),(4,4,'Primer post de Geraldo','2018-05-07 08:54:54',NULL),(5,3,'Hola Carlos!','2018-05-07 08:54:54',2),(6,1,'Matame pls','2018-05-07 08:54:54',5),(7,3,'Zabai Marica','2018-05-07 08:54:54',NULL),(8,3,'Prueba','2018-05-07 08:54:54',7);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT 'Nombre',
  `surname` varchar(100) NOT NULL DEFAULT 'Apellidos',
  `image_profile` varchar(100) DEFAULT NULL,
  `university` varchar(100) NOT NULL DEFAULT 'ULPGC',
  `degree` varchar(100) NOT NULL DEFAULT 'GII',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId_profiles_UN` (`user_id`),
  UNIQUE KEY `email_profiles_UN` (`email`),
  CONSTRAINT `email_profiles_users_FK` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` (`id`, `user_id`, `email`, `name`, `surname`, `image_profile`, `university`, `degree`) VALUES
	(2, 2, 'carlos@ulpgc.es', 'Carlos', 'Apellidos', NULL, 'Versia', 'No tiene estudios, es de Magisterio.'),
	(3, 3, 'david@ulpgc.es', 'David', 'Apellidos', NULL, 'Versia', 'No tiene estudios, es de Magisterio.'),
	(4, 6, 'felix@ulpgc.es', 'Félix', 'Apellidos', NULL, 'Versia', 'No tiene estudios, es de Magisterio.'),
	(5, 4, 'geraldo@ulpgc.es', 'Geraldo', 'Apellidos', NULL, 'Versia', 'No tiene estudios, es de Magisterio.'),
	(6, 5, 'zabai@ulpgc.es', 'Zabai', 'Apellidos', NULL, 'Versia', 'No tiene estudios, es de Magisterio.');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_users_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`) VALUES
	(2, 'carlos@ulpgc.es', '$2b$10$ux2k/kwYBKY3k29Wu34pVeYGbXqAoTBzMG2gQi/aTUi9eDzgMiyfC'),
	(3, 'david@ulpgc.es', '$2b$10$ux2k/kwYBKY3k29Wu34pVeYGbXqAoTBzMG2gQi/aTUi9eDzgMiyfC'),
	(4, 'geraldo@ulpgc.es', '$2b$10$ux2k/kwYBKY3k29Wu34pVeYGbXqAoTBzMG2gQi/aTUi9eDzgMiyfC'),
	(5, 'zabai@ulpgc.es', '$2b$10$ux2k/kwYBKY3k29Wu34pVeYGbXqAoTBzMG2gQi/aTUi9eDzgMiyfC'),
	(6, 'felix@ulpgc.es', '$2b$10$ux2k/kwYBKY3k29Wu34pVeYGbXqAoTBzMG2gQi/aTUi9eDzgMiyfC');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sprint2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
