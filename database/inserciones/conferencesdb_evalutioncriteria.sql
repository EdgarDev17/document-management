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
-- Dumping data for table `evalutioncriteria`
--

LOCK TABLES `evalutioncriteria` WRITE;
/*!40000 ALTER TABLE `evalutioncriteria` DISABLE KEYS */;
INSERT INTO `evalutioncriteria` VALUES (1,'Titulo','Correspondencia del Titulo con el contenido del documento,su sintaxis debe ser clara,explicativa y concisa',NULL,'2024-08-14 22:51:09'),(2,'Resumen','Dar cuenta de manera breve, el problema, los metodos utilizados y conclusiones',NULL,'2024-08-14 22:51:09'),(3,'Originalidad','Debe ser inedito y producto de investigacion(Argumentos teoricos y metodologicos) ',NULL,'2024-08-14 22:51:09'),(4,'Organización Interna ','Debe estar presentado con un nivel de coherencia, facilidad de lectura, fomento de la discusión, uso correcto del lenguaje y enlace adecuados entre párrafos y secciones',NULL,'2024-08-14 22:51:09'),(5,'Introducción','Narrar el planteamiento del problema, propósito de la investigación, consideraciones teóricas y objetivos de investigación ',NULL,'2024-08-14 22:51:09'),(6,'Método','Valoración de la estructura y coherencia de la metodología empleada.',NULL,'2024-08-14 22:51:09'),(7,'Resultados','Presentación concreta, adecuada y coherente de los resultados',NULL,'2024-08-14 22:51:09'),(8,'Tablas y gráficos','Análisis de los datos a través de tablas y gráficos evitando la redundancia innecesaria',NULL,'2024-08-14 22:51:09'),(9,'Conclusiones','Responder los objetivos de la investigación, no deben repetir los resultados, verificando el impacto de los planteamientos realizados dentro de los términos de su contribución',NULL,'2024-08-14 22:51:09'),(10,'Referencias Bibliográficas','Correspondencia con las referencias citadas en el texto',NULL,'2024-08-14 22:51:09');
/*!40000 ALTER TABLE `evalutioncriteria` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-18 22:01:19
