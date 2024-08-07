-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: conferencesdb
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `areaID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `priority` int NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`areaID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'Programación','Desarrollo de software y aplicaciones',1,NULL,'2024-07-28 22:25:23'),(2,'Inteligencia Artificial','Estudios y aplicaciones de AI',1,NULL,'2024-07-28 22:25:23'),(3,'Medicina','Innovaciones y descubrimientos médicos',1,NULL,'2024-07-28 22:25:23'),(4,'Diseño UX/UI','Experiencia y diseño de usuario',1,NULL,'2024-07-28 22:25:23'),(5,'Derecho','Aspectos legales y estudios jurídicos',1,NULL,'2024-07-28 22:25:23'),(6,'Educación','Métodos y tecnologías educativas',1,NULL,'2024-07-28 22:25:23'),(7,'Economía','Análisis económico y financiero',1,NULL,'2024-07-28 22:25:23'),(8,'Ciencias Políticas','Estudios de gobierno y políticas',1,NULL,'2024-07-28 22:25:23'),(9,'Ingeniería Civil','Construcción e infraestructuras',1,NULL,'2024-07-28 22:25:23'),(10,'Biotecnología','Tecnología y ciencias biológicas',1,NULL,'2024-07-28 22:25:23'),(11,'Física','Estudios y avances en física',1,NULL,'2024-07-28 22:25:23'),(12,'Química','Investigaciones químicas',1,NULL,'2024-07-28 22:25:23'),(13,'Matemáticas','Teorías y aplicaciones matemáticas',1,NULL,'2024-07-28 22:25:23'),(14,'Sociología','Estudios de la sociedad y comportamiento',1,NULL,'2024-07-28 22:25:23'),(15,'Psicología','Estudios psicológicos y terapias',1,NULL,'2024-07-28 22:25:23'),(16,'Medio Ambiente','Estudios ambientales y sostenibilidad',1,NULL,'2024-07-28 22:25:23'),(17,'Historia','Investigación y estudios históricos',1,NULL,'2024-07-28 22:25:23'),(18,'Filosofía','Estudios filosóficos y ética',1,NULL,'2024-07-28 22:25:23'),(19,'Literatura','Estudios literarios y análisis',1,NULL,'2024-07-28 22:25:23'),(20,'Arte','Estudios artísticos y creaciones',1,NULL,'2024-07-28 22:25:23'),(21,'Música','Teoría y práctica musical',1,NULL,'2024-07-28 22:25:23'),(22,'Astronomía','Estudios y descubrimientos astronómicos',1,NULL,'2024-07-28 22:25:23'),(23,'Agricultura','Tecnologías y técnicas agrícolas',1,NULL,'2024-07-28 22:25:23'),(24,'Robótica','Desarrollo y aplicación de robots',1,NULL,'2024-07-28 22:25:23'),(25,'Ciberseguridad','Seguridad informática y protección de datos',1,NULL,'2024-07-28 22:25:23');
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `areasconference`
--

