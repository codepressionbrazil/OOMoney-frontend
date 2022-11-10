-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: db_oomoney
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `classificacoes`
--

DROP TABLE IF EXISTS `classificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classificacoes` (
  `id_classificacao` bigint NOT NULL,
  `nome_classificao` varchar(255) NOT NULL,
  PRIMARY KEY (`id_classificacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classificacoes`
--

LOCK TABLES `classificacoes` WRITE;
/*!40000 ALTER TABLE `classificacoes` DISABLE KEYS */;
INSERT INTO `classificacoes` VALUES (1,'Casa'),(2,'Lazer'),(3,'Mercado');
/*!40000 ALTER TABLE `classificacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (6);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoas`
--

DROP TABLE IF EXISTS `pessoas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoas` (
  `cpf` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `usuario` varchar(255) NOT NULL,
  PRIMARY KEY (`cpf`),
  UNIQUE KEY `UK_ouqc5requard3nhnb6u3wvksm` (`email`),
  UNIQUE KEY `UK_1hyqm1lnm2mu33nk2q0nci39w` (`telefone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoas`
--

LOCK TABLES `pessoas` WRITE;
/*!40000 ALTER TABLE `pessoas` DISABLE KEYS */;
INSERT INTO `pessoas` VALUES ('10877647933','rochaf@gmail.com','Gabriel Rocha','teste','47991248900','gabrielrocha');
/*!40000 ALTER TABLE `pessoas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacoes`
--

DROP TABLE IF EXISTS `transacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacoes` (
  `id` int NOT NULL,
  `data_hora` datetime(6) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `tipo_transacao` varchar(255) NOT NULL,
  `valor_transacao` double NOT NULL,
  `id_classificacao` bigint DEFAULT NULL,
  `pessoa_cpf` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjh4jjo3jytj192j196ymkaav8` (`id_classificacao`),
  KEY `FKmpdk84eclrgrj5uejvdswbkv5` (`pessoa_cpf`),
  CONSTRAINT `FKjh4jjo3jytj192j196ymkaav8` FOREIGN KEY (`id_classificacao`) REFERENCES `classificacoes` (`id_classificacao`),
  CONSTRAINT `FKmpdk84eclrgrj5uejvdswbkv5` FOREIGN KEY (`pessoa_cpf`) REFERENCES `pessoas` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacoes`
--

LOCK TABLES `transacoes` WRITE;
/*!40000 ALTER TABLE `transacoes` DISABLE KEYS */;
INSERT INTO `transacoes` VALUES (5,'2022-11-10 06:17:41.000000','Batata','SAIDA',12,3,'10877647933');
/*!40000 ALTER TABLE `transacoes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-10 10:56:45
