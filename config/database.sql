-- MySQL dump 10.16  Distrib 10.2.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: sprint2
-- ------------------------------------------------------
-- Server version	10.2.14-MariaDB-10.2.14+maria~artful

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
  `sender` varchar(100) NOT NULL,
  `receiver` varchar(100) NOT NULL,
  `friend_request` int(11) NOT NULL DEFAULT -1,
  PRIMARY KEY (`sender`,`receiver`),
  KEY `Friends_receiver_FK` (`receiver`),
  CONSTRAINT `Friends_receiver_FK` FOREIGN KEY (`receiver`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Friends_sender_FK` FOREIGN KEY (`sender`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` varchar(100) NOT NULL,
  `receiver` varchar(100) NOT NULL,
  `read` tinyint(1) DEFAULT 0,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_sender_FK` (`sender`),
  KEY `messages_receiver_FK` (`receiver`),
  CONSTRAINT `messages_receiver_FK` FOREIGN KEY (`receiver`) REFERENCES `user` (`email`) ON UPDATE CASCADE,
  CONSTRAINT `messages_sender_FK` FOREIGN KEY (`sender`) REFERENCES `user` (`email`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'carlos@ulpgc.es','geraldo@ulpgc.es',0,'geraldo@ulpgc.es'),(2,'carlos@ulpgc.es','geraldo@ulpgc.es',0,'mensaje21');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT 'Nombre',
  `surname` varchar(100) NOT NULL DEFAULT 'Apellidos',
  `image_profile` varchar(100) DEFAULT NULL,
  `university` varchar(100) NOT NULL DEFAULT 'Versia',
  `degree` varchar(100) NOT NULL DEFAULT 'No estudia, es de magisterio',
  PRIMARY KEY (`email`),
  CONSTRAINT `Profile_User_FK` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES ('carlos@ulpgc.es','Carlos','Martel',NULL,'ULPGC','GII'),('david@ulpgc.es','David','Ramírez',NULL,'ULPGC','GII'),('felix@ulpgc.es','Félix','Cruz',NULL,'ULPGC','GII'),('geraldo@ulpgc.es','Geraldo','Rodrigues',NULL,'ULPGC','GII');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('carlos@ulpgc.es','$2b$10$6bOOrjoSwVeFzvZyt9vabOaVroCICTpmD.doleEK9YjA9RBLQHwQi'),('david@ulpgc.es','$2b$10$6bOOrjoSwVeFzvZyt9vabOaVroCICTpmD.doleEK9YjA9RBLQHwQi'),('felix@ulpgc.es','$2b$10$6bOOrjoSwVeFzvZyt9vabOaVroCICTpmD.doleEK9YjA9RBLQHwQi'),('geraldo@ulpgc.es','$2b$10$6bOOrjoSwVeFzvZyt9vabOaVroCICTpmD.doleEK9YjA9RBLQHwQi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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

-- Dump completed on 2018-04-29 15:50:55