DROP TABLE IF EXISTS `areasconference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areasconference` (
  `AreasConID` int NOT NULL AUTO_INCREMENT,
  `DateModified` datetime DEFAULT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `areaID` int NOT NULL,
  `conferenceID` int NOT NULL,
  PRIMARY KEY (`AreasConID`),
  KEY `areaID` (`areaID`),
  KEY `FK_conferenceID_conference` (`conferenceID`),
  CONSTRAINT `areasconference_ibfk_1` FOREIGN KEY (`areaID`) REFERENCES `area` (`areaID`),
  CONSTRAINT `FK_conferenceID_conference` FOREIGN KEY (`conferenceID`) REFERENCES `conference` (`conferenceID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areasconference`
--

LOCK TABLES `areasconference` WRITE;
/*!40000 ALTER TABLE `areasconference` DISABLE KEYS */;
INSERT INTO `areasconference` VALUES (1,NULL,'2024-07-28 22:43:44',1,1);
/*!40000 ALTER TABLE `areasconference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conference`
--

DROP TABLE IF EXISTS `conference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference` (
  `conferenceID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` text,
  `DateModified` datetime DEFAULT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `beggingDate` datetime NOT NULL,
  `finishDate` datetime NOT NULL,
  `documentAttempt` int DEFAULT NULL,
  `institutionID` int NOT NULL,
  `Status` int NOT NULL,
  `rolID` int NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`conferenceID`),
  KEY `FK_institutionID_conference` (`institutionID`),
  KEY `FK_rolID_conference` (`rolID`),
  KEY `FK_UserID_conference` (`UserID`),
  CONSTRAINT `FK_institutionID_conference` FOREIGN KEY (`institutionID`) REFERENCES `institution` (`institutionID`),
  CONSTRAINT `FK_rolID_conference` FOREIGN KEY (`rolID`) REFERENCES `roluserconference` (`rolID`),
  CONSTRAINT `FK_UserID_conference` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference`
--

LOCK TABLES `conference` WRITE;
/*!40000 ALTER TABLE `conference` DISABLE KEYS */;
INSERT INTO `conference` VALUES (1,'string','string','string',NULL,'2024-07-28 22:43:44','2024-05-18 21:35:30','2024-08-28 23:54:24',4,1,1,1,1);
/*!40000 ALTER TABLE `conference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conferencetopics`
--

DROP TABLE IF EXISTS `conferencetopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conferencetopics` (
  `TopicsID` int NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Description` varchar(250) NOT NULL,
  `Location` varchar(250) NOT NULL,
  `StartHour` varchar(50) NOT NULL,
  `StartEnd` varchar(50) NOT NULL,
  `conferenceID` int NOT NULL,
  `RegDate` datetime NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  `TotalAttendees` int NOT NULL,
  `TotalSpeakers` int NOT NULL,
  `CounterAttendees` int DEFAULT NULL,
  `CounterTotalSpeakers` int DEFAULT NULL,
  PRIMARY KEY (`TopicsID`),
  KEY `fk_ConferenceTopics_Conference` (`conferenceID`),
  CONSTRAINT `fk_ConferenceTopics_Conference` FOREIGN KEY (`conferenceID`) REFERENCES `conference` (`conferenceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conferencetopics`
--

LOCK TABLES `conferencetopics` WRITE;
/*!40000 ALTER TABLE `conferencetopics` DISABLE KEYS */;
INSERT INTO `conferencetopics` VALUES (1,'tema 1','string','string','2024-07-28 02:49:28.827000','2024-07-28 02:49:28.827000',1,'2024-07-31 20:52:46',NULL,0,0,0,0),(2,'tema 2','string','string','2024-07-28 02:49:28.827000','2024-07-28 02:49:28.827000',1,'2024-07-31 20:52:46',NULL,0,0,0,0),(3,'tema 3','string','string','2024-07-28 02:49:28.827000','2024-07-28 02:49:28.827000',1,'2024-07-31 20:52:46',NULL,0,0,0,0),(5,'tema 2 con cantidad de participantes ','string','string','2024-07-28 02:49:28.827000','2024-07-28 02:49:28.827000',1,'2024-08-03 10:38:06',NULL,100,6,0,3),(6,'tema AI con cantidad de participantes ','string','string','2024-07-28 02:49:28.827000','2024-07-28 02:49:28.827000',1,'2024-08-03 10:38:06',NULL,55,9,0,1),(7,'tema AI e con cantidad de participantes ','string','string','2024-07-28 02:49:28.827000','2024-07-28 02:49:28.827000',1,'2024-08-03 10:44:56',NULL,5,1,0,1);
/*!40000 ALTER TABLE `conferencetopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `CountryID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `isoCode` varchar(50) NOT NULL,
  `phoneCode` varchar(10) NOT NULL,
  `regDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `DateModified` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`CountryID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'El Salvador','SLV','503','2024-07-28 22:30:28',NULL,1);
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diplomadata`
--

DROP TABLE IF EXISTS `diplomadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diplomadata` (
  `DiplomaID` int NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description` varchar(250) NOT NULL,
  `Signed` varchar(50) DEFAULT NULL,
  `CongressLogo` varchar(100) NOT NULL,
  `CongressSeal` varchar(100) NOT NULL,
  `TopicsID` int NOT NULL,
  `RegDate` datetime NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  `BackGroundImgURL` varchar(100) DEFAULT NULL,
  `OrganizerName1` varchar(100) NOT NULL,
  `OrganizerName2` varchar(100) NOT NULL,
  `OrganizerTitle1` varchar(100) NOT NULL,
  `OrganizerTitle2` varchar(100) NOT NULL,
  `SignatureImagePath1` varchar(100) DEFAULT NULL,
  `SignatureImagePath2` varchar(100) DEFAULT NULL,
  `EventDate` varchar(50) DEFAULT NULL,
  `InstitutionName` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`DiplomaID`),
  KEY `fk_DiplomaData_Topics` (`TopicsID`),
  CONSTRAINT `fk_DiplomaData_Topics` FOREIGN KEY (`TopicsID`) REFERENCES `conferencetopics` (`TopicsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diplomadata`
--

LOCK TABLES `diplomadata` WRITE;
/*!40000 ALTER TABLE `diplomadata` DISABLE KEYS */;
/*!40000 ALTER TABLE `diplomadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document` (
  `documentID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `review` int NOT NULL,
  `attempt` int NOT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `DateModified` datetime DEFAULT NULL,
  `UserID` int NOT NULL,
  `TopicsID` int NOT NULL,
  `FileName` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`documentID`),
  KEY `FK_topicsID_document` (`TopicsID`),
  KEY `FK_UserID_document` (`UserID`),
  CONSTRAINT `FK_TopicsID_document` FOREIGN KEY (`TopicsID`) REFERENCES `conferencetopics` (`TopicsID`),
  CONSTRAINT `FK_UserID_document` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentveredict`
--

DROP TABLE IF EXISTS `documentveredict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentveredict` (
  `documentVeredictID` int NOT NULL AUTO_INCREMENT,
  `DateModified` datetime DEFAULT NULL,
  `RagDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `documentID` int NOT NULL,
  `veredictID` int NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`documentVeredictID`),
  KEY `FK_UserID_documentVeredict` (`UserID`),
  KEY `FK_documentID_documentVeredict` (`documentID`),
  KEY `FK_veredictID_documentVeredict` (`veredictID`),
  CONSTRAINT `FK_documentID_documentVeredict` FOREIGN KEY (`documentID`) REFERENCES `document` (`documentID`),
  CONSTRAINT `FK_UserID_documentVeredict` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `FK_veredictID_documentVeredict` FOREIGN KEY (`veredictID`) REFERENCES `veredict` (`veredictID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentveredict`
--

LOCK TABLES `documentveredict` WRITE;
/*!40000 ALTER TABLE `documentveredict` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentveredict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation` (
  `evaluationID` int NOT NULL AUTO_INCREMENT,
  `observation` text,
  `DateModified` datetime DEFAULT NULL,
  `Regdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `criterionID` int NOT NULL,
  `scaleID` int NOT NULL,
  `documentID` int NOT NULL,
  `UserID` int NOT NULL,
  `evaCritConfID` int NOT NULL,
  PRIMARY KEY (`evaluationID`),
  KEY `FK_UserID_evaluation` (`UserID`),
  KEY `FK_documentID_evaluation` (`documentID`),
  KEY `FK_criterionID_evaluation` (`criterionID`),
  KEY `FK_scaleID_evaluation` (`scaleID`),
  KEY `FK_evaCritConfID_evaluation` (`evaCritConfID`),
  CONSTRAINT `FK_criterionID_evaluation` FOREIGN KEY (`criterionID`) REFERENCES `evalutioncriteria` (`criterionID`),
  CONSTRAINT `FK_documentID_evaluation` FOREIGN KEY (`documentID`) REFERENCES `document` (`documentID`),
  CONSTRAINT `FK_evaCritConfID_evaluation` FOREIGN KEY (`evaCritConfID`) REFERENCES `evaluationcriteriaconference` (`evaCritConfID`),
  CONSTRAINT `FK_scaleID_evaluation` FOREIGN KEY (`scaleID`) REFERENCES `evalutionscale` (`scaleID`),
  CONSTRAINT `FK_UserID_evaluation` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation`
--

LOCK TABLES `evaluation` WRITE;
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluationcriteriaconference`
--

DROP TABLE IF EXISTS `evaluationcriteriaconference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluationcriteriaconference` (
  `evaCritConfID` int NOT NULL AUTO_INCREMENT,
  `DateModified` datetime DEFAULT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `criterionID` int NOT NULL,
  `conferenceID` int NOT NULL,
  PRIMARY KEY (`evaCritConfID`),
  KEY `FK_criterionID_evaluationCriteriaConference` (`criterionID`),
  KEY `FK_conferenceID_evaluationCriteriaConference` (`conferenceID`),
  CONSTRAINT `FK_conferenceID_evaluationCriteriaConference` FOREIGN KEY (`conferenceID`) REFERENCES `conference` (`conferenceID`),
  CONSTRAINT `FK_criterionID_evaluationCriteriaConference` FOREIGN KEY (`criterionID`) REFERENCES `evalutioncriteria` (`criterionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluationcriteriaconference`
--

LOCK TABLES `evaluationcriteriaconference` WRITE;
/*!40000 ALTER TABLE `evaluationcriteriaconference` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluationcriteriaconference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evalutioncriteria`
--

DROP TABLE IF EXISTS `evalutioncriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evalutioncriteria` (
  `criterionID` int NOT NULL AUTO_INCREMENT,
  `aspect` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`criterionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evalutioncriteria`
--

LOCK TABLES `evalutioncriteria` WRITE;
/*!40000 ALTER TABLE `evalutioncriteria` DISABLE KEYS */;
/*!40000 ALTER TABLE `evalutioncriteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evalutionscale`
--

DROP TABLE IF EXISTS `evalutionscale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evalutionscale` (
  `scaleID` int NOT NULL AUTO_INCREMENT,
  `scale` varchar(10) NOT NULL,
  `description` text NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`scaleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evalutionscale`
--

LOCK TABLES `evalutionscale` WRITE;
/*!40000 ALTER TABLE `evalutionscale` DISABLE KEYS */;
/*!40000 ALTER TABLE `evalutionscale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institution`
--

DROP TABLE IF EXISTS `institution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institution` (
  `institutionID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `website` varchar(255) NOT NULL,
  `contact_phone` varchar(25) NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`institutionID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institution`
--

LOCK TABLES `institution` WRITE;
/*!40000 ALTER TABLE `institution` DISABLE KEYS */;
INSERT INTO `institution` VALUES (1,'string','string','string',NULL,'2024-07-28 22:43:44');
/*!40000 ALTER TABLE `institution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logerror`
--

DROP TABLE IF EXISTS `logerror`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logerror` (
  `logID` int NOT NULL AUTO_INCREMENT,
  `event` text,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `messege` text,
  `sessionID` int DEFAULT NULL,
  PRIMARY KEY (`logID`),
  KEY `FK_sessionID_logError` (`sessionID`),
  CONSTRAINT `FK_sessionID_logError` FOREIGN KEY (`sessionID`) REFERENCES `sessions` (`sessionID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logerror`
--

LOCK TABLES `logerror` WRITE;
/*!40000 ALTER TABLE `logerror` DISABLE KEYS */;
INSERT INTO `logerror` VALUES (1,'Error en moveConferenceTopics en conferenceDAL en sp_Move_Topics ','2024-08-03 10:29:30','Column count doesn\'t match value count at row 1',7),(2,'Error en moveConferenceTopics en conferenceDAL en sp_Move_Topics ','2024-08-03 10:32:08','Column count doesn\'t match value count at row 1',7),(3,'Error en moveConferenceTopics en conferenceDAL en sp_Move_Topics ','2024-08-03 10:36:32','Field \'CounterAttendees\' doesn\'t have a default value',7);
/*!40000 ALTER TABLE `logerror` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logerrorgernal`
--

DROP TABLE IF EXISTS `logerrorgernal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logerrorgernal` (
  `logID` int NOT NULL AUTO_INCREMENT,
  `event` text,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `messege` text,
  PRIMARY KEY (`logID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logerrorgernal`
--

LOCK TABLES `logerrorgernal` WRITE;
/*!40000 ALTER TABLE `logerrorgernal` DISABLE KEYS */;
/*!40000 ALTER TABLE `logerrorgernal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `permissionID` int NOT NULL AUTO_INCREMENT,
  `permissionName` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`permissionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolepermissions`
--

DROP TABLE IF EXISTS `rolepermissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolepermissions` (
  `rolePerID` int NOT NULL AUTO_INCREMENT,
  `rolID` int NOT NULL,
  `permissionID` int NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rolePerID`),
  KEY `FK_rolID_rolePermissions` (`rolID`),
  KEY `FK_permissionID_rolePermissions` (`permissionID`),
  CONSTRAINT `FK_permissionID_rolePermissions` FOREIGN KEY (`permissionID`) REFERENCES `permissions` (`permissionID`),
  CONSTRAINT `FK_rolID_rolePermissions` FOREIGN KEY (`rolID`) REFERENCES `roluserconference` (`rolID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolepermissions`
--

LOCK TABLES `rolepermissions` WRITE;
/*!40000 ALTER TABLE `rolepermissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `rolepermissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roluserconference`
--

DROP TABLE IF EXISTS `roluserconference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roluserconference` (
  `rolID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  `RegDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`rolID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roluserconference`
--

LOCK TABLES `roluserconference` WRITE;
/*!40000 ALTER TABLE `roluserconference` DISABLE KEYS */;
INSERT INTO `roluserconference` VALUES (1,'administrator',NULL,'2024-07-28 22:26:12',1),(2,'Jury',NULL,'2024-07-28 22:26:12',1),(3,'Speaker',NULL,'2024-07-28 22:26:12',1),(4,'attendee',NULL,'2024-07-28 22:26:12',1);
/*!40000 ALTER TABLE `roluserconference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sessionID` int NOT NULL AUTO_INCREMENT,
  `sessionDateStart` datetime NOT NULL,
  `sessionDateEnd` datetime DEFAULT NULL,
  `sessionStatus` tinyint(1) NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`sessionID`),
  KEY `FK_UserID_sessions` (`UserID`),
  CONSTRAINT `FK_UserID_sessions` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'2024-07-28 22:43:14','2024-07-31 20:13:03',0,1),(2,'2024-07-31 20:13:03','2024-08-01 22:50:49',0,1),(3,'2024-08-01 22:50:49','2024-08-03 10:12:10',0,1),(4,'2024-08-01 22:51:28',NULL,1,2),(5,'2024-08-01 22:52:42','2024-08-03 10:11:56',0,3),(6,'2024-08-03 10:11:56',NULL,1,3),(7,'2024-08-03 10:12:10',NULL,1,1);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temp-conferencetopics`
--

DROP TABLE IF EXISTS `temp-conferencetopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp-conferencetopics` (
  `TopicsID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(150) NOT NULL,
  `Description` varchar(250) NOT NULL,
  `Location` varchar(250) NOT NULL,
  `StartHour` varchar(50) NOT NULL,
  `StartEnd` varchar(50) NOT NULL,
  `conferenceID` int NOT NULL,
  `userID` int NOT NULL,
  `TotalAttendees` int NOT NULL,
  `TotalSpeakers` int NOT NULL,
  PRIMARY KEY (`TopicsID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp-conferencetopics`
--

LOCK TABLES `temp-conferencetopics` WRITE;
/*!40000 ALTER TABLE `temp-conferencetopics` DISABLE KEYS */;
/*!40000 ALTER TABLE `temp-conferencetopics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `birthDate` datetime DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `confirmedMail` tinyint(1) DEFAULT NULL,
  `state` tinyint(1) NOT NULL,
  `profilePictureUrl` varchar(100) DEFAULT NULL,
  `profilePictureFile` varchar(255) DEFAULT NULL,
  `regDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `countryID` int DEFAULT NULL,
  `rolID` int DEFAULT NULL,
  `completeProfile` tinyint(1) NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  KEY `FK_User_CountryID` (`countryID`),
  KEY `FK_User_rolID` (`rolID`),
  CONSTRAINT `FK_User_CountryID` FOREIGN KEY (`countryID`) REFERENCES `country` (`CountryID`),
  CONSTRAINT `FK_User_rolID` FOREIGN KEY (`rolID`) REFERENCES `roluserconference` (`rolID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Wilber','Perez','2024-05-18 21:35:30','wilberdona98@gmail.com',1,1,NULL,NULL,'2024-07-28 22:40:26',1,NULL,0,NULL),(2,'Juan','Perez','2024-05-18 21:35:30','wilberdona89@gmail.com',1,1,'C:\\Users\\wilber\\AppData\\Roaming\\ImageUsers','7a15cc3d-19a6-4165-82f3-54c2095ff52a.jpeg','2024-08-01 21:48:39',1,NULL,1,NULL),(3,'Miguel','Perez','2024-05-18 21:35:30','wilberdona089@gmail.com',1,1,'C:\\Users\\wilber\\AppData\\Roaming\\ImageUsers','e749eb01-70c4-4944-be55-9ab70e44ded1.jpeg','2024-08-01 22:45:17',1,NULL,1,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userconference`
--

DROP TABLE IF EXISTS `userconference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userconference` (
  `userConferenceID` int NOT NULL AUTO_INCREMENT,
  `DateModified` datetime DEFAULT NULL,
  `RefDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `UserID` int NOT NULL,
  `TopicsID` int NOT NULL,
  `RolID` int NOT NULL,
  `Score` decimal(3,2) DEFAULT '0.00',
  PRIMARY KEY (`userConferenceID`),
  KEY `FK_UserID_userConference` (`UserID`),
  KEY `fk_TopicsId` (`TopicsID`),
  KEY `fk_RolId` (`RolID`),
  CONSTRAINT `FK_RolID_userConference` FOREIGN KEY (`RolID`) REFERENCES `roluserconference` (`rolID`),
  CONSTRAINT `fk_TopicsId` FOREIGN KEY (`TopicsID`) REFERENCES `conferencetopics` (`TopicsID`),
  CONSTRAINT `FK_UserID_userConference` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userconference`
--

LOCK TABLES `userconference` WRITE;
/*!40000 ALTER TABLE `userconference` DISABLE KEYS */;
INSERT INTO `userconference` VALUES (1,NULL,'2024-08-01 21:55:17',2,2,3,NULL),(2,NULL,'2024-08-01 22:48:47',3,1,4,NULL),(3,NULL,'2024-08-03 11:18:22',2,6,3,NULL),(4,NULL,'2024-08-03 11:30:39',2,5,3,NULL),(5,NULL,'2024-08-03 11:31:26',2,5,3,NULL),(6,NULL,'2024-08-03 11:31:34',2,5,3,NULL),(7,NULL,'2024-08-03 11:39:58',2,7,3,NULL);
/*!40000 ALTER TABLE `userconference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpassword`
--

DROP TABLE IF EXISTS `userpassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userpassword` (
  `PasswordID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `saltPassword` varchar(1000) NOT NULL,
  `hashPassword` varchar(1000) NOT NULL,
  `regDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `DateModified` datetime DEFAULT NULL,
  PRIMARY KEY (`PasswordID`),
  KEY `FK_UserPassword_UserID` (`UserID`),
  CONSTRAINT `FK_UserPassword_UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpassword`
--

LOCK TABLES `userpassword` WRITE;
/*!40000 ALTER TABLE `userpassword` DISABLE KEYS */;
INSERT INTO `userpassword` VALUES (1,1,'B8npN3W/2dQl7I91dcbyUQ==','ADOs3JaJd1Nflh6U4d7brwWf8xY9FO67NXcv9JbBYsVe2Hy12snKbOd8mMTSQSB4yg==','2024-07-28 22:40:26',NULL),(2,2,'B8npN3W/2dQl7I91dcbyUQ==','AG7AHzw3+b1UJysj4mdx1rpyQugZ/JVvsD9TinGbjYHYn/znqP/V6X4pHTMOVLvLUQ==','2024-08-01 21:48:39',NULL),(3,3,'B8npN3W/2dQl7I91dcbyUQ==','AMmtUUHSkj5PZAcg4NgSF9oJr3lPgbn5ZJXpFgD9N+fbJr4YGEOS0ZaWyvUbT9DOGw==','2024-08-01 22:45:17',NULL);
/*!40000 ALTER TABLE `userpassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veredict`
--

DROP TABLE IF EXISTS `veredict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veredict` (
  `veredictID` int NOT NULL AUTO_INCREMENT,
  `veredict` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `DateModified` datetime DEFAULT NULL,
  `RefDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`veredictID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veredict`
--

LOCK TABLES `veredict` WRITE;
/*!40000 ALTER TABLE `veredict` DISABLE KEYS */;
/*!40000 ALTER TABLE `veredict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'conferencesdb'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetConferenceUsersDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetConferenceUsersDetails`(IN conferenceID INT)
BEGIN
    -- Obtener los detalles del usuario uniendo las tablas necesarias
    SELECT 
        u.UserID, 
        u.name, 
		u.lastname,
        u.email, 
        u.profilePictureFile, 
        u.profilePictureUrl, 
        uc.RolID,
        ct.TopicsID
    FROM 
        `conferencesdb`.`user` u
    INNER JOIN 
        `conferencesdb`.`userconference` uc ON u.UserID = uc.UserID
    INNER JOIN 
        `conferencesdb`.`conferencetopics` ct ON uc.TopicsID = ct.TopicsID
    WHERE 
        ct.conferenceID = conferenceID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MoveTopics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MoveTopics`(IN p_conferenceID INT,IN p_userID INT, OUT result INT)
BEGIN
    DECLARE v_count INT;

    -- Inicializar el valor de resultado en 0 (por defecto no exitoso)
    SET result = 0;

    -- Verificar si hay registros en temp-conferencetopics para el conferenceID dado
    SELECT COUNT(*) INTO v_count
    FROM `temp-conferencetopics`
    WHERE conferenceID = p_conferenceID and userID = p_userID;

    IF v_count = 0 THEN
        -- No hay registros para el conferenceID proporcionado
        SET result = 0;
    ELSE
        -- Insertar los datos seleccionados de temp-conferencetopics a conferencetopics
        INSERT INTO conferencesdb.conferencetopics (
            TopicsID, Name, Description, Location, StartHour, StartEnd, conferenceID, RegDate
        )
        SELECT
            TopicsID, Name, Description, Location, StartHour, StartEnd, conferenceID, NOW() AS RegDate
        FROM
            `temp-conferencetopics`
        WHERE
            conferenceID = p_conferenceID   and userID = p_userID;

        -- Eliminar los datos de temp-conferencetopics después de la inserción
        DELETE FROM `temp-conferencetopics`
        WHERE conferenceID = p_conferenceID  and userID = p_userID;

        -- Si la inserción fue exitosa, actualizar el resultado a 1
        SET result = 1;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_assign_user_topic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_assign_user_topic`(
    IN p_UserID INT,
    IN p_TopicsID INT,
    IN p_RolID INT,
    OUT message VARCHAR(255),
    OUT result INT
)
BEGIN
    /**************************************************************
    Execute: stored procedure that assigns users to a topic
    Require: p_UserID: user ID
             p_TopicsID: topic ID
             p_RolID: user role
             result: 1 = success, 0 = error
    History:
            07/19/2024 creation
    ***************************************************************/

    DECLARE v_UserExists INT DEFAULT 0;
    DECLARE v_TopicExists INT DEFAULT 0;
    DECLARE v_AssignExists INT DEFAULT 0;
    DECLARE v_TotalSpeakers INT DEFAULT 0;
    DECLARE v_CounterTotalSpeakers INT DEFAULT 0;
    DECLARE v_TotalAttendees INT DEFAULT 0;
    DECLARE v_CounterAttendees INT DEFAULT 0;

    -- Inicializar variable de salida
    SET message = '';
    SET result = 0;

    -- Verificar si el usuario existe y está activo
    SELECT COUNT(1) INTO v_UserExists 
    FROM conferencesdb.user 
    WHERE UserID = p_UserID AND state = 1 AND completeProfile = 1;

    -- Verificar si existe el tema indicado
    SELECT COUNT(1) INTO v_TopicExists
    FROM conferencesdb.conferencetopics 
    WHERE TopicsID = p_TopicsID;

    -- Si el usuario y el tema existen, proceder
    IF v_UserExists = 1 AND v_TopicExists = 1 THEN
        -- Validar que el usuario no tenga el mismo rol para un topic específico
        SELECT COUNT(1) INTO v_AssignExists
        FROM conferencesdb.userconference a
        WHERE a.UserID = p_UserID AND a.TopicsID = p_TopicsID AND a.RolID = p_RolID;

        -- En caso de que no exista asignación para el tema con el usuario indicado, proceder a insertar
        IF v_AssignExists = 0 THEN
            -- Obtener valores de las columnas del tema indicado
            SELECT TotalSpeakers, CounterTotalSpeakers, TotalAttendees, CounterAttendees 
            INTO v_TotalSpeakers, v_CounterTotalSpeakers, v_TotalAttendees, v_CounterAttendees
            FROM conferencesdb.conferencetopics 
            WHERE TopicsID = p_TopicsID;

            -- Validar y actualizar contadores según el rol
            IF p_RolID = 3 THEN
                -- Validar que CounterTotalSpeakers no sea igual al TotalSpeakers
                IF v_CounterTotalSpeakers >= v_TotalSpeakers THEN
                    SET message = 'El número máximo de oradores ya ha sido alcanzado';
                ELSE
                    -- Insertar asignación y actualizar contador
                    INSERT INTO conferencesdb.userconference(UserID, TopicsID, RolID) VALUES(p_UserID, p_TopicsID, p_RolID);
                    UPDATE conferencesdb.conferencetopics 
                    SET CounterTotalSpeakers = CounterTotalSpeakers + 1 
                    WHERE TopicsID = p_TopicsID;
                    SET result = 1;
                    SET message = 'Asignación a evento exitosa y contador de oradores actualizado';
                END IF;
            ELSEIF p_RolID = 4 THEN
                -- Validar que CounterAttendees no sea igual al TotalAttendees
                IF v_CounterAttendees >= v_TotalAttendees THEN
                    SET message = 'El número máximo de asistentes ya ha sido alcanzado';
                ELSE
                    -- Insertar asignación y actualizar contador
                    INSERT INTO conferencesdb.userconference(UserID, TopicsID, RolID) VALUES(p_UserID, p_TopicsID, p_RolID);
                    UPDATE conferencesdb.conferencetopics 
                    SET CounterAttendees = CounterAttendees + 1 
                    WHERE TopicsID = p_TopicsID;
                    SET result = 1;
                    SET message = 'Asignación a evento exitosa y contador de asistentes actualizado';
                END IF;
            ELSE
                -- Para otros roles, simplemente insertar
                INSERT INTO conferencesdb.userconference(UserID, TopicsID, RolID) VALUES(p_UserID, p_TopicsID, p_RolID);
                SET result = 1;
                SET message = 'Asignación a evento exitosa';
            END IF;
        ELSE
            SET result = 0;
            SET message = 'El usuario ya posee una asignación para el tema';
        END IF;
    ELSE
        -- En caso de que no exista el usuario o el tema, establecer el mensaje correspondiente
        IF v_UserExists = 0 THEN
            SET message = 'No existe el usuario o no está activo';
        END IF;
        IF v_TopicExists = 0 THEN
            SET message = 'No existe el tema indicado';
        END IF;
    END IF;

    -- Final del procedimiento
    SELECT result AS result;
    SELECT message AS message;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_delete_temp_conferencetopics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_temp_conferencetopics`(
    IN p_TopicsID INT,
    OUT result INT
)
BEGIN
    DECLARE v_exists INT DEFAULT 0;

    -- Verificar si el registro existe
    SELECT COUNT(*)
    INTO v_exists
    FROM `temp-conferencetopics`
    WHERE TopicsID = p_TopicsID;

    IF v_exists = 1 THEN
        -- Si existe, realizar la eliminación
        DELETE FROM `temp-conferencetopics`
        WHERE TopicsID = p_TopicsID;
        
        SET result = 1;
    ELSE
        -- Si no existe, retornar 0
        SET result = 0;
    END IF;

    SELECT result AS result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_document_event` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_document_event`(
    IN p_NameDocument VARCHAR(255),
    IN p_filename VARCHAR(255),
    IN p_UrlDocument VARCHAR(255),
    IN p_TypeDocument VARCHAR(50),
    IN p_UserID INT,
    IN p_TopicsID INT,
    OUT message VARCHAR(255),
    OUT result INT
)
BEGIN
    /**************************************************************
    Execute: stored procedure that inserts document for an event
    Require: p_NameDocument: document's name
             p_UrlDocument:  document's URL
             p_TypeDocument: document's type
             p_UserID: user ID
             p_TopicsID: topic ID
             result: 1 = success, 0 = error
    History:
            07/20/2024 creation
    ***************************************************************/

    DECLARE v_AssignExists INT DEFAULT 0;
    DECLARE v_TopicExists INT DEFAULT 0;
    DECLARE v_Attempt INT DEFAULT 0;
    DECLARE v_isValid INT DEFAULT 1;
	DECLARE v_UserConferenceID INT DEFAULT 0;
    -- Inicializar variable de salida
    SET message = NULL;


  -- Obtener el UserConferenceID basado en p_UserID y p_TopicsID
    SELECT userConferenceID INTO v_UserConferenceID
    FROM conferencesdb.userconference
    WHERE UserID = p_UserID AND TopicsID = p_TopicsID
    LIMIT 1;
    
    -- Verificar si el usuario existe, está activo, si existe asignación, si el tema existe y si tiene rol de ponente
    SELECT COUNT(1) INTO v_AssignExists
    FROM conferencesdb.userconference a
    JOIN conferencesdb.user b ON a.UserID = b.UserID
    JOIN conferencesdb.conferencetopics c ON a.TopicsID = c.TopicsID
    WHERE a.UserID = p_UserID AND b.state = 1
    AND a.userConferenceID =  v_UserConferenceID
    AND b.rolID = (SELECT rolID FROM conferencesdb.roluserconference WHERE name = 'Speaker')
    AND a.TopicsID = p_TopicsID;

    -- Si el usuario no existe, no está activo o si el rol no es ponente
    IF v_AssignExists = 0 THEN
        SET result = 0;
        SET message = 'Usuario no existe, no está asignado al evento o tiene rol diferente de ponente';
        
    END IF;

    -- Validar que el documento no exista más de una vez para el mismo tema por el mismo usuario
    SELECT COUNT(1), IFNULL(MAX(a.attempt), 0) INTO v_TopicExists, v_Attempt
    FROM conferencesdb.document a
    WHERE a.UserID = p_UserID AND a.TopicsID = p_TopicsID;

    -- Si el documento ya existe para ese tema, asignado para el usuario y el intento es menor a 3
    IF v_TopicExists >= 1 AND v_Attempt < 3 THEN
        -- Incrementar el intento en 1
        SET v_Attempt = v_Attempt + 1;
    ELSEIF v_TopicExists >= 1 THEN
        SET result = 0;
        SET message = 'Ya existe una asignación de documento para ese tema por el usuario con intentos mayores a 3';
        
    END IF;

    -- Validar que existan los datos
    IF p_NameDocument IS NULL OR p_NameDocument = '' THEN
        SET v_isValid = 0;
        SET message = 'El nombre del documento es requerido';
    END IF;

    IF p_UrlDocument IS NULL OR p_UrlDocument = '' THEN
        SET v_isValid = 0;
        SET message = 'La URL del documento es requerida';
    END IF;

    IF p_TypeDocument IS NULL OR p_TypeDocument = '' THEN
        SET v_isValid = 0;
        SET message = 'El tipo del documento es requerido';
    END IF;

    -- Validar si los datos son válidos
    IF v_isValid = 1 THEN
        -- Insertar el nuevo documento
        INSERT INTO conferencesdb.document (name, url, type, review, attempt, UserID, TopicsID, FileName)
        VALUES (p_NameDocument, p_UrlDocument, p_TypeDocument, 0, v_Attempt, p_UserID, p_TopicsID, p_filename);

        SET result = 1;
        SET message = 'Asignación de documento realizada con éxito';
    ELSE
        SET result = 0;
        SET message = 'No fue posible asignar el documento';
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_email_exists` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_email_exists`(
    IN p_email VARCHAR(100),
    OUT resultado INT
)
BEGIN
    DECLARE email_count INT;

    -- Verificar si el correo electrónico está registrado
    SELECT COUNT(*) INTO email_count
    FROM user
    WHERE email = p_email and state = 1 and confirmedMail=1;

    -- Asignar resultado basado en si el correo está registrado o no
    IF email_count > 0 THEN
        SET resultado = 01; -- Correo registrado
    ELSE
        SET resultado = 00; -- Correo no registrado
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_end_session` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_end_session`(
    IN p_UserID INT
)
BEGIN
    DECLARE v_sessionID INT;

    -- Verificar si existe una sesión con UserID y sessionStatus = 1
    SELECT sessionID INTO v_sessionID 
    FROM sessions 
    WHERE UserID = p_UserID AND sessionStatus = 1 
    LIMIT 1;
    
    -- Si existe una sesión, actualizar el sessionStatus a 0 y devolver el sessionID
    IF v_sessionID IS NOT NULL THEN
        UPDATE sessions
        SET sessionStatus = 0,
        sessionDateEnd= now()
        WHERE sessionID = v_sessionID;
    END IF;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_area` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_area`()
BEGIN
select*from area where priority =1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_conferences_general` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_conferences_general`()
BEGIN
    DECLARE v_current_date DATE;

    -- Obtener la fecha actual
    SET v_current_date = CURDATE();

    -- Seleccionar todos los detalles de las conferencias que están vigentes en la fecha actual
    SELECT 
        c.conferenceID,
        c.name AS conference_name,
        c.type AS conference_type,
        c.description,
        c.RegDate AS conference_RegDate,
        c.beggingDate,
        c.finishDate,
        c.documentAttempt,
        c.institutionID,
        c.Status,
        i.name AS institution_name,
        i.website AS institution_website,
        i.contact_phone AS institution_contact_phone
    FROM 
        conference c
    LEFT JOIN 
        institution i ON c.institutionID = i.institutionID
    WHERE 
        v_current_date BETWEEN c.RegDate AND c.finishDate;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_conference_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_conference_details`(
    IN p_conferenceID INT
)
BEGIN
    DECLARE v_exists INT DEFAULT 0;
    DECLARE v_current_date DATE;

    -- Obtener la fecha actual
    SET v_current_date = CURDATE();

    -- Verificar si la conferencia existe y si está vigente en la fecha actual
    SELECT COUNT(*) INTO v_exists 
    FROM `conference` 
    WHERE conferenceID = p_conferenceID 
      AND v_current_date BETWEEN RegDate AND finishDate 
    LIMIT 1;

    IF v_exists = 1 THEN
        -- Seleccionar todos los detalles de la conferencia
        SELECT 
            c.conferenceID,
            c.name AS conference_name,
            c.type AS conference_type,
            c.description,
            c.RegDate AS conference_RegDate,
            c.beggingDate,
            c.finishDate,
            c.documentAttempt,
            c.institutionID,
            c.Status,
            i.name AS institution_name,
            i.website AS institution_website,
            i.contact_phone AS institution_contact_phone
        FROM 
            conference c
        LEFT JOIN 
            institution i ON c.institutionID = i.institutionID
        WHERE 
            c.conferenceID = p_conferenceID;
    ELSE
        -- Si no existe, retornar NULL
        SELECT NULL AS conferenceID, NULL AS conference_name, NULL AS conference_type, NULL AS description, 
               NULL AS conference_RegDate, NULL AS beggingDate, NULL AS finishDate, NULL AS documentAttempt,
               NULL AS institutionID, NULL AS Status, NULL AS institution_name, NULL AS institution_website, 
               NULL AS institution_contact_phone;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_conference_details_by_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_conference_details_by_user`(
    IN p_userID INT
)
BEGIN
    DECLARE v_conferenceID INT DEFAULT NULL;
    DECLARE v_topicsID INT DEFAULT NULL;
    DECLARE v_rolID INT DEFAULT NULL;
    DECLARE v_current_date DATE;

    -- Obtener la fecha actual
    SET v_current_date = CURDATE();

    -- Verificar si el userID existe en la tabla conference
    SELECT conferenceID, rolID INTO v_conferenceID, v_rolID 
    FROM conference 
    WHERE userID = p_userID 
    LIMIT 1;

    IF v_conferenceID IS NULL THEN
        -- Si no existe en conference, buscar el topicsID y el rolID en la tabla userconference
        SELECT TopicsID, rolID INTO v_topicsID, v_rolID 
        FROM userconference 
        WHERE userID = p_userID 
        LIMIT 1;

        IF v_topicsID IS NOT NULL THEN
            -- Buscar el topicsID en la tabla conferencetopics
            SELECT conferenceID INTO v_conferenceID 
            FROM conferencetopics 
            WHERE topicsID = v_topicsID
            LIMIT 1;
        END IF;
    END IF;

    -- Verificar si se encontró un conferenceID válido y que esté vigente
    IF v_conferenceID IS NOT NULL AND EXISTS (
        SELECT 1 
        FROM conference 
        WHERE conferenceID = v_conferenceID 
          AND v_current_date BETWEEN RegDate AND finishDate
    ) THEN
        -- Seleccionar todos los detalles de la conferencia
        SELECT 
            c.conferenceID,
            c.name AS conference_name,
            c.type AS conference_type,
            c.description,
            c.RegDate AS conference_RegDate,
            c.beggingDate,
            c.finishDate,
            c.documentAttempt,
            c.institutionID,
            c.Status,
            i.name AS institution_name,
            i.website AS institution_website,
            i.contact_phone AS institution_contact_phone,
            v_rolID AS rolID
        FROM 
            conference c
        LEFT JOIN 
            institution i ON c.institutionID = i.institutionID
        WHERE 
            c.conferenceID = v_conferenceID;
    ELSE
        -- Si no existe, retornar NULL junto con el rolID encontrado
        SELECT NULL AS conferenceID, NULL AS conference_name, NULL AS conference_type, NULL AS description, 
               NULL AS conference_RegDate, NULL AS beggingDate, NULL AS finishDate, NULL AS documentAttempt,
               NULL AS institutionID, NULL AS Status, NULL AS institution_name, NULL AS institution_website, 
               NULL AS institution_contact_phone, v_rolID AS rolID;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_diplomadata` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_diplomadata`(
in p_TopicsID INT, 
in p_UserID INT, 
OUT message VARCHAR(255),
OUT result INT
)
BEGIN

/**************************************************************
Execute: stored procedure that inserts diploma's data
Require: p_TopicsID: topic's ID,
		 p_UserID: user's ID
         result: 1 = success, 0 = error
History:
		07/27/2024 creation
***************************************************************/

DECLARE v_InstitutionExists INT DEFAULT 0;
DECLARE v_UserExists INT DEFAULT 0;
DECLARE v_TopicExists INT DEFAULT 0;
DECLARE v_IsValid INT DEFAULT 1;	
DECLARE v_NombreTema VARCHAR(100) DEFAULT NULL;
DECLARE v_TitleCertificate VARCHAR(100) DEFAULT NULL;
DECLARE v_EventDate VARCHAR(50) DEFAULT NULL;
DECLARE v_ExistsTemplate INT DEFAULT 0;
DECLARE v_ExistsConference INT DEFAULT 0;

	-- Verificar si existe el usuario y si está activo
    SELECT COUNT(1) INTO v_UserExists 
		FROM conferencesdb.user WHERE UserID = p_UserID AND state = 1;
        
	IF v_UserExists = 0 THEN
		SET result = 0;
        SET message = 'El usuario no existe o no está activo';
        SET v_IsValid = 0;
    END IF;

	-- Consultar si existe el tema 
    SELECT COUNT(1) INTO v_TopicExists 
		FROM conferencesdb.conferencetopics WHERE TopicsID = p_TopicsID;
	
    IF v_TopicExists = 0 THEN
		SET result = 0;
		SET message = 'El tema no existe';
        SET v_IsValid = 0;
    END IF;
    
	-- Verificar  existe una plantilla para el tema
    SELECT COUNT(1) INTO v_ExistsTemplate
		FROM conferencesdb.diplomadata WHERE TopicsID = p_TopicsID;
	
    IF v_ExistsTemplate = 0 THEN 
		SET result = 0;
        SET message = 'No existe una asignación de plantilla para el tema';
		SET v_IsValid = 0;
    END IF;
    
    -- Consultar si esta asignado a una conferencia
    SELECT COUNT(1) INTO v_ExistsConference
		FROM conferencesdb.userconference WHERE UserID = p_UserID 
			AND TopicsID = p_TopicsID;
            
		IF v_ExistsConference = 0 THEN
			SET result = 0;
			SET message = 'El usuario no esta asignado a un tema';
			SET v_IsValid = 0;
        END IF;
	
IF v_UserExists = 1 AND v_TopicExists = 1 AND v_IsValid = 1 THEN
	
    -- Consultando datos
    SELECT b.DiplomaID,b.Title,b.Description,b.Signed,
		b.CongressLogo,b.CongressSeal,b.TopicsID,a.UserID,
        b.RegDate,b.DateModified,b.BackGroundImgURL,b.OrganizerName1,
        b.OrganizerName2,b.OrganizerTitle1,b.OrganizerTitle2,
        b.SignatureImagePath1,b.SignatureImagePath2,b.EventDate,
        CONCAT(c.name," ",c.lastname) as ParticipantName,b.InstitutionName, 
        g.name as InstitutionName, c.email as Email, d.Name as TitleTopic
		FROM conferencesdb.userconference a, conferencesdb.diplomadata b, conferencesdb.user c,
        conferencesdb.conferencetopics d, conferencesdb.roluserconference e, conferencesdb.conference f,
        conferencesdb.institution g
        WHERE a.TopicsID = b.TopicsID AND b.TopicsID = 1 AND a.UserID = c.UserID
         AND a.TopicsID = d.TopicsID AND c.rolID = e.rolID AND d.conferenceID = f.conferenceID
         AND f.institutionID = g.institutionID AND e.name = "SPEAKER";
	
	SET result = 1;
    SET message = 'Consulta realizada con éxito';
    
    SELECT @DiplomaID,@Title,@Description,@Signed,@CongressLogo,
		 @CongressSeal,@TopicsID,@UserID,@RegDate,@DateModified,
		 @BackGroundImgURL,@OrganizerName1,@OrganizerName2,@OrganizerTitle1,
		 @OrganizerTitle2,@SignatureImagePath1,@SignatureImagePath2,@EventDate,
        @ParticipantName,@InstitutionName,@Email,@TitleTopic,@result, @message AS result;
ELSE
		SELECT result, message AS result;
END IF;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_userconferences` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_userconferences`(
in p_UserConferenceID INT, 
in p_UserID INT,
in p_TopicsID INT,
OUT message VARCHAR(255),
OUT result INT
)
BEGIN

/**************************************************************
Execute: stored procedure that returns user conferences by topic ID
Require: p_UserConferenceID: user's conference
		 p_UserID : user's ID
		 p_TopicsID : user's topic
         result: 1 = success, 0 = error
History:
		07/21/2024 creation
***************************************************************/
DECLARE v_UserExists INT DEFAULT 0;
DECLARE v_TopicExists INT DEFAULT 0;
DECLARE v_IsValid INT DEFAULT 1;	
DECLARE v_UserConferenceExists INT DEFAULT 0;
DECLARE v_RatingPromedio DECIMAL DEFAULT 0;

	-- Verificar si existe el usuario y si está activo
    SELECT COUNT(1) INTO v_UserExists 
		FROM conferencesdb.user WHERE UserID = p_UserID AND state = 1;
        
	IF v_UserExists = 0 THEN
		SET result = 0;
        SET message = 'El usuario no existe o no está activo';
        SET v_IsValid = 0;
    END IF;
    
    -- Consultar si existe el tema 
    SELECT COUNT(1) INTO v_TopicExists 
		FROM conferencesdb.conferencetopics WHERE TopicsID = p_TopicsID;
	
    IF v_TopicExists = 0 THEN
		SET result = 0;
		SET message = 'El tema no existe';
        SET v_IsValid = 0;
    END IF;
    
    -- Consultar si el usuario tiene asignada la conferencia
    SELECT COUNT(1) INTO v_UserConferenceExists
		FROM conferencesdb.userconference WHERE UserID = p_UserID
			AND TopicsID = p_TopicsID AND userConferenceID = p_UserConferenceID;
            
	IF v_UserConferenceExists = 0 THEN
		SET result = 0;
		SET message = 'No existe asignacion de conferencia para el usuario';
        SET v_IsValid = 0;
    END IF;
    
    
IF v_IsValid = 1 THEN
        
		-- Consultando los temas de las conferencias asociados al usuario
        SELECT a.userConferenceID,a.DateModified,a.RefDate,a.UserID,a.TopicsID,a.RolID,b.Name,
			b.Description,b.Location,b.StartHour,b.StartEnd, c.name,
            Score, (SELECT AVG(Score) FROM conferencesdb.userconference WHERE TopicsID = p_TopicsID) as AVGScore 
            FROM conferencesdb.userconference a,
            conferencesdb.conferencetopics b,conferencesdb.roluserconference c
		WHERE a.UserID = p_UserID AND a.TopicsID = b.TopicsID AND a.TopicsID = p_TopicsID 
        AND a.userConferenceID = p_UserConferenceID
        AND a.RolID = c.rolID;
        
        
        SET result = 1;
        SET message = 'Consulta realizada con éxito';
        
        SELECT @userConferenceID,@DateModified,@RefDate,@UserID,@TopicsID,@RolID,@Score,@AVGScore,
        @result,@message AS result;
    
    ELSE 
		SET result = 0;
        SET message = 'No se encontraron datos, revise el id del usuario o el id del tema';
        
        SELECT @result, @message AS result;
    
    END IF;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_diplomadata` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_diplomadata`(
in p_Description VARCHAR(250),
in p_Signed VARCHAR(50), 
in p_CongresLogoURL VARCHAR(100), 
in p_CongresSealURL VARCHAR(100), 
in p_TopicsID INT, 
in p_UserID INT, 
in p_BackgroundImgURL VARCHAR(100), 
in p_OrganizerName1 VARCHAR(100), 
in p_OrganizerName2 VARCHAR(100), 
in p_OrganizerTitle1 VARCHAR(100), 
in p_OrganizerTitle2 VARCHAR(100), 
in p_SignatureImagePath1 VARCHAR(100), 
in p_SignatureImagePath2 VARCHAR(100),
in p_InstitutionName VARCHAR(250),
OUT message VARCHAR(255),
OUT result INT
)
BEGIN

/**************************************************************
Execute: stored procedure that inserts diploma's data
Require: p_Description: Certificate's description
		 p_Signed: Certificate's signature
		 p_CongresLogoURL: Certificate's congres logo URL
	     p_CongresSealURL: Certificate's congres Seal URL 
		 p_TopicsID: topic's ID,
		 p_UserID: user's ID
		 p_BackgroundImgURL: Certificate's background img URL
		 p_OrganizerName1: organizer's name 
		 p_OrganizerName2: organizer's name2
		 p_OrganizerTitle1: Organizer's title, 
		 p_OrganizerTitle2: Organizer's title2, 
		 p_SignatureImagePath1: Signature image path organizer1, 
		 p_SignatureImagePath2: Signature image path organizer2, 
         p_InstitutionName: institution's name
         result: 1 = success, 0 = error
History:
		07/27/2024 creation
***************************************************************/

DECLARE v_InstitutionExists INT DEFAULT 0;
DECLARE v_UserExists INT DEFAULT 0;
DECLARE v_TopicExists INT DEFAULT 0;
DECLARE v_IsValid INT DEFAULT 1;	
DECLARE v_NombreTema VARCHAR(100) DEFAULT NULL;
DECLARE v_TitleCertificate VARCHAR(100) DEFAULT NULL;
DECLARE v_EventDate VARCHAR(50) DEFAULT NULL;
DECLARE v_ExistsTemplate INT DEFAULT 0;

	-- Verificar si existe el usuario y si está activo
    SELECT COUNT(1) INTO v_UserExists 
		FROM conferencesdb.user WHERE UserID = p_UserID AND state = 1;
        
	IF v_UserExists = 0 THEN
		SET result = 0;
        SET message = 'El usuario no existe o no está activo';
        SET v_IsValid = 0;
    END IF;

	-- Consultar si existe el tema 
    SELECT COUNT(1) INTO v_TopicExists 
		FROM conferencesdb.conferencetopics WHERE TopicsID = p_TopicsID;
	
    IF v_TopicExists = 0 THEN
		SET result = 0;
		SET message = 'El tema no existe';
        SET v_IsValid = 0;
    END IF;
    
	-- Verificar sino existe una plantilla para el tema
    SELECT COUNT(1) INTO v_ExistsTemplate
		FROM conferencesdb.diplomadata WHERE TopicsID = p_TopicsID;
	
    IF v_ExistsTemplate >= 1 THEN 
		SET result = 0;
        SET message = 'Ya existe una asignación de plantilla para el tema';
		SET v_IsValid = 0;
    END IF;
	
IF v_UserExists = 1 AND v_TopicExists = 1 AND v_IsValid = 1 THEN
	
    -- Consultar el nombre del tema, fecha
    SELECT DATE_FORMAT(b.finishDate,'%d/%m/%Y') INTO v_EventDate
		FROM conferencesdb.conferencetopics a , conferencesdb.conference b
         WHERE a.TopicsID = p_TopicsID AND a.conferenceID = b.conferenceID;

	-- Insertar dato del certificado
    INSERT INTO conferencesdb.diplomadata(Title,Description,Signed,CongressLogo,CongressSeal,TopicsID,
		RegDate,DateModified,BackGroundImgURL,OrganizerName1,OrganizerName2,OrganizerTitle1,OrganizerTitle2,SignatureImagePath1,
		SignatureImagePath2,EventDate,InstitutionName) VALUES ("Diploma de participación",p_Description,NULL,p_CongresLogoURL,p_CongresSealURL,
		p_TopicsID,CURRENT_TIMESTAMP,NULL,p_BackgroundImgURL,p_OrganizerName1,p_OrganizerName2,p_OrganizerTitle1,
        p_OrganizerTitle2,p_SignatureImagePath1,p_SignatureImagePath2,v_EventDate,p_InstitutionName);
	
	SET result = 1;
    SET message = 'Inserción realizada con éxito';
    
    SELECT result, message AS result;
ELSE
		SELECT result, message AS result;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_log` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_log`(
in p_UserID int,
in  p_event text ,
in p_message text
  
)
BEGIN
DECLARE v_sessionID INT;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_sessionID = NULL;

    -- Verificar si existe una sesión con UserID y sessionStatus = 1
    SELECT sessionID INTO v_sessionID 
    FROM sessions 
    WHERE UserID = p_UserID AND sessionStatus = 1 
    LIMIT 1;
    
    -- Insertar en logError si se encontró una sesión activa
    IF v_sessionID IS NOT NULL THEN
        INSERT INTO logError (event, RegDate, messege, sessionID)
        VALUES (p_event, NOW(), p_message, v_sessionID);
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_temp_conferencetopics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_temp_conferencetopics`(
    IN p_Name VARCHAR(150),
    IN p_Description VARCHAR(250),
    IN p_Location VARCHAR(250),
    IN p_StartHour VARCHAR(50),
    IN p_StartEnd VARCHAR(50),
    IN p_conferenceID INT,
    IN p_userID INT,
    IN P_TotalAttendees INT,
	IN p_TotalSpeakers INT
    
)
BEGIN
    INSERT INTO `temp-conferencetopics` (Name, Description, Location, StartHour, StartEnd, conferenceID, userID,TotalAttendees,TotalSpeakers)
    VALUES (p_Name, p_Description, p_Location, p_StartHour, p_StartEnd, p_conferenceID, p_userID,P_TotalAttendees,p_TotalSpeakers);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_ListTopicsByConferenceID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ListTopicsByConferenceID`(IN p_conferenceID INT)
BEGIN
    SELECT 
        TopicsID, 
        Name, 
        Description, 
        Location, 
        StartHour, 
        StartEnd, 
        conferenceID
    FROM 
       conferencetopics
    WHERE 
        conferenceID = p_conferenceID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_ListTopicsByTopicsID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ListTopicsByTopicsID`(IN p_topicsID INT)
BEGIN
    SELECT 
        TopicsID, 
        Name, 
        Description, 
        Location, 
        StartHour, 
        StartEnd, 
        conferenceID
    FROM 
        conferencetopics
    WHERE 
        TopicsID = p_topicsID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_list_temp_conferencetopics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_temp_conferencetopics`(
    IN p_conferenceID INT
)
BEGIN
    SELECT TopicsID, Name, Description, Location, StartHour, StartEnd, conferenceID, userID,TotalAttendees,TotalSpeakers 
    FROM `temp-conferencetopics`
    WHERE conferenceID = p_conferenceID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_manage_score` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_manage_score`(
in p_UserConferenceID INT, 
in p_UserID INT, 
in p_TopicsID INT,
in p_Score DECIMAL(3,2),
OUT message VARCHAR(255),
OUT result INT
)
BEGIN

/**************************************************************
Execute: stored procedure that manage score for conference
Require: p_UserConferenceID: conference's ID,
		 p_UserID: user's ID
         p_TopicID: topic's ID
         result: 1 = success, 0 = error
History:
	08/05/2024 creation
***************************************************************/

DECLARE v_UserExists INT DEFAULT 0;
DECLARE v_TopicExists INT DEFAULT 0;
DECLARE v_IsValid INT DEFAULT 1;	
DECLARE v_CurrentScore DECIMAL(3,2) DEFAULT 0;
DECLARE v_UserConferenceExists INT DEFAULT 0;

	-- Verificar si existe el usuario y si está activo
    SELECT COUNT(1) INTO v_UserExists 
		FROM conferencesdb.user WHERE UserID = p_UserID AND state = 1;
        
	IF v_UserExists = 0 THEN
		SET result = 0;
        SET message = 'El usuario no existe o no está activo';
        SET v_IsValid = 0;
    END IF;

	-- Consultar si existe el tema 
    SELECT COUNT(1) INTO v_TopicExists 
		FROM conferencesdb.conferencetopics WHERE TopicsID = p_TopicsID;
	
    IF v_TopicExists = 0 THEN
		SET result = 0;
		SET message = 'El tema no existe';
        SET v_IsValid = 0;
    END IF;
    
    -- Consultar si el usuario tiene asignada la conferencia
    SELECT COUNT(1) INTO v_UserConferenceExists
		FROM conferencesdb.userconference WHERE UserID = p_UserID
			AND TopicsID = p_TopicsID AND userConferenceID = p_UserConferenceID;
            
	IF v_UserConferenceExists = 0 THEN
		SET result = 0;
		SET message = 'No existe asignacion de conferencia para el usuario';
        SET v_IsValid = 0;
    END IF;

IF v_UserExists = 1 AND v_TopicExists = 1 AND v_IsValid = 1 THEN
	
    -- Consultar puntaje de la conferencia
    SELECT Score INTO v_CurrentScore
		FROM conferencesdb.userconference WHERE UserID = p_UserID
			AND TopicsID = p_TopicsID  AND userConferenceID = p_UserConferenceID;
            
		-- Si el puntaje es mayor o igual a 0, entonces proceder con actualizacion
        IF v_CurrentScore >=0 OR v_CurrentScore IS NULL THEN
			UPDATE conferencesdb.userconference SET Score = p_Score
				WHERE UserID = p_UserID
			AND TopicsID = p_TopicsID  AND userConferenceID = p_UserConferenceID;
        END IF;
        
	SET result = 1;
    SET message = 'Actualizacion realizada con éxito';
    
    SELECT @result, @message AS result;
    
ELSE
		SELECT @result, @message AS result;
END IF;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_Move_Topics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Move_Topics`(IN p_conferenceID INT,IN p_userID INT, OUT result INT)
BEGIN
    DECLARE v_count INT;

    -- Inicializar el valor de resultado en 0 (por defecto no exitoso)
    SET result = 0;

    -- Verificar si hay registros en temp-conferencetopics para el conferenceID dado
    SELECT COUNT(*) INTO v_count
    FROM `temp-conferencetopics`
    WHERE conferenceID = p_conferenceID and userID = p_userID;

    IF v_count = 0 THEN
        -- No hay registros para el conferenceID proporcionado
        SET result = 0;
    ELSE
        -- Insertar los datos seleccionados de temp-conferencetopics a conferencetopics
        INSERT INTO conferencesdb.conferencetopics (
            TopicsID, Name, Description, Location, StartHour, StartEnd, conferenceID, RegDate,TotalAttendees,TotalSpeakers,CounterAttendees,CounterTotalSpeakers
        )
        SELECT
            TopicsID, Name, Description, Location, StartHour, StartEnd, conferenceID, NOW() AS RegDate,TotalAttendees,TotalSpeakers,0,0
        FROM
            `temp-conferencetopics`
        WHERE
            conferenceID = p_conferenceID   and userID = p_userID;

        -- Eliminar los datos de temp-conferencetopics después de la inserción
        DELETE FROM `temp-conferencetopics`
        WHERE conferenceID = p_conferenceID  and userID = p_userID;

        -- Si la inserción fue exitosa, actualizar el resultado a 1
        SET result = 1;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_register_imagens` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_register_imagens`(
    IN p_UserID INT,
    IN p_url VARCHAR(255),
    IN p_name VARCHAR(255),
    OUT result INT,
    OUT PictureFile VARCHAR(255)
)
BEGIN
    DECLARE v_exists INT DEFAULT 0;
    DECLARE v_profilePictureFile VARCHAR(255);
    DECLARE v_profilePictureUrl VARCHAR(255);

    -- Verificar si el usuario existe y está activo
    SELECT 1 INTO v_exists 
    FROM user 
    WHERE UserID = p_UserID AND state = 1 
    LIMIT 1;

    -- Si el usuario existe y está activo
    IF v_exists = 1 THEN
        -- Obtener los valores actuales de profilePictureFile y profilePictureUrl
        SELECT profilePictureFile, profilePictureUrl 
        INTO v_profilePictureFile, v_profilePictureUrl
        FROM user 
        WHERE UserID = p_UserID;

        -- Verificar si ya existen valores en profilePictureFile o profilePictureUrl
        IF v_profilePictureFile IS NOT NULL AND v_profilePictureUrl IS NOT NULL THEN
            -- Si existen, actualizar los valores y retornar el valor de profilePictureFile junto con result
            UPDATE user 
            SET profilePictureUrl = p_url, profilePictureFile = p_name, completeProfile = 1 
            WHERE UserID = p_UserID;
            SET result = 2;
            SET PictureFile = v_profilePictureFile;
        ELSE
            -- Si no existen, solo actualizar los datos y retornar result como 1
            UPDATE user 
            SET profilePictureUrl = p_url, profilePictureFile = p_name, completeProfile = 1 
            WHERE UserID = p_UserID;
            SET result = 1;
            SET PictureFile = NULL;
        END IF;
    ELSE
        -- Si no existe, retornar 0
        SET result = 0;
        SET PictureFile = NULL;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_registration_conference` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registration_conference`(
in p_UserID int,
in p_RollID int,
in p_nameInstitution varchar(100),
in p_websiteInstitution varchar (100),
in p_contactPhoneInstitution varchar (25),
in p_nameConference varchar(100),
in p_typeConference varchar(100),
in p_description text,
in p_beggingDate datetime,
in p_finishDate datetime,
in p_areaID int,
in p_documentAttempt int,
OUT result INT

)
BEGIN
DECLARE v_exists INT DEFAULT 0;
DECLARE v_institucionID INT;
DECLARE v_conferenceID INT;

  -- Verificar si el usuario existe y está activo
    SELECT 1 INTO v_exists 
    FROM user 
    WHERE UserID = p_UserID AND state = 1 
    LIMIT 1;
 IF v_exists = 1 THEN
   -- Inserta en la tabla `institution` y obtiene el `id`
 insert into institution(name,website,contact_phone,regDate)
 values(p_nameInstitution,p_websiteInstitution,p_contactPhoneInstitution,now());
  SET v_institucionID = LAST_INSERT_ID();
  
   -- Inserta en la tabla `conference` y obtiene el `id`
 insert into conference (name,type,description,RegDate,beggingDate,finishDate,documentAttempt,institutionID,Status)
 values (p_nameConference,p_typeConference,p_description,now(),p_beggingDate,p_finishDate,p_documentAttempt,v_institucionID,1);
SET v_conferenceID = LAST_INSERT_ID();

insert into  userconference (RefDate,UserID,conferenceID,rolID)
values(now(),p_UserID,v_conferenceID,p_RollID);

insert into areasconference (RegDate,areaID,conferenceID)
values(now(),p_areaID,v_conferenceID);
SET result = 1;

  ELSE
        -- Si no existe, retornar 0
        SET result = 0;
        
        SELECT result AS result;
    END IF;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_registration_conferences` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registration_conferences`(
    IN p_UserID INT,
    IN p_RollID INT,
    IN p_nameInstitution VARCHAR(100),
    IN p_websiteInstitution VARCHAR(100),
    IN p_contactPhoneInstitution VARCHAR(25),
    IN p_nameConference VARCHAR(100),
    IN p_typeConference VARCHAR(100),
    IN p_description TEXT,
    IN p_beggingDate DATETIME,
    IN p_finishDate DATETIME,
    IN p_areaID INT,
    IN p_documentAttempt INT,
    OUT result INT,
    OUT conferenceID INT
)
BEGIN
    DECLARE v_exists INT DEFAULT 0;
    DECLARE v_institucionID INT;

    -- Verificar si el usuario existe y está activo
    SELECT 1 INTO v_exists 
    FROM `user` 
    WHERE UserID = p_UserID AND state = 1 and completeProfile=1
    LIMIT 1;

	


    IF v_exists = 1 THEN
        -- Inserta en la tabla `institution` y obtiene el `id`
        INSERT INTO institution(name, website, contact_phone, regDate)
        VALUES(p_nameInstitution, p_websiteInstitution, p_contactPhoneInstitution, NOW());
        SET v_institucionID = LAST_INSERT_ID();

        -- Inserta en la tabla `conference` y obtiene el `id`
        INSERT INTO conference (name, type, description, RegDate, beggingDate, finishDate, documentAttempt, institutionID, Status,UserID,rolID)
        VALUES (p_nameConference, p_typeConference, p_description, NOW(), p_beggingDate, p_finishDate, p_documentAttempt, v_institucionID, 1,p_UserID,p_RollID);
        SET conferenceID = LAST_INSERT_ID();

        -- Inserta en la tabla `userconference`
       -- INSERT INTO userconference (RefDate, UserID, conferenceID, rolID)
       -- VALUES(NOW(), p_UserID, conferenceID, p_RollID);

        -- Inserta en la tabla `areasconference`
        INSERT INTO areasconference (RegDate, areaID, conferenceID)
        VALUES(NOW(), p_areaID, conferenceID);

        SET result = 1;
    ELSE
        -- Si no existe, retornar 0
        SET result = 0;
        SET conferenceID = NULL;
    END IF;
    
    -- Retornar el resultado y el ID de la conferencia
    SELECT result AS result, conferenceID AS conferenceID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_start_session` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_start_session`(
    IN p_UserID INT
)
BEGIN
    DECLARE v_sessionID INT;

    -- Verificar si existe una sesión con UserID y sessionStatus = 1
    SELECT sessionID INTO v_sessionID FROM sessions 
    WHERE UserID = p_UserID AND sessionStatus = 1 
    LIMIT 1;
    
    -- Si existe una sesión, actualizar el sessionStatus a 0 y devolver el sessionID
    IF v_sessionID IS NOT NULL THEN
        UPDATE sessions
        SET sessionStatus = 0,
        sessionDateEnd= now()
        WHERE sessionID = v_sessionID;
    END IF;

    -- Insertar un nuevo registro de sesión
    INSERT INTO sessions (sessionDateStart, sessionStatus, UserID)
    VALUES (NOW(), 1, p_UserID);

  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_temp_conferencetopics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_temp_conferencetopics`(
    IN p_TopicsID INT,
    IN p_Name VARCHAR(150),
    IN p_Description VARCHAR(250),
    IN p_Location VARCHAR(250),
    IN p_StartHour VARCHAR(50),
    IN p_StartEnd VARCHAR(50),
    IN p_conferenceID INT,
    IN p_userID INT,
    IN p_TotalAttendees INT,
	IN p_TotalSpeakers INT,
    OUT result INT
)
BEGIN
    DECLARE v_exists INT DEFAULT 0;

    -- Verificar si el registro existe
    SELECT COUNT(*)
    INTO v_exists
    FROM `temp-conferencetopics`
    WHERE TopicsID = p_TopicsID;

    IF v_exists = 1 THEN
        -- Si existe, realizar la actualización
        UPDATE `temp-conferencetopics`
        SET Name = p_Name,
            Description = p_Description,
            Location = p_Location,
            StartHour = p_StartHour,
            StartEnd = p_StartEnd,
            conferenceID = p_conferenceID,
            userID = p_userID,
            TotalAttendees=p_TotalAttendees,
            TotalSpeakers =p_TotalSpeakers 
        WHERE TopicsID = p_TopicsID;
        
        SET result = 1;
    ELSE
        -- Si no existe, retornar 0
        SET result = 0;
    END IF;

    SELECT result AS result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_user_perfil` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_perfil`(
    IN p_UserID INT
)
BEGIN
    DECLARE v_exists INT DEFAULT 0;

    -- Verificar si el usuario existe y está activo
    SELECT 1 INTO v_exists 
    FROM user 
    WHERE UserID = p_UserID AND state = 1 
    LIMIT 1;
    
    -- Si el usuario existe y está activo
    IF v_exists = 1 THEN
        SELECT 
			UserID,
            name,
            lastname,
            email,
            birthDate,
            countryID,
            profilePictureUrl,
            profilePictureFile
            
        FROM 
            user 
        WHERE 
            UserID = p_UserID AND state = 1;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_validate_credentials` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_validate_credentials`(
IN p_email VARCHAR(250),
IN p_password VARCHAR(1000)
)
BEGIN
 SELECT 
        user.UserID AS UserID,
        user.email AS email,
        user.confirmedMail AS confirmedMail,
        user.state AS state,
        user.completeProfile AS completeProfile,
        user.countryID AS countryID,
		pwd.saltPassword AS Password
    FROM 
        `user`
    INNER JOIN 
        userpassword pwd ON pwd.UserID = `user`.UserID
    WHERE 
        `user`.email = p_email AND pwd.saltPassword = p_password COLLATE utf8mb4_bin
    ORDER BY 
        `user`.UserID DESC 
    LIMIT 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_validate_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_validate_email`(
IN p_UserID int,
OUT p_Status INT
)
BEGIN
DECLARE v_confirmedMail INT;
    
    -- Verificar si el usuario existe y obtener el estado del correo
    SELECT confirmedMail
    INTO v_confirmedMail
    FROM user
    WHERE UserID = p_UserID;
    
  
        -- Si el correo ya está confirmado
        IF v_confirmedMail = 1 THEN
            SET p_Status = 1;
        ELSE
            -- Si el correo no está confirmado, actualizar y responder con 0
            UPDATE user
            SET confirmedMail = 1
            WHERE UserID = p_UserID;
            
            SET p_Status = 0;
        END IF;
   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `TruncateAllTables` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `TruncateAllTables`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE tbl_name VARCHAR(255);
    DECLARE tbl_cursor CURSOR FOR
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'conferencesdb' AND table_type = 'BASE TABLE';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    SET FOREIGN_KEY_CHECKS = 0;

    OPEN tbl_cursor;
    read_loop: LOOP
        FETCH tbl_cursor INTO tbl_name;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SET @truncate_stmt = CONCAT('TRUNCATE TABLE `conferencesdb`.`', tbl_name, '`');
        PREPARE stmt FROM @truncate_stmt;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END LOOP;
    CLOSE tbl_cursor;

    SET FOREIGN_KEY_CHECKS = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `user_data_registration` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_data_registration`(
    -- Add the parameters for the stored procedure here
    IN p_name VARCHAR(50),
    IN p_Lastname VARCHAR(50),
    IN p_Email VARCHAR(50),
    IN p_Birthdate DATETIME,
    IN p_passwordHash VARCHAR(1000),
    IN p_passwordSalt VARCHAR(1000)
  
)
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    -- SET NOCOUNT ON;

    DECLARE v_UserID INT;
   
    DECLARE v_ResponseCode INT;
   

    IF EXISTS (SELECT email FROM user WHERE email = p_Email and state=1 and confirmedMail=1 ) THEN
        SELECT 'Correo ya se encuentra registrado' AS Message, 1 AS ResponseCode;
    ELSE
        -- Registro de usuario
       INSERT INTO user (name, lastname, birthDate, email, confirmedMail, state, countryID, completeProfile)
				values(p_name,p_lastname,p_birthDate,p_email,0,1,1,0);
 
        SET v_UserID = LAST_INSERT_ID();

      

        -- Inserción de contraseña
        INSERT INTO userpassword (userID, hashPassword, saltpassword, regdate)
        VALUES (v_UserID, p_passwordHash, p_passwordSalt, NOW());

      
       
        SELECT  2 AS ResponseCode, v_UserID as UserID;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-05 23:47:06
