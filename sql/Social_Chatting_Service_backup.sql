-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: chat_project
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `FOLLOW_FROM` varchar(40) NOT NULL,
  `FOLLOW_TO` varchar(40) NOT NULL,
  `STATUS` char(1) NOT NULL,
  PRIMARY KEY (`FOLLOW_FROM`,`FOLLOW_TO`),
  KEY `FOLLOW_TO` (`FOLLOW_TO`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`FOLLOW_FROM`) REFERENCES `user` (`USERID`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`FOLLOW_TO`) REFERENCES `user` (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES ('user01','user02','Y'),('user01','user03','Y'),('user01','user04','Y'),('user01','user05','Y'),('user01','user06','Y'),('user01','user07','Y'),('user01','user08','Y'),('user01','user09','Y'),('user01','user10','Y'),('user02','user01','Y'),('user03','user01','Y'),('user04','user01','Y'),('user05','user01','Y'),('user06','user01','Y'),('user07','user01','Y'),('user08','user01','Y'),('user09','user01','Y'),('user10','user01','Y');
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `MESSAGE_ID` int NOT NULL AUTO_INCREMENT,
  `MESSAGE_CONTENT` varchar(2000) NOT NULL,
  `MESSAGE_SENDTIME` timestamp NOT NULL,
  `MESSAGE_SENDER` varchar(40) NOT NULL,
  `MESSAGE_RECEIVER` varchar(40) NOT NULL,
  PRIMARY KEY (`MESSAGE_ID`),
  KEY `MESSAGE_SENDER` (`MESSAGE_SENDER`),
  KEY `MESSAGE_RECEIVER` (`MESSAGE_RECEIVER`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`MESSAGE_SENDER`) REFERENCES `user` (`USERID`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`MESSAGE_RECEIVER`) REFERENCES `user` (`USERID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'user01: 하이','2021-01-21 19:13:24','user01','user03'),(2,'user01: 하이','2021-01-21 19:13:25','user01','user03'),(3,'user01: 하이','2021-01-21 19:13:26','user01','user03'),(4,'user01: 하이','2021-01-21 19:13:26','user01','user03'),(5,'user01: 하이','2021-01-21 19:13:26','user01','user03'),(6,'user01: 안녕하세요','2021-01-21 20:24:20','user01','user02'),(7,'user01: 와 됐다..','2021-01-21 20:24:22','user01','user02'),(8,'user01: 와 진짜 된거??','2021-01-21 20:24:35','user01','user02'),(9,'user01: 대박...','2021-01-21 20:24:47','user01','user02'),(10,'user01: ?','2021-01-21 20:24:52','user01','user02'),(11,'user01: ㅎㅇ','2021-01-21 20:25:18','user01','user02'),(12,'user01: 안녕하세요~','2021-01-21 20:25:53','user01','user04');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('CvThwmSs2ERE-1gwx8PZfVgLP4h5z4um',1611288122,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `USERID` varchar(40) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `JOIN_DATE` date NOT NULL,
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('user01','user01','2021-01-21'),('user02','user02','2021-01-21'),('user03','user03','2021-01-21'),('user04','user04','2021-01-21'),('user05','user05','2021-01-21'),('user06','user06','2021-01-22'),('user07','user07','2021-01-22'),('user08','user08','2021-01-22'),('user09','user09','2021-01-22'),('user10','user10','2021-01-22');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-22 10:38:45
