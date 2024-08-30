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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `Location` varchar(250) DEFAULT NULL,
  `urlconference` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`conferenceID`),
  KEY `FK_institutionID_conference` (`institutionID`),
  KEY `FK_rolID_conference` (`rolID`),
  KEY `FK_UserID_conference` (`UserID`),
  CONSTRAINT `FK_institutionID_conference` FOREIGN KEY (`institutionID`) REFERENCES `institution` (`institutionID`),
  CONSTRAINT `FK_rolID_conference` FOREIGN KEY (`rolID`) REFERENCES `roluserconference` (`rolID`),
  CONSTRAINT `FK_UserID_conference` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `conferencetopics`
--

DROP TABLE IF EXISTS `conferencetopics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conferencetopics` (
  `TopicsID` int NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `qualification` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`documentID`),
  KEY `FK_topicsID_document` (`TopicsID`),
  KEY `FK_UserID_document` (`UserID`),
  CONSTRAINT `FK_TopicsID_document` FOREIGN KEY (`TopicsID`) REFERENCES `conferencetopics` (`TopicsID`),
  CONSTRAINT `FK_UserID_document` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `documentevaluationcriteria`
--

DROP TABLE IF EXISTS `documentevaluationcriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentevaluationcriteria` (
  `EvaluationCriteriaID` int NOT NULL AUTO_INCREMENT,
  `evaCritConfID` int NOT NULL,
  `scaleID` int NOT NULL,
  `UserID` int NOT NULL,
  `documentID` int NOT NULL,
  `regDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateModified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`EvaluationCriteriaID`),
  KEY `evaCritConfID` (`evaCritConfID`),
  KEY `scaleID` (`scaleID`),
  KEY `UserID` (`UserID`),
  KEY `documentID` (`documentID`),
  CONSTRAINT `documentevaluationcriteria_ibfk_1` FOREIGN KEY (`evaCritConfID`) REFERENCES `evaluationcriteriaconference` (`evaCritConfID`),
  CONSTRAINT `documentevaluationcriteria_ibfk_2` FOREIGN KEY (`scaleID`) REFERENCES `evalutionscale` (`scaleID`),
  CONSTRAINT `documentevaluationcriteria_ibfk_3` FOREIGN KEY (`UserID`) REFERENCES `userconference` (`UserID`),
  CONSTRAINT `documentevaluationcriteria_ibfk_4` FOREIGN KEY (`documentID`) REFERENCES `document` (`documentID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `description` varchar(240) DEFAULT NULL,
  `userID` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`institutionID`),
  KEY `fk_institution_user` (`userID`),
  CONSTRAINT `fk_institution_user` FOREIGN KEY (`userID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `speakerconference`
--

DROP TABLE IF EXISTS `speakerconference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `speakerconference` (
  `SpeakerConferenceID` int NOT NULL AUTO_INCREMENT,
  `TopicsID` int DEFAULT NULL,
  `NameSpeaker` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SpeakerConferenceID`),
  KEY `fk_TopicsID_SpeakerConference` (`TopicsID`),
  CONSTRAINT `fk_TopicsID_SpeakerConference` FOREIGN KEY (`TopicsID`) REFERENCES `conferencetopics` (`TopicsID`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tempspeakerconference`
--

DROP TABLE IF EXISTS `tempspeakerconference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tempspeakerconference` (
  `SpeakerConferenceID` int NOT NULL AUTO_INCREMENT,
  `TopicsID` int DEFAULT NULL,
  `NameSpeaker` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SpeakerConferenceID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `userassignedconference`
--

DROP TABLE IF EXISTS `userassignedconference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userassignedconference` (
  `UserAssignedConferenceID` int NOT NULL AUTO_INCREMENT,
  `DateModified` datetime DEFAULT NULL,
  `RefDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `UserID` int NOT NULL,
  `conferenceID` int NOT NULL,
  PRIMARY KEY (`UserAssignedConferenceID`),
  KEY `FK_UserID_UserAssignedConference` (`UserID`),
  KEY `fk_conferenceID_UserAssignedConference` (`conferenceID`),
  CONSTRAINT `fk_conferenceID_UserAssignedConference` FOREIGN KEY (`conferenceID`) REFERENCES `conference` (`conferenceID`),
  CONSTRAINT `FK_UserID_UserAssignedConference` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!50003 DROP PROCEDURE IF EXISTS `GetDocumentEvaluationDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDocumentEvaluationDetails`(IN p_documentID INT)
BEGIN
    -- Consulta para obtener los detalles de evaluación del documento
    SELECT 
        ec.aspect,
        ec.description AS criterionDescription,
        es.scale,
        es.description AS scaleDescription
    FROM 
        `conferencesdb`.`documentevaluationcriteria` AS de
    INNER JOIN 
        `conferencesdb`.`evaluationcriteriaconference` AS ecc 
        ON de.evaCritConfID = ecc.evaCritConfID
    INNER JOIN 
        `conferencesdb`.`evalutioncriteria` AS ec 
        ON ecc.criterionID = ec.criterionID
    INNER JOIN 
        `conferencesdb`.`evalutionscale` AS es 
        ON de.scaleID = es.scaleID
    WHERE 
        de.documentID = p_documentID;

    -- Consulta para obtener el veredict asociado al documento
    SELECT 
      --  dv.veredictID,
        v.veredict
    FROM 
        `conferencesdb`.`documentveredict` AS dv
    INNER JOIN 
        `conferencesdb`.`veredict` AS v 
        ON dv.veredictID = v.veredictID
    WHERE 
        dv.documentID = p_documentID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetValidateDocumentVerdict` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetValidateDocumentVerdict`(
    IN p_documentID INT,
    OUT p_status VARCHAR(20)
)
BEGIN
    DECLARE v_approvalCount INT DEFAULT 0;
    DECLARE v_rejectionCount INT DEFAULT 0;

    -- Contar los veredictos "Aprobado" para el documento
    SELECT COUNT(*) INTO v_approvalCount
    FROM conferencesdb.documentveredict dv
    JOIN conferencesdb.veredict v ON dv.veredictID = v.veredictID
    WHERE dv.documentID = p_documentID AND v.veredict = 'Aprobado';

    -- Contar los veredictos "Rechazado" para el documento
    SELECT COUNT(*) INTO v_rejectionCount
    FROM conferencesdb.documentveredict dv
    JOIN conferencesdb.veredict v ON dv.veredictID = v.veredictID
    WHERE dv.documentID = p_documentID AND v.veredict = 'Rechazado';

    -- Validar el estatus del documento basado en el conteo de veredictos
    IF v_approvalCount >= 2 THEN
        SET p_status = 'Aprobado';
    ELSEIF v_rejectionCount >= 2 THEN
        SET p_status = 'Rechazado';
    ELSE
        SET p_status = 'Pendiente';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `obtener_promedio_score_por_topic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_promedio_score_por_topic`(IN p_topicID INT)
BEGIN
    SELECT 
        ct.TopicsID,
        ct.conferenceID,
        ROUND(AVG(uc.score), 0) AS promedio_score
    FROM 
        conferencesdb.userconference uc
    INNER JOIN 
        conferencesdb.conferencetopics ct ON uc.TopicsID = ct.TopicsID
    WHERE 
        ct.TopicsID = p_topicID
    GROUP BY 
        ct.TopicsID, ct.conferenceID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `obtener_score_por_topic_UserID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_score_por_topic_UserID`(IN p_topicID INT, IN p_userID INT)
BEGIN
    SELECT 
        ct.TopicsID,
        ct.conferenceID,
        uc.score
    FROM 
        conferencesdb.userconference uc
    INNER JOIN 
        conferencesdb.conferencetopics ct ON uc.TopicsID = ct.TopicsID
    WHERE 
        ct.TopicsID = p_topicID
        AND uc.UserID = p_userID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegisterUserAssignedConference` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegisterUserAssignedConference`(
    IN p_UserID INT,
    IN p_conferenceID INT,
    OUT result INT
)
BEGIN
    DECLARE user_exists INT;
    DECLARE conference_exists INT;

    -- Verificar si el usuario existe
    SELECT COUNT(*) INTO user_exists
    FROM `user`
    WHERE `UserID` = p_UserID;

    -- Verificar si la conferencia existe
    SELECT COUNT(*) INTO conference_exists
    FROM `conference`
    WHERE `conferenceID` = p_conferenceID and Status=1;

    -- Validar si ambos existen
    IF user_exists = 1 AND conference_exists = 1 THEN
        INSERT INTO `UserAssignedConference` (`UserID`, `conferenceID`, `DateModified`)
        VALUES (p_UserID, p_conferenceID, NOW());
        SET result = 1; -- Registro exitoso
    ELSE
        SET result = 0; -- No se realizó el registro
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
    DECLARE v_existst INT DEFAULT 0;

    -- Verificar si el registro en temp-conferencetopics existe
    SELECT COUNT(*)
    INTO v_exists
    FROM `temp-conferencetopics`
    WHERE TopicsID = p_TopicsID;

    IF v_exists = 1 THEN
        -- Verificar si el registro en tempspeakerconference existe
        SELECT COUNT(*)
        INTO v_existst
        FROM `tempspeakerconference`
        WHERE TopicsID = p_TopicsID;

        IF v_existst = 1 THEN
            -- Si existe, eliminar el registro en tempspeakerconference
            DELETE FROM `tempspeakerconference`
            WHERE TopicsID = p_TopicsID;
        END IF;

        -- Eliminar el registro en temp-conferencetopics
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
    DECLARE v_AssignExists INT DEFAULT 0;
    DECLARE v_TopicExists INT DEFAULT 0;
    DECLARE v_Attempt INT DEFAULT 0;
    DECLARE v_isValid INT DEFAULT 1;
    DECLARE v_UserConferenceID INT DEFAULT 0;
    DECLARE v_review INT ;
    DECLARE v_message varchar(250) ;
    
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
    AND a.rolID = (SELECT rolID FROM conferencesdb.roluserconference WHERE name = 'Speaker')
    AND a.TopicsID = p_TopicsID;

    -- Si el usuario no existe, no está activo o si el rol no es ponente
    IF v_AssignExists = 0 THEN
        SET result = 0;
         SET v_isValid = 0;
		set v_message = 'Usuario no existe, no está asignado al evento o tiene rol diferente de ponente';
  
    END IF;

    -- Validar que el documento no exista más de una vez para el mismo tema por el mismo usuario
    SELECT COUNT(1), IFNULL(MAX(a.attempt), 0), Max(a.review) INTO v_TopicExists, v_Attempt,v_review
    FROM conferencesdb.document a
    WHERE a.UserID = p_UserID AND a.TopicsID = p_TopicsID;

    -- Si el documento ya existe para ese tema, asignado para el usuario y el intento es menor a 3
    IF v_TopicExists >= 1  THEN
        -- IF v_Attempt > 3 THEN
			 SET v_isValid = 0;
			SET v_message = 'Ya existe una asignación de documento para ese tema por el usuario con intentos mayores a 3';
          
-- ELSE
  -- Incrementar el intento en 1
          --  SET v_Attempt = v_Attempt + 1;
         
      --  END IF;
    ELSE
        -- Si el documento no existe, establecer el intento en 1
        SET v_Attempt = 1;
       
    END IF;

    -- Validar que existan los datos
    IF p_NameDocument IS NULL OR p_NameDocument = '' THEN
        SET v_isValid = 0;
        SET message = 'El nombre del documento es requerido';
    END IF;

    IF p_UrlDocument IS NULL OR p_UrlDocument = '' THEN
        SET v_isValid = 0;
        SET v_message = 'La URL del documento es requerida';
    END IF;

    IF p_TypeDocument IS NULL OR p_TypeDocument = '' THEN
        SET v_isValid = 0;
        SET v_message = 'El tipo del documento es requerido';
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
        SET message = v_message;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetConferenceAgenda` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetConferenceAgenda`(
    IN p_ConferenceID INT
)
BEGIN
    SELECT 
        ct.TopicsID,
        ct.name,
        ct.Description,
        ct.Location,
        DATE_FORMAT(ct.StartHour, '%h:%i %p') AS StartHour,  -- Formato 12 horas (HH:MM AM/PM)
        DATE_FORMAT(ct.StartEnd, '%h:%i %p') AS StartEnd,    -- Formato 12 horas (HH:MM AM/PM)
        GROUP_CONCAT(tsc.NameSpeaker ORDER BY tsc.NameSpeaker SEPARATOR ', ') AS nameSpeaker
    FROM 
        `conferencesdb`.`conferencetopics` ct
    LEFT JOIN 
        `conferencesdb`.`speakerconference` tsc 
    ON 
        ct.TopicsID = tsc.TopicsID
    WHERE 
        ct.conferenceID = p_ConferenceID
    GROUP BY 
        ct.TopicsID, 
        ct.name, 
        ct.Description, 
        ct.Location, 
        ct.StartHour, 
        ct.StartEnd;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetConferenceUsers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetConferenceUsers`(IN conferenceId INT)
BEGIN
    SELECT 
        u.UserID,
        u.name,  
        u.lastname,
        u.email,
        ct.TopicsID,
        ct.name AS topicName,
        ct.Description,
        uc.RolID,
        rc.name AS roleName
    FROM 
        `conferencesdb`.`conferencetopics` ct
    JOIN 
        `conferencesdb`.`userconference` uc ON ct.TopicsID = uc.TopicsID
    JOIN 
        `conferencesdb`.`user` u ON uc.UserID = u.UserID
    JOIN 
        `conferencesdb`.`roluserconference` rc ON uc.RolID = rc.RolID
    WHERE 
        ct.conferenceID = conferenceId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetDocumentAndUserDetailsByTopicsID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetDocumentAndUserDetailsByTopicsID`(IN p_TopicsID INT)
BEGIN
    -- Consulta para obtener los datos de la tabla `document`
    SELECT 
        d.documentID,
        d.name,
        d.RegDate,
        d.review,
        d.UserID,
        d.TopicsID,
        d.url,
        d.FileName,
        u.name AS userName,
        u.lastname AS userLastname,
        u.email AS userEmail
    FROM 
        document d
    JOIN 
        user u
    ON 
        d.UserID = u.UserID
    WHERE 
        d.TopicsID = p_TopicsID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetDocumentAndUserDetailsByUserID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetDocumentAndUserDetailsByUserID`(IN p_userID INT)
BEGIN
    -- Declaración de variables
    DECLARE v_documentID INT;
    DECLARE v_name VARCHAR(255);
    DECLARE v_RegDate DATETIME;
    DECLARE v_review TINYINT;
    DECLARE v_UserID INT;
    DECLARE v_TopicsID INT;
    DECLARE v_url VARCHAR(255);
    DECLARE v_FileName VARCHAR(255);
    DECLARE v_status VARCHAR(20);

    DECLARE v_approvalCount INT DEFAULT 0;
    DECLARE v_rejectionCount INT DEFAULT 0;
    DECLARE done INT DEFAULT 0;

    -- Declaración del cursor para recorrer los documentos
    DECLARE doc_cursor CURSOR FOR
    SELECT 
        d.documentID,
        d.name,
        d.RegDate,
        d.review,
        d.UserID,
        d.TopicsID,
        d.url,
        d.FileName
    FROM 
        document d
    WHERE 
        d.UserID = p_userID;

    -- Handler para manejar el final del cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Crear una tabla temporal para almacenar los resultados
    CREATE TEMPORARY TABLE TempDocumentResults (
        documentID INT,
        name VARCHAR(255),
        RegDate DATETIME,
        review TINYINT,
        UserID INT,
        TopicsID INT,
        url VARCHAR(255),
        FileName VARCHAR(255),
        status VARCHAR(20)
    );

    -- Abrir el cursor
    OPEN doc_cursor;

    -- Bucle para recorrer los resultados del cursor
    read_loop: LOOP
        FETCH doc_cursor INTO v_documentID, v_name, v_RegDate, v_review, v_UserID, v_TopicsID, v_url, v_FileName;
        
        -- Salir del bucle si no hay más datos
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Contar los veredictos "Aprobado" para el documento
        SELECT COUNT(*) INTO v_approvalCount
        FROM conferencesdb.documentveredict dv
        JOIN conferencesdb.veredict v ON dv.veredictID = v.veredictID
        WHERE dv.documentID = v_documentID AND v.veredict = 'Aprobado';

        -- Contar los veredictos "Rechazado" para el documento
        SELECT COUNT(*) INTO v_rejectionCount
        FROM conferencesdb.documentveredict dv
        JOIN conferencesdb.veredict v ON dv.veredictID = v.veredictID
        WHERE dv.documentID = v_documentID AND v.veredict = 'Rechazado';

        -- Validar el estatus del documento basado en el conteo de veredictos
        IF v_approvalCount >= 2 THEN
            SET v_status = 'Aprobado';
        ELSEIF v_rejectionCount >= 2 THEN
            SET v_status = 'Rechazado';
        ELSE
            SET v_status = 'Pendiente';
        END IF;

        -- Insertar los resultados en la tabla temporal
        INSERT INTO TempDocumentResults (documentID, name, RegDate, review, UserID, TopicsID, url, FileName, status)
        VALUES (v_documentID, v_name, v_RegDate, v_review, v_UserID, v_TopicsID, v_url, v_FileName, v_status);
    END LOOP;

    -- Cerrar el cursor
    CLOSE doc_cursor;

    -- Devolver todos los resultados en un solo SELECT
    SELECT * FROM TempDocumentResults;

    -- Eliminar la tabla temporal
    DROP TEMPORARY TABLE TempDocumentResults;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetDocumentAndUserDetailsByUserID_TopicsID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetDocumentAndUserDetailsByUserID_TopicsID`(
    IN p_userID INT, 
    IN p_TopicsID INT
)
BEGIN
    -- Declaración de variables
    DECLARE v_documentID INT;
    DECLARE v_name VARCHAR(255);
    DECLARE v_RegDate DATETIME;
    DECLARE v_review TINYINT;
    DECLARE v_UserID INT;
    DECLARE v_TopicsID INT;
    DECLARE v_url VARCHAR(255);
    DECLARE v_FileName VARCHAR(255);
    DECLARE v_status VARCHAR(20);

    DECLARE v_approvalCount INT DEFAULT 0;
    DECLARE v_rejectionCount INT DEFAULT 0;
    DECLARE done INT DEFAULT 0;

    -- Declaración del cursor para recorrer los documentos
    DECLARE doc_cursor CURSOR FOR
    SELECT 
        d.documentID,
        d.name,
        d.RegDate,
        d.review,
        d.UserID,
        d.TopicsID,
        d.url,
        d.FileName
    FROM 
        document d
    WHERE 
        d.UserID = p_userID 
        AND d.TopicsID = p_TopicsID;

    -- Handler para manejar el final del cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Crear una tabla temporal para almacenar los resultados
    CREATE TEMPORARY TABLE TempDocumentResults (
        documentID INT,
        name VARCHAR(255),
        RegDate DATETIME,
        review TINYINT,
        UserID INT,
        TopicsID INT,
        url VARCHAR(255),
        FileName VARCHAR(255),
        status VARCHAR(20)
    );

    -- Abrir el cursor
    OPEN doc_cursor;

    -- Bucle para recorrer los resultados del cursor
    read_loop: LOOP
        FETCH doc_cursor INTO v_documentID, v_name, v_RegDate, v_review, v_UserID, v_TopicsID, v_url, v_FileName;
        
        -- Salir del bucle si no hay más datos
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Contar los veredictos "Aprobado" para el documento
        SELECT COUNT(*) INTO v_approvalCount
        FROM conferencesdb.documentveredict dv
        JOIN conferencesdb.veredict v ON dv.veredictID = v.veredictID
        WHERE dv.documentID = v_documentID AND v.veredict = 'Aprobado';

        -- Contar los veredictos "Rechazado" para el documento
        SELECT COUNT(*) INTO v_rejectionCount
        FROM conferencesdb.documentveredict dv
        JOIN conferencesdb.veredict v ON dv.veredictID = v.veredictID
        WHERE dv.documentID = v_documentID AND v.veredict = 'Rechazado';

        -- Validar el estatus del documento basado en el conteo de veredictos
        IF v_approvalCount >= 2 THEN
            SET v_status = 'Aprobado';
        ELSEIF v_rejectionCount >= 2 THEN
            SET v_status = 'Rechazado';
        ELSE
            SET v_status = 'Pendiente';
        END IF;

        -- Insertar los resultados en la tabla temporal
        INSERT INTO TempDocumentResults (documentID, name, RegDate, review, UserID, TopicsID, url, FileName, status)
        VALUES (v_documentID, v_name, v_RegDate, v_review, v_UserID, v_TopicsID, v_url, v_FileName, v_status);
    END LOOP;

    -- Cerrar el cursor
    CLOSE doc_cursor;

    -- Devolver todos los resultados en un solo SELECT
    SELECT * FROM TempDocumentResults;

    -- Eliminar la tabla temporal
    DROP TEMPORARY TABLE TempDocumentResults;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetDocumentEvaluationDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetDocumentEvaluationDetails`(IN p_documentID INT)
BEGIN
    -- Consulta para obtener los detalles de evaluación del documento
    SELECT 
        ec.aspect,
        ec.description AS criterionDescription,
        es.scale,
        es.description AS scaleDescription
    FROM 
        `conferencesdb`.`documentevaluationcriteria` AS de
    INNER JOIN 
        `conferencesdb`.`evaluationcriteriaconference` AS ecc 
        ON de.evaCritConfID = ecc.evaCritConfID
    INNER JOIN 
        `conferencesdb`.`evalutioncriteria` AS ec 
        ON ecc.criterionID = ec.criterionID
    INNER JOIN 
        `conferencesdb`.`evalutionscale` AS es 
        ON de.scaleID = es.scaleID
    WHERE 
        de.documentID = p_documentID;

    -- Consulta para obtener el veredict asociado al documento
    SELECT 
        dv.veredictID,
        v.veredict
    FROM 
        `conferencesdb`.`documentveredict` AS dv
    INNER JOIN 
        `conferencesdb`.`veredict` AS v 
        ON dv.veredictID = v.veredictID
    WHERE 
        dv.documentID = p_documentID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetDocumentsByUserAndRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetDocumentsByUserAndRole`(
    IN p_UserID INT,
    IN p_TopicsID INT,
    IN p_RolID INT
)
BEGIN
    -- Declaración de variables
    DECLARE reviewJury INT DEFAULT 0;

    -- Validación de RolID
    IF p_RolID = 3 THEN
        -- RolID = 3: Devuelve todos los documentos
        SELECT documentID, name, RegDate, review, UserID, TopicsID, url, FileName,reviewJury
        FROM conferencesdb.document where UserID=p_UserID and TopicsID= p_TopicsID;
    
    ELSEIF p_RolID = 2 THEN
        -- RolID = 2: Validar si existe un registro en la tabla documentveredict
        IF EXISTS (SELECT 1 FROM conferencesdb.documentveredict WHERE UserID = p_UserID) THEN
            SET reviewJury = 1;
        ELSE
            SET reviewJury = 0;
        END IF;
        
        -- Devolver los documentos del TopicID específico y el valor calificado
        SELECT documentID, name, RegDate, review, UserID, TopicsID, url, FileName,reviewJury
        FROM conferencesdb.document
        WHERE TopicsID = p_TopicsID;
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetEvaluationCriteriaByConference` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetEvaluationCriteriaByConference`(
    IN p_ConferenceID INT
)
BEGIN
    -- Selecciona todos los criterionID relacionados con la conferencia dada
    SELECT 
       
        ec.evaCritConfID,
        ec.conferenceID,
        c.aspect, 
        c.description
    FROM 
        `conferencesdb`.`evaluationcriteriaconference` ec
    JOIN 
        `conferencesdb`.`evalutioncriteria` c 
    ON 
        ec.criterionID = c.criterionID
    WHERE 
        ec.conferenceID = p_ConferenceID;
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
    DECLARE v_conferenceID INT;
    DECLARE done INT DEFAULT 0;

    -- Declarar un cursor para obtener los conferenceID que cumplen con la condición
    DECLARE conference_cursor CURSOR FOR
    SELECT conferenceID
    FROM `conferencesdb`.`conference`
    WHERE NOW() NOT BETWEEN NOW() AND finishDate 
    AND Status = 1;

    -- Manejo de la finalización del cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Abrir el cursor
    OPEN conference_cursor;

    -- Bucle para recorrer los resultados del cursor
    read_loop: LOOP
        FETCH conference_cursor INTO v_conferenceID;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Actualizar el Status a 0 para cada conferenceID
        UPDATE `conferencesdb`.`conference`
        SET Status = 0
        WHERE conferenceID = v_conferenceID;

        -- Aquí se podría realizar alguna acción adicional si es necesario
    END LOOP;

    -- Cerrar el cursor
    CLOSE conference_cursor;

    -- Seleccionar y devolver los registros actualizados junto con TotalSum
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
		c.Location,
		c.urlconference,
        i.name AS institution_name,
        i.website AS institution_website,
        i.contact_phone AS institution_contact_phone,
        (
            SELECT 
                SUM(IFNULL(TotalAttendees, 0) + IFNULL(TotalSpeakers, 0))
            FROM 
                `conferencesdb`.`conferencetopics` 
            WHERE 
                conferenceID = c.conferenceID
        ) AS TotalCupos,
        
                ( 
            SELECT 
                SUM(IFNULL(CounterAttendees, 0) + IFNULL(CounterTotalSpeakers, 0))
            FROM 
                `conferencesdb`.`conferencetopics` 
            WHERE 
                conferenceID = c.conferenceID
        ) AS TotalRegistrados
    FROM 
        `conferencesdb`.`conference` c
    LEFT JOIN 
        `conferencesdb`.`institution` i ON c.institutionID = i.institutionID;
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
            c.UserID,
            c.name AS conference_name,
            c.type AS conference_type,
            c.description,
            c.RegDate AS conference_RegDate,
            c.beggingDate,
            c.finishDate,
            c.documentAttempt,
            c.institutionID,
            c.Status,
            c.Location,
            c.urlconference,
            i.name AS institution_name,
            i.website AS institution_website,
            i.contact_phone AS institution_contact_phone,
            (
            SELECT 
                SUM(IFNULL(TotalAttendees, 0) + IFNULL(TotalSpeakers, 0))
            FROM 
                `conferencesdb`.`conferencetopics` 
            WHERE 
                conferenceID = c.conferenceID
        ) AS TotalCupos,
        
                ( 
            SELECT 
                SUM(IFNULL(CounterAttendees, 0) + IFNULL(CounterTotalSpeakers, 0))
            FROM 
                `conferencesdb`.`conferencetopics` 
            WHERE 
                conferenceID = c.conferenceID
        ) AS TotalRegistrados
        FROM 
            conference c
        LEFT JOIN 
            institution i ON c.institutionID = i.institutionID
        WHERE 
            c.conferenceID = p_conferenceID;
    ELSE
        -- Si no existe, retornar NULL
        SELECT null as UserID,NULL AS conferenceID, NULL AS conference_name, NULL AS conference_type, NULL AS description, 
               NULL AS conference_RegDate, NULL AS beggingDate, NULL AS finishDate, NULL AS documentAttempt,
               NULL AS institutionID, NULL AS Status, NULL AS institution_name, NULL AS institution_website, 
               NULL AS institution_contact_phone,null as TotalRegistrados,null as TotalRegistrados;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_conference_details_by_user`(IN p_userID INT)
BEGIN
    -- Crear tabla temporal para almacenar los IDs de conferencia y el rol
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_conferences (
        conferenceID INT,
        rolID INT
    );

    -- Vaciar la tabla temporal si ya existen datos
    TRUNCATE TABLE temp_conferences;

    -- Insertar IDs de conferencias directamente asociadas al usuario junto con el rol
    INSERT INTO temp_conferences (conferenceID, rolID)
    SELECT conferenceID, MAX(rolID) -- Utilizar el rol asociado en la tabla 'conference'
    FROM conference
    WHERE userID = p_userID
    GROUP BY conferenceID;

    -- Insertar IDs de conferencias asignadas al usuario en UserAssignedConference con rolID = 0 si no están en la tabla 'conference'
    INSERT INTO temp_conferences (conferenceID, rolID)
    SELECT conferenceID, 0
    FROM UserAssignedConference
    WHERE UserID = p_userID
    AND conferenceID NOT IN (SELECT conferenceID FROM conference WHERE userID = p_userID);

    -- Seleccionar todos los detalles de las conferencias
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
		c.Location,
		c.urlconference,
        i.name AS institution_name,
        i.website AS institution_website,
        i.contact_phone AS institution_contact_phone,
        tc.rolID,
          (
            SELECT 
                SUM(IFNULL(TotalAttendees, 0) + IFNULL(TotalSpeakers, 0))
            FROM 
                `conferencesdb`.`conferencetopics` 
            WHERE 
                conferenceID = c.conferenceID
        ) AS TotalCupos,
        
                ( 
            SELECT 
                SUM(IFNULL(CounterAttendees, 0) + IFNULL(CounterTotalSpeakers, 0))
            FROM 
                `conferencesdb`.`conferencetopics` 
            WHERE 
                conferenceID = c.conferenceID
        ) AS TotalRegistrados
    FROM
        temp_conferences tc
    LEFT JOIN
        conference c ON tc.conferenceID = c.conferenceID
    LEFT JOIN
        institution i ON c.institutionID = i.institutionID;

    -- Eliminar la tabla temporal
    DROP TEMPORARY TABLE IF EXISTS temp_conferences;

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
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_emails_and_names_by_user_and_document` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_emails_and_names_by_user_and_document`(
    IN p_userID INT,
    IN p_documentID INT
)
BEGIN
    DECLARE v_TopicsID INT;
    DECLARE v_conferenceID INT;
    DECLARE v_userID1 INT;
    DECLARE v_userID2 INT;
    DECLARE v_userID3 INT;
    DECLARE v_name VARCHAR(255);
    DECLARE v_name2 VARCHAR(255);
    DECLARE v_nameadmin VARCHAR(255);
    DECLARE v_nameuser VARCHAR(255);
    DECLARE v_emailAdmin VARCHAR(255);
    DECLARE v_emailuser VARCHAR(255);

    -- Variables para los jurados
    DECLARE v_emailJury1 VARCHAR(255) DEFAULT NULL;
    DECLARE v_nameJury1 VARCHAR(255) DEFAULT NULL;
  

    -- Obtener el TopicsID y UserID basado en el documentID
    SELECT UserID, TopicsID INTO v_userID1, v_TopicsID
    FROM `conferencesdb`.`document`
    WHERE documentID = p_documentID
    LIMIT 1;

    -- Obtener el conferenceID y el nombre del topic basado en el TopicsID
    SELECT conferenceID, Name INTO v_conferenceID, v_name
    FROM `conferencesdb`.`conferencetopics`
    WHERE TopicsID = v_TopicsID
    LIMIT 1;

    -- Obtener el UserID y nombre del conferenceID obtenido
    SELECT UserID, name INTO v_userID2, v_name2 
    FROM `conferencesdb`.`conference`
    WHERE conferenceID = v_conferenceID
    LIMIT 1;

    -- Obtener el email y nombre del administrador (UserID1)
    SELECT email, name INTO v_emailAdmin, v_nameadmin
    FROM `conferencesdb`.`user`
    WHERE UserID = v_userID2
    LIMIT 1;

    -- Obtener el email y nombre del usuario pasado como parámetro (p_userID)
    SELECT email, name INTO v_emailuser, v_nameuser
    FROM `conferencesdb`.`user`
    WHERE UserID = v_userID1
    LIMIT 1;
    
    SELECT email, name INTO v_emailJury1, v_nameJury1
    FROM `conferencesdb`.`user`
    WHERE UserID = p_userID
    LIMIT 1;

   

    -- Devolver los resultados
    SELECT 
        v_name2 AS ConferenceName, 
        v_name AS NameTopics, 
        v_emailAdmin AS EmailAdmin, 
        v_nameadmin AS NameAdmin, 
        v_emailuser AS EmailUser, 
        v_nameuser AS NameUser,
        v_emailJury1 AS EmailJury1, 
        v_nameJury1 AS NameJury1;
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_emails_and_names_by_user_and_topic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_emails_and_names_by_user_and_topic`(
    IN p_userID INT,
    IN p_TopicsID INT
)
BEGIN
    DECLARE v_conferenceID INT;
    DECLARE v_userID1 INT;
    DECLARE v_name VARCHAR(255);
    DECLARE v_name2 VARCHAR(255);
    DECLARE v_nameadmin VARCHAR(255);
    DECLARE v_nameuser VARCHAR(255);
    DECLARE v_emailAdmin VARCHAR(255);
    DECLARE v_emailuser VARCHAR(255);

    -- Variables para los jurados
    DECLARE v_emailJury1 VARCHAR(255) DEFAULT NULL;
    DECLARE v_nameJury1 VARCHAR(255) DEFAULT NULL;
    DECLARE v_emailJury2 VARCHAR(255) DEFAULT NULL;
    DECLARE v_nameJury2 VARCHAR(255) DEFAULT NULL;
    DECLARE v_emailJury3 VARCHAR(255) DEFAULT NULL;
    DECLARE v_nameJury3 VARCHAR(255) DEFAULT NULL;

    -- Buscar el conferenceID basado en TopicsID
    SELECT conferenceID, Name INTO v_conferenceID, v_name
    FROM `conferencesdb`.`conferencetopics`
    WHERE TopicsID = p_TopicsID
    LIMIT 1;

    -- Buscar el UserID del conferenceID obtenido
    SELECT UserID, name INTO v_userID1, v_name2 
    FROM `conferencesdb`.`conference`
    WHERE conferenceID = v_conferenceID
    LIMIT 1;

    -- Buscar el email y name del primer UserID (administrador)
    SELECT email, name INTO v_emailAdmin, v_nameadmin
    FROM `conferencesdb`.`user`
    WHERE UserID = v_userID1
    LIMIT 1;

    -- Buscar el email y name del segundo UserID (usuario pasado como parámetro)
    SELECT email, name INTO v_emailuser, v_nameuser
    FROM `conferencesdb`.`user`
    WHERE UserID = p_userID
    LIMIT 1;

    -- Buscar los emails y nombres de los jurados
    SELECT 
        MAX(CASE WHEN rnk = 1 THEN email END) AS EmailJury1,
        MAX(CASE WHEN rnk = 1 THEN name END) AS NameJury1,
        MAX(CASE WHEN rnk = 2 THEN email END) AS EmailJury2,
        MAX(CASE WHEN rnk = 2 THEN name END) AS NameJury2,
        MAX(CASE WHEN rnk = 3 THEN email END) AS EmailJury3,
        MAX(CASE WHEN rnk = 3 THEN name END) AS NameJury3
    INTO 
        v_emailJury1, v_nameJury1,
        v_emailJury2, v_nameJury2,
        v_emailJury3, v_nameJury3
    FROM (
        SELECT u.email, u.name, 
               ROW_NUMBER() OVER (ORDER BY u.UserID) AS rnk
        FROM `conferencesdb`.`userconference` uc
        JOIN `conferencesdb`.`user` u ON uc.UserID = u.UserID
        WHERE uc.TopicsID = p_TopicsID AND uc.RolID = 2
    ) AS jurors;

    -- Devolver los resultados
    SELECT 
        v_name2 AS ConferenceName, 
        v_name AS NameTopics, 
        v_emailAdmin AS EmailAdmin, 
        v_nameadmin AS NameAdmin, 
        v_emailuser AS EmailUser, 
        v_nameuser AS NameUser,
        v_emailJury1 AS EmailJury1, v_nameJury1 AS NameJury1,
        v_emailJury2 AS EmailJury2, v_nameJury2 AS NameJury2,
        v_emailJury3 AS EmailJury3, v_nameJury3 AS NameJury3;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_emails_by_conference` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_emails_by_conference`(
    IN p_conferenceID INT,
    IN p_userID INT
)
BEGIN
    DECLARE v_userID1 INT;
    DECLARE v_userID2 INT;
    DECLARE v_name VARCHAR(255);
     DECLARE v_nameadmin VARCHAR(255);
      DECLARE v_nameuser VARCHAR(255);
    DECLARE v_emailAdmin VARCHAR(255);
    DECLARE v_emailuser VARCHAR(255);

    -- Obtener el UserID y name de la conferencia
    SELECT UserID, name INTO v_userID1, v_name
    FROM `conferencesdb`.`conference`
    WHERE conferenceID = p_conferenceID
    LIMIT 1;

    -- Obtener el email del primer UserID
    SELECT email,name INTO v_emailAdmin,v_nameadmin 
    FROM `conferencesdb`.`user`
    WHERE UserID = v_userID1
    LIMIT 1;

    -- Obtener el email del segundo UserID (el pasado como parámetro)
    SELECT email,name INTO v_emailuser,v_nameuser
    FROM `conferencesdb`.`user`
    WHERE UserID = p_userID
    LIMIT 1;

    -- Devolver los resultados
    SELECT v_name AS ConferenceName, v_emailAdmin AS EmailAdmin,v_nameadmin AS NameAdmin, v_emailuser AS EmailUser,v_nameuser AS NameUser;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_evalutioncriteria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_evalutioncriteria`()
BEGIN
select criterionID,aspect,description from `conferencesdb`.`evalutioncriteria`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_get_Evalutionscale` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_Evalutionscale`()
BEGIN
select scaleID, scale , description from `conferencesdb`.`evalutionscale`;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_InsertEvaluationCriteriaConference` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_InsertEvaluationCriteriaConference`(
    IN p_CriterionID INT,
    IN p_ConferenceID INT,
    OUT p_Result INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Si ocurre un error, se establece el resultado en 0
        SET p_Result = 0;
        ROLLBACK;
    END;

    -- Inicia una transacción
    START TRANSACTION;

    -- Inserta el registro en la tabla
    INSERT INTO `conferencesdb`.`evaluationcriteriaconference` (regDate, criterionID, conferenceID)
    VALUES (NOW(), p_CriterionID, p_ConferenceID);

    -- Verifica si la inserción fue exitosa
    IF ROW_COUNT() > 0 THEN
        -- Si se insertó, establece el resultado en 1
        SET p_Result = 1;
        COMMIT;
    ELSE
        -- Si no se insertó, establece el resultado en 0
        SET p_Result = 0;
        ROLLBACK;
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_institution` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`edgardo`@`localhost` PROCEDURE `sp_insert_institution`(IN p_name varchar(100), IN p_website varchar(255),
                                                                IN p_contact_phone varchar(25),
                                                                IN p_description varchar(240), IN p_userID int,
                                                                IN p_image_url varchar(255),
                                                                IN p_image_name varchar(100), OUT p_institutionID int)
BEGIN
    INSERT INTO institution (
        name,
        website,
        contact_phone,
        description,
        userID,
        image_url,
        image_name,
        RegDate,
        DateModified
    ) VALUES (
        p_name,
        p_website,
        p_contact_phone,
        p_description,
        p_userID,
        p_image_url,
        p_image_name,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

    SET p_institutionID = LAST_INSERT_ID();
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
    IN p_TotalSpeakers INT,
    IN p_nameSpeaker VARCHAR(250)
)
BEGIN
    DECLARE v_TopicsID INT;

    -- Insertar en la tabla temp-conferencetopics
    INSERT INTO `temp-conferencetopics` (Name, Description, Location, StartHour, StartEnd, conferenceID, userID, TotalAttendees, TotalSpeakers)
    VALUES (p_Name, p_Description, p_Location, p_StartHour, p_StartEnd, p_conferenceID, p_userID, P_TotalAttendees, p_TotalSpeakers);

    -- Obtener el TopicsID de la inserción
    SET v_TopicsID = LAST_INSERT_ID();

    -- Verificar si p_nameSpeaker no es NULL antes de insertar en TempSpeakerConference
    IF p_nameSpeaker IS NOT NULL THEN
        -- Insertar en la tabla TempSpeakerConference con el TopicsID y nameSpeaker
        INSERT INTO `conferencesdb`.`tempspeakerconference` (TopicsID, NameSpeaker)
        VALUES (v_TopicsID, p_nameSpeaker);
    END IF;

    -- Opcional: Devolver el TopicsID si se desea
    SELECT v_TopicsID AS TopicsID;
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
        tct.TopicsID, 
        tct.Name, 
        tct.Description, 
        tct.Location, 
        tct.StartHour, 
        tct.StartEnd, 
        tct.conferenceID,
        tct.TotalAttendees,
        tct.TotalSpeakers,
        GROUP_CONCAT(tsc.NameSpeaker ORDER BY tsc.NameSpeaker SEPARATOR ', ') AS nameSpeaker
    FROM 
        `conferencetopics` tct
    LEFT JOIN 
        `conferencesdb`.`speakerconference` tsc ON tct.TopicsID = tsc.TopicsID
    WHERE 
        tct.conferenceID = p_conferenceID
    GROUP BY 
        tct.TopicsID;
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
        tct.TopicsID, 
        tct.Name, 
        tct.Description, 
        tct.Location, 
        tct.StartHour, 
        tct.StartEnd, 
        tct.conferenceID, 
         tct.TotalAttendees,
        tct.TotalSpeakers,
        GROUP_CONCAT(tsc.NameSpeaker ORDER BY tsc.NameSpeaker SEPARATOR ', ') AS nameSpeaker
    FROM 
        `conferencetopics` tct
    LEFT JOIN 
        `conferencesdb`.`speakerconference` tsc ON tct.TopicsID = tsc.TopicsID
    WHERE 
        tct.TopicsID = p_topicsID
    GROUP BY 
        tct.TopicsID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_ListTopicsByUserID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ListTopicsByUserID`(IN p_UserID INT)
BEGIN
    SELECT 
        ct.TopicsID, 
        ct.Name, 
        ct.Description, 
        ct.Location, 
        ct.StartHour, 
        ct.StartEnd, 
        ct.conferenceID,
		ct.TotalAttendees,
        ct.TotalSpeakers,
        uc.RolID,
        GROUP_CONCAT(tsc.NameSpeaker ORDER BY tsc.NameSpeaker SEPARATOR ', ') AS nameSpeaker
    FROM 
        conferencetopics ct
    JOIN 
        userconference uc 
    ON 
        ct.TopicsID = uc.TopicsID
    LEFT JOIN 
        `conferencesdb`.`speakerconference` tsc 
    ON 
        ct.TopicsID = tsc.TopicsID
    WHERE 
        uc.UserID = p_UserID
    GROUP BY 
        ct.TopicsID, 
        ct.Name, 
        ct.Description, 
        ct.Location, 
        ct.StartHour, 
        ct.StartEnd, 
        ct.conferenceID,
        uc.RolID;
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
    SELECT 
        tct.TopicsID, 
        tct.Name, 
        tct.Description, 
        tct.Location, 
        tct.StartHour, 
        tct.StartEnd, 
        tct.conferenceID, 
        tct.userID,
        tct.TotalAttendees,
        tct.TotalSpeakers,
        tsc.NameSpeaker
    FROM 
        `temp-conferencetopics` tct
    LEFT JOIN 
        `TempSpeakerConference` tsc ON tct.TopicsID = tsc.TopicsID
    WHERE 
        tct.conferenceID = p_conferenceID;
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
declare  p_UserConferenceID INT;

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
	
    
    select userConferenceID into p_UserConferenceID   from `conferencesdb`.`userconference` 
    where UserID=p_UserID and TopicsID=p_TopicsID; 
    
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_Move_Topics`(
    IN p_conferenceID INT,
    IN p_userID INT,
    OUT result INT
)
BEGIN
    DECLARE v_count INT;
    DECLARE v_newTopicsID INT;
    DECLARE v_oldTopicsID INT;
    DECLARE done INT DEFAULT 0;
    DECLARE cur CURSOR FOR
        SELECT TopicsID
        FROM `conferencesdb`.`temp-conferencetopics`
        WHERE conferenceID = p_conferenceID AND userID = p_userID;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Inicializar el valor de resultado en 0 (por defecto no exitoso)
    SET result = 0;

    -- Desactivar safe update mode
    SET SQL_SAFE_UPDATES = 0;

    -- Verificar si hay registros en temp-conferencetopics para el conferenceID dado
    SELECT COUNT(*) INTO v_count
    FROM `temp-conferencetopics`
    WHERE conferenceID = p_conferenceID AND userID = p_userID;

    IF v_count = 0 THEN
        -- No hay registros para el conferenceID proporcionado
        SET result = 0;
    ELSE
        -- Abrir el cursor para recorrer los TopicsID en temp-conferencetopics
        OPEN cur;
        read_loop: LOOP
            FETCH cur INTO v_oldTopicsID;
            IF done THEN
                LEAVE read_loop;
            END IF;

            -- Inserción en conferencetopics sin el TopicsID de temp-conferencetopics
            INSERT INTO conferencesdb.conferencetopics (
                Name, Description, Location, StartHour, StartEnd, conferenceID, RegDate, TotalAttendees, TotalSpeakers, CounterAttendees, CounterTotalSpeakers
            )
            SELECT
                Name, Description, Location, StartHour, StartEnd, conferenceID, NOW() AS RegDate, TotalAttendees, TotalSpeakers, 0, 0
            FROM
                `temp-conferencetopics`
            WHERE
                TopicsID = v_oldTopicsID;

            -- Obtener el nuevo TopicsID generado
            SET v_newTopicsID = LAST_INSERT_ID();

            -- Insertar el NameSpeaker correspondiente en speakerconference con el nuevo TopicsID
            INSERT INTO `conferencesdb`.`speakerconference` (TopicsID, NameSpeaker)
            SELECT
                v_newTopicsID, ts.NameSpeaker
            FROM
                `conferencesdb`.`tempspeakerconference` ts
            WHERE
                ts.TopicsID = v_oldTopicsID;

            -- Actualizar tempspeakerconference con el nuevo TopicsID
            UPDATE `conferencesdb`.`tempspeakerconference`
            SET TopicsID = v_newTopicsID
            WHERE TopicsID = v_oldTopicsID;

        END LOOP;
        CLOSE cur;

        -- Eliminar los datos de temp-conferencetopics después de la inserción
        DELETE FROM `temp-conferencetopics`
        WHERE conferenceID = p_conferenceID AND userID = p_userID;

        -- Si la inserción fue exitosa, actualizar el resultado a 1
        SET result = 1;
    END IF;

    -- Reactivar safe update mode
    SET SQL_SAFE_UPDATES = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_RegisterDocumentEvaluationCriteria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RegisterDocumentEvaluationCriteria`(
    IN p_evaCritConfID INT,
    IN p_scaleID INT,
    IN p_UserID INT,
    IN p_documentID INT,
    
    OUT result INT
)
BEGIN
    DECLARE v_RolID INT;
    DECLARE v_TopicsID INT;
    DECLARE v_RolName VARCHAR(50);
    
    
    select TopicsID INTO v_TopicsID  from `conferencesdb`.`document`  where documentID=p_documentID ;
    -- Obtener el RolID del usuario en la tabla userconference
    SELECT RolID INTO v_RolID 
    FROM conferencesdb.userconference 
    WHERE UserID = p_UserID AND TopicsID=v_TopicsID;
    
    -- Obtener el nombre del rol en la tabla roluserconference
    SELECT name INTO v_RolName 
    FROM conferencesdb.roluserconference 
    WHERE RolID = v_RolID;

    -- Validar si el rol del usuario es 'Jury'
    IF v_RolName = 'Jury' THEN
        -- Realizar la inserción en DocumentEvaluationCriteria
        INSERT INTO conferencesdb.DocumentEvaluationCriteria (evaCritConfID, scaleID, UserID, documentID)
        VALUES (p_evaCritConfID, p_scaleID, p_UserID, p_documentID);
        SET result =1;
    ELSE
        -- Devolver un mensaje de error si el rol no es 'Jury'
        
        SET result =0;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_RegisterDocumentVeredict` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RegisterDocumentVeredict`(
    IN p_documentID INT,
    IN p_veredictID INT,
    IN p_UserID INT,
    OUT result INT,
    OUT message VARCHAR(250),
    out calification INT 
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_existingCount INT DEFAULT 0;
    DECLARE v_RolID INT DEFAULT 0;
    DECLARE v_RolName VARCHAR(50) DEFAULT '';
    DECLARE v_TopicsID INT DEFAULT 0;
    DECLARE v_approvalCount INT DEFAULT 0;
	DECLARE v_userID1 int;
    DECLARE v_NameSpeaker VARCHAR(255);
    -- Obtener el TopicsID del documento
    SELECT TopicsID INTO v_TopicsID 
    FROM conferencesdb.document 
    WHERE documentID = p_documentID;

    -- Obtener el RolID del usuario en la tabla userconference
    SELECT RolID INTO v_RolID 
    FROM conferencesdb.userconference 
    WHERE UserID = p_UserID AND TopicsID = v_TopicsID;

    -- Obtener el nombre del rol en la tabla roluserconference
    SELECT name INTO v_RolName 
    FROM conferencesdb.roluserconference 
    WHERE RolID = v_RolID;

    -- Validar si el rol del usuario es 'Jury'
    IF v_RolName != 'Jury' THEN
        SET result = 0;
        SET message = 'El rol no es Jury, no se permite la inserción';
    ELSE
        -- Validar que no exista ya un registro con el mismo UserID y documentID
        SELECT COUNT(*) INTO v_existingCount
        FROM conferencesdb.documentveredict
        WHERE documentID = p_documentID AND UserID = p_UserID;

        IF v_existingCount > 0 THEN
            SET result = 0;
            SET message = 'Ya realizaste la revisión de este documento';
        ELSE
            -- Contar cuántos registros existen con el mismo documentID pero diferente UserID
            SELECT COUNT(*) INTO v_count
            FROM conferencesdb.documentveredict
            WHERE documentID = p_documentID AND UserID != p_UserID;

            -- Si ya existen 3 o más registros con diferente UserID, no permitir la inserción
            IF v_count >= 3 THEN
                SET result = 0;
                SET message = 'No se permite realizar más inserciones';
            ELSE
                -- Realizar la inserción en documentveredict
                INSERT INTO conferencesdb.documentveredict (RagDate, documentID, veredictID, UserID)
                VALUES (NOW(), p_documentID, p_veredictID, p_UserID);

                -- Actualizar la tabla document si después de la inserción existen 3 registros con diferente UserID
                SET v_count = v_count + 1;
                IF v_count = 3 THEN
                    UPDATE conferencesdb.document
                    SET review = 1
                    WHERE documentID = p_documentID;
                    
                      -- Contar los veredictos "Aprobado" para este documento
                SELECT COUNT(*) INTO v_approvalCount
                FROM conferencesdb.documentveredict dv
                JOIN conferencesdb.veredict v ON dv.veredictID = v.veredictID
                WHERE dv.documentID = p_documentID AND v.veredict = 'Aprobado';

                -- Si hay 2 o 3 veredictos iguales a "Aprobado", actualizar la calificación del documento
                IF v_approvalCount >= 2 THEN
                    UPDATE conferencesdb.document
                    SET qualification = 1
                    WHERE documentID = p_documentID;
                   SET calification = 1;
                   -- asinar usuaerio como ponente
                   
					SELECT UserID INTO v_userID1
					FROM `conferencesdb`.`document`
					WHERE documentID = p_documentID
					LIMIT 1;
                    sELECT CONCAT(name, ' ', lastname) INTO v_NameSpeaker
					FROM `conferencesdb`.`user`
					WHERE UserID=v_userID1
					LIMIT 1;  
                    INSERT INTO `conferencesdb`.`speakerconference` (TopicsID, NameSpeaker)
                    values (v_TopicsID,v_NameSpeaker);
					
                    ELSE
                        SET calification = 0;
                    
                END IF;

                END IF;

              

                SET result = 1;
                SET message = 'Inserción exitosa';
            END IF;
        END IF;
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
    IN p_institucionID INT,
    -- IN p_nameInstitution VARCHAR(100),
    -- IN p_websiteInstitution VARCHAR(100),
   -- IN p_contactPhoneInstitution VARCHAR(25),
    IN p_nameConference VARCHAR(100),
    IN p_typeConference VARCHAR(100),
    IN p_description TEXT,
    IN p_beggingDate DATETIME,
    IN p_finishDate DATETIME,
    IN p_areaID INT,
    IN p_documentAttempt INT,
    IN p_Location varchar(250),
    in p_urlconference varchar(250),
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
       -- INSERT INTO institution(name, website, contact_phone, regDate)
      --  VALUES(p_nameInstitution, p_websiteInstitution, p_contactPhoneInstitution, NOW());
     --   SET v_institucionID = LAST_INSERT_ID();

        -- Inserta en la tabla `conference` y obtiene el `id`
        INSERT INTO conference (name, type, description, RegDate, beggingDate, finishDate, documentAttempt, institutionID, Status,UserID,rolID,Location,urlconference)
        VALUES (p_nameConference, p_typeConference, p_description, NOW(), p_beggingDate, p_finishDate, p_documentAttempt, p_institucionID, 1,p_UserID,p_RollID,IF(p_Location IS NOT NULL, p_Location, NULL),IF(p_urlconference IS NOT NULL, p_urlconference, NULL));
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
/*!50003 DROP PROCEDURE IF EXISTS `sp_UpdateUserConferenceRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_UpdateUserConferenceRole`(
    IN p_TopicsID INT,
    IN p_UserID INT,
    IN p_NewRolID INT
)
BEGIN
    DECLARE v_UpdateCount INT;

    -- Contar cuántas veces se ha actualizado el RolID para el TopicsID específico
    SELECT COUNT(*)
    INTO v_UpdateCount
    FROM `conferencesdb`.`userconference`
    WHERE TopicsID = p_TopicsID AND RolID != p_NewRolID;

    -- Verificar si las actualizaciones no han superado el límite de 3
    IF v_UpdateCount < 3 THEN
        -- Realizar la actualización
        UPDATE `conferencesdb`.`userconference`
        SET RolID = p_NewRolID
        WHERE TopicsID = p_TopicsID AND UserID = p_UserID;
        
        -- Devolver un mensaje de éxito
        SELECT 'Actualización exitosa' AS message;
    ELSE
        -- Devolver un mensaje de error si se supera el límite de actualizaciones
        SELECT 'Límite de jurado alcanzado' AS message;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_conference_status_to_inactive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_conference_status_to_inactive`(
    IN p_conferenceID INT,
    OUT p_result INT
)
BEGIN
    DECLARE v_rows_affected INT;

    -- Inicializar el resultado
    SET p_result = 0;

    -- Actualizar el Status a 0
    UPDATE `conferencesdb`.`conference`
    SET Status = 0
    WHERE conferenceID = p_conferenceID 
    AND Status = 1;

    -- Obtener el número de filas afectadas
    SELECT ROW_COUNT() INTO v_rows_affected;

    -- Si se actualizaron filas, setear el resultado a 1
    IF v_rows_affected > 0 THEN
        SET p_result = 1;
    END IF;
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
    IN p_nameSpeaker VARCHAR(250),
    OUT result INT
)
BEGIN
    DECLARE v_exists INT DEFAULT 0;
    DECLARE v_existst INT DEFAULT 0;

    -- Verificar si el registro en temp-conferencetopics existe
    SELECT COUNT(*)
    INTO v_exists
    FROM `temp-conferencetopics`
    WHERE TopicsID = p_TopicsID;

    IF v_exists = 1 THEN
        -- Verificar si el registro en tempspeakerconference existe
        SELECT COUNT(*)
        INTO v_existst
        FROM `tempspeakerconference`
        WHERE TopicsID = p_TopicsID;
        
        IF v_existst > 0 THEN
            -- Eliminar registros si p_nameSpeaker es NULL
            IF p_nameSpeaker IS NULL THEN
                DELETE FROM `tempspeakerconference`
                WHERE TopicsID = p_TopicsID;
            ELSE
                -- Actualizar registro en tempspeakerconference
                UPDATE `tempspeakerconference`
                SET NameSpeaker = p_nameSpeaker
                WHERE TopicsID = p_TopicsID;
            END IF;
        ELSE
            -- Insertar nuevo registro en tempspeakerconference si p_nameSpeaker no es NULL
            IF p_nameSpeaker IS NOT NULL THEN
                INSERT INTO `tempspeakerconference` (TopicsID, NameSpeaker)
                VALUES (p_TopicsID, p_nameSpeaker);
            END IF;
        END IF;

        -- Actualizar el registro en temp-conferencetopics
        UPDATE `temp-conferencetopics`
        SET Name = p_Name,
            Description = p_Description,
            Location = p_Location,
            StartHour = p_StartHour,
            StartEnd = p_StartEnd,
            conferenceID = p_conferenceID,
            userID = p_userID,
            TotalAttendees = p_TotalAttendees,
            TotalSpeakers = p_TotalSpeakers 
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
/*!50003 DROP PROCEDURE IF EXISTS `UpdateUserConferenceRole` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateUserConferenceRole`(
    IN p_TopicsID INT,
    IN p_UserID INT,
    IN p_NewRolID INT,
	OUT message VARCHAR(255),
    OUT result INT
)
BEGIN
    DECLARE v_RoleCount INT;

    -- Contar cuántos registros ya tienen RolID = 2 para el TopicsID específico
    SELECT COUNT(*)
    INTO v_RoleCount
    FROM `conferencesdb`.`userconference`
    WHERE TopicsID = p_TopicsID AND RolID = 2;

    -- Verificar si el número de registros con RolID = 2 es menor que 3
    IF v_RoleCount < 3 THEN
        -- Realizar la actualización
        UPDATE `conferencesdb`.`userconference`
        SET RolID = p_NewRolID
        WHERE TopicsID = p_TopicsID AND UserID = p_UserID;
        
        -- Devolver un mensaje de éxito
         SET message = 'Actualización exitosa' ;
         SET result=1;
    ELSE
        -- Devolver un mensaje de error si ya hay 3 registros con RolID = 2
         SET message =  'Ya alcanzo el limite de jurados ' ;
         SET result=0;
    END IF;
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

-- Dump completed on 2024-08-30  0:34:31
