-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bookmon
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `bicho`
--

DROP TABLE IF EXISTS `bicho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bicho` (
  `idbicho` int NOT NULL AUTO_INCREMENT,
  `iduser` int NOT NULL,
  `level` int NOT NULL,
  `points` int NOT NULL,
  `level_points` int NOT NULL,
  PRIMARY KEY (`idbicho`),
  UNIQUE KEY `idbicho_UNIQUE` (`idbicho`),
  KEY `iduser_idx` (`iduser`),
  CONSTRAINT `fk_bicho_iduser` FOREIGN KEY (`iduser`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bicho`
--

LOCK TABLES `bicho` WRITE;
/*!40000 ALTER TABLE `bicho` DISABLE KEYS */;
INSERT INTO `bicho` VALUES (1,1,1,25,0),(3,3,2,0,25),(4,4,1,0,0),(5,5,2,30,35),(6,6,1,25,0),(7,7,3,0,0),(8,8,2,0,40),(9,9,1,0,0),(10,10,1,0,0),(11,11,1,0,0),(12,12,1,0,0),(13,13,2,0,40),(14,14,2,0,10);
/*!40000 ALTER TABLE `bicho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conquistas`
--

DROP TABLE IF EXISTS `conquistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conquistas` (
  `idconquistas` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idconquistas`),
  UNIQUE KEY `idconquistas_UNIQUE` (`idconquistas`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conquistas`
--

LOCK TABLES `conquistas` WRITE;
/*!40000 ALTER TABLE `conquistas` DISABLE KEYS */;
INSERT INTO `conquistas` VALUES (1,'FantQUACKstico!','Registrou a leitura de 50 páginas'),(2,'Amigo do Quackito','Cuidou do Quackito e passou para o nível 3'),(3,'DEZmais','Registrou a leitura de DEZ livros!'),(5,'BOOKfluencer','Fez 5 posts');
/*!40000 ALTER TABLE `conquistas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `conquistas_AFTER_INSERT` AFTER INSERT ON `conquistas` FOR EACH ROW BEGIN
    INSERT INTO user_conq(iduser, idconquista, `status`)
	SELECT us.idusers, NEW.idconquistas, 0
	FROM users us;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `conquistas_BEFORE_DELETE` BEFORE DELETE ON `conquistas` FOR EACH ROW BEGIN
	DELETE FROM user_conq WHERE idconquista = OLD.idconquistas;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `leituras`
--

DROP TABLE IF EXISTS `leituras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leituras` (
  `idleituras` int NOT NULL AUTO_INCREMENT,
  `iduser` int NOT NULL,
  `book` varchar(100) NOT NULL,
  `pages` int NOT NULL,
  PRIMARY KEY (`idleituras`),
  UNIQUE KEY `idleituras_UNIQUE` (`idleituras`),
  KEY `fk_leituras_iduser_idx` (`iduser`),
  CONSTRAINT `fk_leituras_iduser` FOREIGN KEY (`iduser`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leituras`
--

LOCK TABLES `leituras` WRITE;
/*!40000 ALTER TABLE `leituras` DISABLE KEYS */;
INSERT INTO `leituras` VALUES (1,1,'Harry Potter',11),(2,4,'Harry Potter',500),(3,1,'Animais Fantásticos e Onde Habitam',61),(4,3,'Orgulho e Preconceito',500),(5,3,'A Seleção',105),(6,4,'Trono de Vidro',670),(7,4,'Entendendo algoritmos',46),(8,1,'Entendendo algoritmos',3),(9,3,'Entendendo algoritmos',22),(10,1,'Dan Dan Dan',832),(11,1,'Livro do fim de semana',100),(12,5,'A menina que roubava livros',365),(13,5,'Entendendo algoritmos',566),(14,5,'Cálculo 1',722),(15,5,'Cálculo 2',900),(16,5,'Cálculo 3',11),(17,1,'Cálculo 1',1),(18,6,'Contos coreanos',78),(19,6,'Contos coreanos volume 2',126),(20,6,'Entendendo algoritmos',90),(21,6,'Entendendo algoritmos',3),(22,6,'Cálculo 1',1),(23,3,'Contos coreanos',11),(24,3,'Contos coreanos volume 2',101),(25,5,'The Black Cat',90),(26,8,'miss peregrine',140),(27,13,'senhor dos aneis',450),(28,14,'Meu pai é muito legal',28),(29,14,'Queria ser um bom pai um dia',1000);
/*!40000 ALTER TABLE `leituras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metas`
--

DROP TABLE IF EXISTS `metas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metas` (
  `idmetas` int NOT NULL AUTO_INCREMENT,
  `description` varchar(145) NOT NULL,
  PRIMARY KEY (`idmetas`),
  UNIQUE KEY `idmetas_UNIQUE` (`idmetas`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metas`
--

LOCK TABLES `metas` WRITE;
/*!40000 ALTER TABLE `metas` DISABLE KEYS */;
INSERT INTO `metas` VALUES (1,'Ler 10 páginas'),(2,'Fazer um post'),(3,'Alimentar o Quackito com uma carne'),(5,'Registrar uma nova leitura');
/*!40000 ALTER TABLE `metas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `metas_AFTER_INSERT` AFTER INSERT ON `metas` FOR EACH ROW BEGIN
	INSERT INTO user_metas(iduser, idmeta, `status`)
	SELECT us.idusers, NEW.idmetas, 0
	FROM users us;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `metas_BEFORE_DELETE` BEFORE DELETE ON `metas` FOR EACH ROW BEGIN
	DELETE FROM user_metas WHERE idmeta = OLD.idmetas;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `idposts` int NOT NULL AUTO_INCREMENT,
  `iduser` int NOT NULL,
  `datetime` datetime NOT NULL,
  `content` varchar(280) NOT NULL,
  PRIMARY KEY (`idposts`),
  UNIQUE KEY `idposts_UNIQUE` (`idposts`),
  KEY `idusers_idx` (`iduser`),
  CONSTRAINT `fk_posts_iduser` FOREIGN KEY (`iduser`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'2025-05-19 18:26:20','galera estou adorando ler'),(3,4,'2025-05-19 22:30:19','Eai galera? Acabei de criar minha conta aqui e já estou amando! Dei o nome de Quackito pro meu bookmon!'),(4,4,'2025-05-19 22:30:19','To de ressaca literária, preciso URGENTE de indicações de leitura amigos!!!!'),(5,4,'2025-05-19 22:30:19','Já assisti Harry Potter mas agora que li o livro vi que é outra coisa! Sensacional ver todos os detalhes, me senti dentro da história :)'),(6,1,'2025-05-19 22:32:23','Quero logo desbloquear todas as conquistas. E se eu lesse 50 páginas por dia?'),(7,1,'2025-05-19 22:32:23','Estou mais acostumado a ler mangás, mas até que livros são legais também...'),(8,1,'2025-05-19 22:32:23','Alguém pode me dar uma opinião sobre literatura chinesa?'),(9,3,'2025-05-19 22:34:52','Acabei de instalar o Bookmon! Alguém pode me recomendar uma leitura?'),(10,3,'2025-05-19 22:34:52','Esse bichinho é um amor! Fico com mais vontade de ler para dar comidinhas pra ele <3'),(11,3,'2025-05-19 22:34:52','As recomendações da @aflavinha são boas!!! recomendo!!!'),(12,1,'2025-05-20 10:27:04','@aflavinha você tem alguma recomendação de literatura chinesa?'),(13,4,'2025-05-20 10:29:18','infelizmente não conheço muito @f_tchay_na :c'),(14,1,'2025-05-25 19:25:32','O livro de algoritmos é realmente bom? Vale a pena? '),(15,7,'2025-05-25 20:24:56','acabei de criar uma conta no Bookmon! Já estou no nível 3  :D'),(16,5,'2025-05-28 18:46:35','Vou dar um docinho para o meu quackito!'),(17,3,'2025-06-02 20:16:36','Saudades de ler um romance brasileiro'),(18,3,'2025-06-02 20:20:25','Eu não consigo ler livros de terror... Mas curto muito um suspense'),(19,5,'2025-06-02 20:58:11','Também não gosto de terror @cyj0913 haha'),(20,5,'2025-06-04 17:18:48','estou lendo miss peregrine mt legal viu'),(21,8,'2025-06-04 17:19:51','para de mentir michele eu q to lendo'),(22,13,'2025-06-04 18:24:22','a micheli t me entrevistando guys'),(23,14,'2025-06-04 21:20:14','Ainda nao li nada');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_conq`
--

DROP TABLE IF EXISTS `user_conq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_conq` (
  `iduser_conq` int NOT NULL AUTO_INCREMENT,
  `iduser` int NOT NULL,
  `idconquista` int NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`iduser_conq`),
  UNIQUE KEY `iduser_conq_UNIQUE` (`iduser_conq`),
  KEY `idconquista_idx` (`idconquista`),
  KEY `iduser_idx` (`iduser`),
  CONSTRAINT `fk_userconq_idconquista` FOREIGN KEY (`idconquista`) REFERENCES `conquistas` (`idconquistas`),
  CONSTRAINT `fk_userconq_iduser` FOREIGN KEY (`iduser`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_conq`
--

LOCK TABLES `user_conq` WRITE;
/*!40000 ALTER TABLE `user_conq` DISABLE KEYS */;
INSERT INTO `user_conq` VALUES (1,1,1,0),(2,1,2,0),(3,1,3,0),(8,3,1,0),(9,3,2,0),(10,3,3,0),(11,4,1,0),(12,4,2,0),(13,4,3,0),(14,1,5,0),(15,3,5,0),(16,4,5,0),(17,5,1,0),(18,5,2,0),(19,5,3,0),(20,5,5,0),(24,6,1,0),(25,6,2,0),(26,6,3,0),(27,6,5,0),(31,7,1,0),(32,7,2,0),(33,7,3,0),(34,7,5,0),(35,8,1,0),(36,8,2,0),(37,8,3,0),(38,8,5,0),(42,9,1,0),(43,9,2,0),(44,9,3,0),(45,9,5,0),(49,10,1,0),(50,10,2,0),(51,10,3,0),(52,10,5,0),(56,11,1,0),(57,11,2,0),(58,11,3,0),(59,11,5,0),(63,12,1,0),(64,12,2,0),(65,12,3,0),(66,12,5,0),(70,13,1,0),(71,13,2,0),(72,13,3,0),(73,13,5,0),(77,14,1,0),(78,14,2,0),(79,14,3,0),(80,14,5,0);
/*!40000 ALTER TABLE `user_conq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_metas`
--

DROP TABLE IF EXISTS `user_metas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_metas` (
  `iduser_metas` int NOT NULL AUTO_INCREMENT,
  `iduser` int NOT NULL,
  `idmeta` int NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`iduser_metas`),
  UNIQUE KEY `iduser_metas_UNIQUE` (`iduser_metas`),
  KEY `fk_usermetas_iduser_idx` (`iduser`),
  KEY `fk_usermetas_idmeta_idx` (`idmeta`),
  CONSTRAINT `fk_usermetas_idmeta` FOREIGN KEY (`idmeta`) REFERENCES `metas` (`idmetas`),
  CONSTRAINT `fk_usermetas_iduser` FOREIGN KEY (`iduser`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_metas`
--

LOCK TABLES `user_metas` WRITE;
/*!40000 ALTER TABLE `user_metas` DISABLE KEYS */;
INSERT INTO `user_metas` VALUES (1,1,1,0),(2,1,2,0),(3,1,3,0),(7,3,1,0),(8,3,2,1),(9,3,3,0),(13,4,1,0),(14,4,2,0),(15,4,3,0),(16,1,5,1),(17,3,5,1),(18,4,5,0),(19,5,1,1),(20,5,2,1),(21,5,3,1),(22,5,5,1),(26,6,1,0),(27,6,2,0),(28,6,3,0),(29,6,5,1),(33,7,1,0),(34,7,2,0),(35,7,3,0),(36,7,5,0),(37,8,1,1),(38,8,2,1),(39,8,3,1),(40,8,5,1),(44,9,1,0),(45,9,2,0),(46,9,3,0),(47,9,5,0),(51,10,1,0),(52,10,2,0),(53,10,3,0),(54,10,5,0),(58,11,1,0),(59,11,2,0),(60,11,3,0),(61,11,5,0),(65,12,1,0),(66,12,2,0),(67,12,3,0),(68,12,5,0),(72,13,1,1),(73,13,2,1),(74,13,3,1),(75,13,5,1),(79,14,1,0),(80,14,2,1),(81,14,3,1),(82,14,5,1);
/*!40000 ALTER TABLE `user_metas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `idusers_UNIQUE` (`idusers`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'f_tchay_na','phioesushi'),(3,'cyj0913','yejin0913'),(4,'aflavinha','bibliotequinho'),(5,'mi','pucpr1234'),(6,'min_xun','ilovejyp'),(7,'isinha','karamell'),(8,'fapinter','2705'),(9,'crys','1234'),(10,'laurinha','omg'),(11,'logan','7777'),(12,'pyj','jyp'),(13,'simini','112233445566778899'),(14,'User','Pass');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `users_AFTER_INSERT` AFTER INSERT ON `users` FOR EACH ROW BEGIN
	INSERT INTO bicho (iduser, `level`, points, level_points) VALUES (NEW.idusers, 1, 0, 0);
    
    INSERT INTO user_conq(iduser, idconquista, `status`)
	SELECT NEW.idusers, conq.idconquistas, 0
	FROM conquistas conq;
    
    INSERT INTO user_metas(iduser, idmeta, `status`)
    SELECT NEW.idusers, met.idmetas, 0
    FROM metas met;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `users_BEFORE_DELETE` BEFORE DELETE ON `users` FOR EACH ROW BEGIN
	DELETE FROM bicho WHERE iduser = OLD.idusers;
	DELETE FROM user_conq WHERE iduser = OLD.idusers;
	DELETE FROM user_metas WHERE iduser = OLD.idusers;
	DELETE FROM leituras WHERE iduser = OLD.idusers;
	DELETE FROM posts WHERE iduser = OLD.idusers;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'bookmon'
--

--
-- Dumping routines for database 'bookmon'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-04 23:18:57
