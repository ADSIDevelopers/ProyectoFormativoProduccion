-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: produccion
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bodega`
--

DROP TABLE IF EXISTS `bodega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bodega` (
  `id_bodega` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fk_inventario` int(11) DEFAULT NULL,
  `fk_produccion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_bodega`),
  KEY `bodega_inventario_idx` (`fk_inventario`),
  KEY `bodega_produccion_idx` (`fk_produccion`),
  CONSTRAINT `bodega_inventario` FOREIGN KEY (`fk_inventario`) REFERENCES `inventario` (`id_inventario`),
  CONSTRAINT `bodega_produccion` FOREIGN KEY (`fk_produccion`) REFERENCES `produccion` (`Id_produccion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bodega`
--

LOCK TABLES `bodega` WRITE;
/*!40000 ALTER TABLE `bodega` DISABLE KEYS */;
INSERT INTO `bodega` VALUES (4,'2022-04-25 00:00:00',20,9,6),(5,'2022-04-25 00:00:00',20,9,6);
/*!40000 ALTER TABLE `bodega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cargo` (
  `idcargo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cargo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcargo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
INSERT INTO `cargo` VALUES (1,'Aprendiz'),(2,'Instructor'),(3,'Administrativos'),(4,'externo'),(5,'auxiliares');
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle`
--

DROP TABLE IF EXISTS `detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalle` (
  `id_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `Estado` enum('Entregado','No Entregado','Anulado') DEFAULT NULL,
  `Persona` bigint(20) DEFAULT NULL,
  `fk_Id_movimiento` int(11) NOT NULL,
  `fk_id_inventario` int(11) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `tiene_1` (`fk_Id_movimiento`),
  KEY `tiene_2` (`fk_id_inventario`),
  CONSTRAINT `tiene_1` FOREIGN KEY (`fk_Id_movimiento`) REFERENCES `movimientos` (`Id_movimiento`),
  CONSTRAINT `tiene_2` FOREIGN KEY (`fk_id_inventario`) REFERENCES `inventario` (`id_inventario`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle`
--

LOCK TABLES `detalle` WRITE;
/*!40000 ALTER TABLE `detalle` DISABLE KEYS */;
INSERT INTO `detalle` VALUES (2,1,10000.00,'No Entregado',1007163342,6,5),(22,1,1000.00,'No Entregado',96361787,7,5),(45,1,10000.00,'No Entregado',96361787,15,14),(51,2,10000.00,'No Entregado',96361787,15,8),(54,1,10000.00,'No Entregado',1004442967,14,14),(55,1,10000.00,'No Entregado',1006947348,14,14),(56,1,10000.00,'No Entregado',1116912148,16,14);
/*!40000 ALTER TABLE `detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL AUTO_INCREMENT,
  `stock` int(11) NOT NULL,
  `fk_codigo_pdto` int(11) NOT NULL,
  `fk_id_punto_vent` int(11) NOT NULL,
  PRIMARY KEY (`id_inventario`),
  UNIQUE KEY `unique_pv_pto` (`fk_id_punto_vent`,`fk_codigo_pdto`),
  KEY `tiene_3` (`fk_id_punto_vent`),
  KEY `tiene_4` (`fk_codigo_pdto`),
  CONSTRAINT `tiene_3` FOREIGN KEY (`fk_id_punto_vent`) REFERENCES `punto_venta` (`Id_punto_vent`),
  CONSTRAINT `tiene_4` FOREIGN KEY (`fk_codigo_pdto`) REFERENCES `productos` (`Codigo_pdto`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,50,1,4),(2,50,2,4),(3,50,3,4),(4,50,4,3),(5,50,5,4),(6,50,6,1),(7,12,11,2),(8,32,9,4),(9,40,1,7),(10,0,6,6),(11,0,5,6),(12,0,6,2),(13,0,6,8),(14,0,7,8);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `lista_produccion_up`
--

DROP TABLE IF EXISTS `lista_produccion_up`;
/*!50001 DROP VIEW IF EXISTS `lista_produccion_up`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `lista_produccion_up` AS SELECT 
 1 AS `Id_produccion`,
 1 AS `fecha`,
 1 AS `Codigo_pdto`,
 1 AS `producto`,
 1 AS `Estado`,
 1 AS `codigo_up`,
 1 AS `nomb_up`,
 1 AS `Producido`,
 1 AS `Distribuido`,
 1 AS `Disponible`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `lista_productos`
--

DROP TABLE IF EXISTS `lista_productos`;
/*!50001 DROP VIEW IF EXISTS `lista_productos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `lista_productos` AS SELECT 
 1 AS `Id_punto_vent`,
 1 AS `Nombre`,
 1 AS `id_inventario`,
 1 AS `Producto`,
 1 AS `descripcion`,
 1 AS `imagen`,
 1 AS `reserva`,
 1 AS `estado`,
 1 AS `maxreserva`,
 1 AS `tipo`,
 1 AS `stock`,
 1 AS `codigo_up`,
 1 AS `nomb_up`,
 1 AS `aprendiz`,
 1 AS `instructor`,
 1 AS `administrativo`,
 1 AS `externo`,
 1 AS `auxiliar`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `movimientos`
--

DROP TABLE IF EXISTS `movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movimientos` (
  `Id_movimiento` int(11) NOT NULL AUTO_INCREMENT,
  `Estado` enum('Reservado','Facturado','Anulado') DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `fk_persona` bigint(20) NOT NULL,
  `tipo` enum('Grupal','Individual') DEFAULT NULL,
  PRIMARY KEY (`Id_movimiento`),
  KEY `comprar` (`fk_persona`),
  CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`fk_persona`) REFERENCES `personas` (`identificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos`
--

LOCK TABLES `movimientos` WRITE;
/*!40000 ALTER TABLE `movimientos` DISABLE KEYS */;
INSERT INTO `movimientos` VALUES (1,'Reservado','2022-04-01',1006947348,'Individual'),(2,'Reservado','2022-04-01',1004419254,'Individual'),(3,'Reservado','2022-04-01',1004419254,'Individual'),(4,'Reservado','2022-04-01',1007163272,'Individual'),(6,'Reservado','2022-04-01',1083864069,'Individual'),(7,'Facturado','2022-05-03',96361787,'Individual'),(14,'Facturado','2022-05-04',1007163342,'Grupal'),(15,'Reservado','2022-05-04',96361787,'Individual'),(16,'Reservado','2022-05-04',1007163342,'Grupal');
/*!40000 ALTER TABLE `movimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personas`
--

DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personas` (
  `identificacion` bigint(20) NOT NULL,
  `Nombres` varchar(80) NOT NULL,
  `Correo` varchar(30) DEFAULT NULL,
  `Login` varchar(20) NOT NULL,
  `Password` varchar(15) NOT NULL,
  `Direccion` varchar(40) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Cargo` int(11) DEFAULT NULL,
  `Rol` enum('Invitado','Vocero','Lider UP','Punto Venta',' Admin','Aprendiz') DEFAULT NULL,
  `Ficha` int(11) DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`identificacion`),
  KEY `persona_cargo_idx` (`Cargo`),
  CONSTRAINT `persona_cargo` FOREIGN KEY (`Cargo`) REFERENCES `cargo` (`idcargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personas`
--

LOCK TABLES `personas` WRITE;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` VALUES (96361787,'Wilson Martinez',NULL,'96361787','96361787',NULL,NULL,2,' Admin',NULL,1),(1004419254,'Jhon Mario',NULL,'1004419254','1004419254',NULL,NULL,1,' Admin',2252407,1),(1004442967,'Francisco Plazas',NULL,'1004442967','1004442967','casa',NULL,1,' Admin',2252407,1),(1006524359,'Andrea Figueroa',NULL,'1006524359','1006524359',NULL,'3143841408',1,' Admin',2252407,1),(1006947348,'Edinson','krt847@gmail.com','1006947348','1006947348','1234567890','3102833525',1,' Admin',2252407,1),(1007163272,'Karen','kdortega14@gmail.com','1007163272','1007163272','pitalito','3212681728',1,' Admin',2252407,1),(1007163342,'Evelin Manuela Bermeo Calderon','evelinbermeo05@gmail.com','1007163342','1007163342',NULL,'3167390108',1,'Vocero',2252407,1),(1083864069,'Yeinery Daniela Machado Sotelo','danielasoteloms1211@gmail.com','1083864069','1083864069',NULL,'3144184632',1,' Admin',2252407,1),(1116912148,'Alejandro','cubillos@gmail.com','1116912148','12345678','Mi casa','313',3,' Admin',2252407,1);
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precios`
--

DROP TABLE IF EXISTS `precios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `precios` (
  `id_precio` int(11) NOT NULL AUTO_INCREMENT,
  `fk_cargo` int(11) DEFAULT NULL,
  `fk_producto` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_precio`),
  UNIQUE KEY `unique_precios` (`fk_producto`,`fk_cargo`),
  KEY `precio_cargo_idx` (`fk_cargo`),
  KEY `precio_prodcuto_idx` (`fk_producto`),
  CONSTRAINT `precio_cargo` FOREIGN KEY (`fk_cargo`) REFERENCES `cargo` (`idcargo`),
  CONSTRAINT `precio_prodcuto` FOREIGN KEY (`fk_producto`) REFERENCES `productos` (`Codigo_pdto`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precios`
--

LOCK TABLES `precios` WRITE;
/*!40000 ALTER TABLE `precios` DISABLE KEYS */;
INSERT INTO `precios` VALUES (1,1,1,500.00),(8,2,2,4000.00),(21,5,3,1000.00),(23,4,5,6000.00),(28,3,1,3500.00),(30,2,1,5500.00),(31,4,1,3500.00),(32,5,1,6000.00),(33,1,2,3500.00),(34,1,3,1500.00),(35,2,3,1800.00),(37,1,4,5000.00),(44,1,7,2000.00),(45,2,7,5000.00),(46,3,7,4000.00),(47,4,7,3000.00),(48,5,7,2000.00),(49,3,2,3700.00),(50,4,2,4200.00),(51,5,2,300.00),(52,3,3,1700.00),(53,4,3,2000.00),(54,2,4,7000.00),(55,3,4,6000.00),(56,4,4,7500.00),(58,5,4,4000.00),(59,1,5,4000.00),(60,2,5,5000.00),(61,3,5,5000.00),(62,5,5,4000.00),(63,1,6,1500.00),(64,2,6,1800.00),(65,3,6,2000.00),(66,4,6,2200.00),(67,5,6,1400.00),(68,1,8,7000.00),(69,5,8,7000.00),(70,2,8,7500.00),(71,3,8,7700.00),(72,4,8,8000.00),(73,1,9,2000.00),(74,2,9,2400.00),(75,3,9,2200.00),(76,4,9,2700.00),(77,5,9,2000.00),(78,1,11,1500.00),(79,2,11,2000.00),(80,3,11,1800.00),(81,4,11,3000.00),(82,5,11,2500.00);
/*!40000 ALTER TABLE `precios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produccion`
--

DROP TABLE IF EXISTS `produccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produccion` (
  `Id_produccion` int(11) NOT NULL AUTO_INCREMENT,
  `Estado` enum('Producido','Aceptado','Rechazado') DEFAULT NULL,
  `Cantidad` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `Observacion` varchar(50) DEFAULT NULL,
  `fk_codigo_pdto` int(11) NOT NULL,
  PRIMARY KEY (`Id_produccion`),
  KEY `Fabrica` (`fk_codigo_pdto`),
  CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`fk_codigo_pdto`) REFERENCES `productos` (`Codigo_pdto`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produccion`
--

LOCK TABLES `produccion` WRITE;
/*!40000 ALTER TABLE `produccion` DISABLE KEYS */;
INSERT INTO `produccion` VALUES (1,'Aceptado',500,'2022-04-01','Alta calidad',1),(2,'Aceptado',500,'2022-04-01','Alta calidad',2),(3,'Aceptado',500,'2022-04-02','Alta calidad',3),(4,'Aceptado',500,'2022-04-02','Alta calidad',4),(5,'Aceptado',500,'2022-04-03','Alta calidad',5),(6,'Aceptado',500,'2022-04-03','Alta calidad',6),(7,'Producido',5,'2022-05-02','Alta Calidad',1),(8,'Producido',555,'2022-05-02','Alta Calidad',6),(9,NULL,5,'2022-05-03','mm',6);
/*!40000 ALTER TABLE `produccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `Codigo_pdto` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(80) DEFAULT NULL,
  `imagen` varchar(80) DEFAULT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT NULL,
  `Reserva` enum('Si','No') DEFAULT NULL,
  `MaxReserva` int(11) NOT NULL,
  `Tipo` enum('Venta','Servicio') DEFAULT NULL,
  `fk_codigo_up` int(11) NOT NULL,
  PRIMARY KEY (`Codigo_pdto`),
  KEY `Genera` (`fk_codigo_up`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`fk_codigo_up`) REFERENCES `unidades_productivas` (`codigo_up`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Papa Criolla','Papa economica','1651586367837product.jpg','Activo','No',10,'Venta',2),(2,'Tomate','Muy rico','1651586393072product.jpg','Activo','No',10,'Venta',2),(3,'Naranja','Con mucha vitamina','1651586407397product.jpg','Activo','No',10,'Venta',2),(4,'Camisas','Facheritas','1651586421922product.jpg','Activo','No',10,'Venta',8),(5,'Huevos','Ricos ','1651586442194product.jpg','Activo','Si',10,'Venta',2),(6,'Tinto','Café especial','1651586461386product.jpg','Activo','No',10,'Venta',3),(7,'Almuerzos','Almuerzos especiales','1651586570718product.jpg','Activo','Si',1,'Venta',1),(8,'Trucha','Trucha especial','1651586675023product.jpg','Activo','Si',5,'Venta',7),(9,'Cebolla larga','Cebollin','1651586728041product.jpg','Inactivo','Si',10,'Venta',2),(11,'Yuca','Yuca Fresca','1651588935696product.jpg','Inactivo','No',15,'Venta',2);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `punto_venta`
--

DROP TABLE IF EXISTS `punto_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `punto_venta` (
  `Id_punto_vent` int(11) NOT NULL AUTO_INCREMENT,
  `Sede` enum('Centro','Yamboro') NOT NULL,
  `Direccion` varchar(30) NOT NULL,
  `Nombre` varchar(30) DEFAULT NULL,
  `fk_persona` bigint(20) NOT NULL,
  `Estado` enum('Activo','Inactivo') DEFAULT NULL,
  PRIMARY KEY (`Id_punto_vent`),
  KEY `encargado` (`fk_persona`),
  CONSTRAINT `punto_venta_ibfk_1` FOREIGN KEY (`fk_persona`) REFERENCES `personas` (`identificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punto_venta`
--

LOCK TABLES `punto_venta` WRITE;
/*!40000 ALTER TABLE `punto_venta` DISABLE KEYS */;
INSERT INTO `punto_venta` VALUES (1,'Yamboro','Vereda Yamboro','TintosYamboro',96361787,'Activo'),(2,'Centro','Comercio Y servicios','SenaStore',1006947348,'Activo'),(3,'Centro','Centro Y Servicios','FashonSENA',1007163342,'Activo'),(4,'Yamboro','Vereda Yamboro','FruverYamboro',1006524359,'Activo'),(6,'Centro','Pitalito','Super Ete',96361787,'Activo'),(7,'Yamboro','detodito','sdf',1004419254,'Activo'),(8,'Yamboro','Yamboro','Cooperativa Yamboro',1004419254,'Activo');
/*!40000 ALTER TABLE `punto_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades_productivas`
--

DROP TABLE IF EXISTS `unidades_productivas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidades_productivas` (
  `codigo_up` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(40) NOT NULL,
  `Logo` varchar(80) DEFAULT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  `sede` enum('Yamboro','Centro') DEFAULT NULL,
  `estado` enum('Activo','Inactivo') DEFAULT NULL,
  `entrega_producto` tinyint(1) NOT NULL,
  `fk_persona` bigint(20) NOT NULL,
  PRIMARY KEY (`codigo_up`),
  KEY `Asignar` (`fk_persona`),
  CONSTRAINT `unidades_productivas_ibfk_1` FOREIGN KEY (`fk_persona`) REFERENCES `personas` (`identificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades_productivas`
--

LOCK TABLES `unidades_productivas` WRITE;
/*!40000 ALTER TABLE `unidades_productivas` DISABLE KEYS */;
INSERT INTO `unidades_productivas` VALUES (1,'Gastronomía','1651585697549logo-de-SENA-png-Negro-300x300.png','Venta de almuerzos especiales','Yamboro','Activo',1,1004419254),(2,'Agricola','1651585783441logo-de-SENA-png-Negro-300x300.png','Producción Productos del campo orgánicos','Yamboro','Activo',1,1007163272),(3,'Escuela Nacional de la Calidad del Café','1651585826488logo-de-SENA-png-Negro-300x300.png','','Yamboro','Activo',1,1006524359),(4,'Ambiental – Recursos Naturales','1651585859314logo-de-SENA-png-Negro-300x300.png','','Yamboro','Activo',1,1007163272),(5,'Agroindustrias','1651585739401logo-de-SENA-png-Negro-300x300.png','Proceso de productos lácteos y cárnicos','Yamboro','Inactivo',1,1006524359),(6,'Empresa de Servicios Públicos','1651585887528logo-de-SENA-png-Negro-300x300.png','','Centro','Inactivo',1,1083864069),(7,'Pecuaria','logo-de-SENA-png-Negro-300x300.png','Se crían peces','Yamboro','Activo',1,1083864069),(8,'Moda – Comercio y Servicios','1651585924497logo-de-SENA-png-Negro-300x300.png','','Centro','Activo',1,1004419254),(12,'Circo','1651586820429logoSena.png','se hace comedia','Yamboro','Activo',1,1116912148);
/*!40000 ALTER TABLE `unidades_productivas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'produccion'
--

--
-- Dumping routines for database 'produccion'
--
/*!50003 DROP PROCEDURE IF EXISTS `Administrar_Inventario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Administrar_Inventario`(in tipo_mto varchar(40),in P_cantidad int,in P_cod_prod int, in P_pto_venta int,in P_produccion int,in P_inventario int)
BEGIN


-- agregar  productos nuevos al punto de venta - la cantidad llega en cero

if(tipo_mto='nuevo') then
			insert into inventario (stock,fk_codigo_pdto,fk_id_punto_vent)values(P_cantidad,P_cod_prod,P_pto_venta);
end if;


if(tipo_mto='ActualizarBodega') then

insert into bodega(fecha,cantidad,fk_inventario,fk_produccion)
values(curdate(),P_cantidad,P_inventario,P_produccion);

update inventario set stock=stock+P_cantidad where id_inventario=P_inventario;
			
end if;





END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Administrar_Reserva` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Administrar_Reserva`(in p_operacion varchar(20),in p_persona bigint)
BEGIN

declare cant int;
declare tipo_mov varchar(20);
-- Buscar movimientso tipo reserva en estado Reservado

select rol into tipo_mov from personas where identificacion=p_persona;

if(p_operacion='Buscar_Reserva') then

			if (tipo_mov='Vocero') then 
				set tipo_mov='Grupal';
                else
                set tipo_mov='Individual';
            
            end if;
            

	      SELECT count(*) into cant FROM movimientos where fk_persona= p_persona and estado='Reservado';
        
		
		  if (cant>0) then
			update movimientos set Fecha=CURDATE() where fk_persona=p_persona and estado='Reservado';
				
			else
				insert into movimientos(Estado,Fecha,fk_persona,tipo)values('Reservado',CURDATE(),p_persona,tipo_mov);
		  end if;
        
           
          
	SELECT distinct m.Id_movimiento,m.tipo,per.Cargo,per.Rol,per.identificacion,per.Nombres as Persona,per.ficha,d.id_detalle,p.Nombre,d.cantidad,(d.valor * d.cantidad) as valor,
    (select pn.nombres from personas pn where pn.identificacion=d.persona)as aprendiz
    FROM movimientos m
	join personas per on per.identificacion = fk_Persona
    left join detalle d on d.fk_Id_movimiento= m.Id_movimiento
    left join inventario iv on iv.id_inventario= d.fk_id_inventario
    left join productos p on p.Codigo_pdto= iv.fk_codigo_pdto
    left join precios pr on pr.fk_producto= p.Codigo_pdto and pr.fk_cargo=per.cargo
   
    where m.fk_persona=p_persona and m.Estado = 'Reservado';
          


end if;




END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Administrar_Ventas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Administrar_Ventas`(in P_operacion varchar(40),in P_estado varchar(20),in P_persona bigint,in P_tipo varchar(20), in P_entregado tinyint,in P_id_movimiento int)
BEGIN


if(P_operacion='NuevaVenta') then

insert into movimientos(estado,fecha,fk_persona,tipo,entregado)
values(P_estado,curdate(),P_persona,P_tipo,P_entregado);

end if;


if(P_operacion='Facturar') then

update movimientos set estado='Facturado' where Id_movimiento= P_id_movimiento;
update detalle set estado='Entregado' where fk_Id_movimiento= P_id_movimiento;

end if;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `lista_produccion_up`
--

/*!50001 DROP VIEW IF EXISTS `lista_produccion_up`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `lista_produccion_up` AS select `pd`.`Id_produccion` AS `Id_produccion`,`pd`.`fecha` AS `fecha`,`pr`.`Codigo_pdto` AS `Codigo_pdto`,`pr`.`Nombre` AS `producto`,`pd`.`Estado` AS `Estado`,`up`.`codigo_up` AS `codigo_up`,`up`.`Nombre` AS `nomb_up`,`pd`.`Cantidad` AS `Producido`,(select sum(`b`.`cantidad`) from `bodega` `b` where `b`.`fk_produccion` = `pd`.`Id_produccion`) AS `Distribuido`,`pd`.`Cantidad` - (select sum(`b`.`cantidad`) from `bodega` `b` where `b`.`fk_produccion` = `pd`.`Id_produccion`) AS `Disponible` from ((`produccion` `pd` join `productos` `pr` on(`pr`.`Codigo_pdto` = `pd`.`fk_codigo_pdto`)) join `unidades_productivas` `up` on(`up`.`codigo_up` = `pr`.`fk_codigo_up`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `lista_productos`
--

/*!50001 DROP VIEW IF EXISTS `lista_productos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `lista_productos` AS select `pv`.`Id_punto_vent` AS `Id_punto_vent`,`pv`.`Nombre` AS `Nombre`,`i`.`id_inventario` AS `id_inventario`,`p`.`Nombre` AS `Producto`,`p`.`Descripcion` AS `descripcion`,`p`.`imagen` AS `imagen`,`p`.`Reserva` AS `reserva`,`p`.`Estado` AS `estado`,`p`.`MaxReserva` AS `maxreserva`,`p`.`Tipo` AS `tipo`,`i`.`stock` AS `stock`,`up`.`codigo_up` AS `codigo_up`,`up`.`Nombre` AS `nomb_up`,(select `pr`.`precio` from `precios` `pr` where `pr`.`fk_producto` = `p`.`Codigo_pdto` and `pr`.`fk_cargo` = 1) AS `aprendiz`,(select `pr`.`precio` from `precios` `pr` where `pr`.`fk_producto` = `p`.`Codigo_pdto` and `pr`.`fk_cargo` = 2) AS `instructor`,(select `pr`.`precio` from `precios` `pr` where `pr`.`fk_producto` = `p`.`Codigo_pdto` and `pr`.`fk_cargo` = 3) AS `administrativo`,(select `pr`.`precio` from `precios` `pr` where `pr`.`fk_producto` = `p`.`Codigo_pdto` and `pr`.`fk_cargo` = 4) AS `externo`,(select `pr`.`precio` from `precios` `pr` where `pr`.`fk_producto` = `p`.`Codigo_pdto` and `pr`.`fk_cargo` = 5) AS `auxiliar` from (((`punto_venta` `pv` join `inventario` `i` on(`i`.`fk_id_punto_vent` = `pv`.`Id_punto_vent`)) join `productos` `p` on(`p`.`Codigo_pdto` = `i`.`fk_codigo_pdto`)) join `unidades_productivas` `up` on(`up`.`codigo_up` = `p`.`fk_codigo_up`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-04 14:45:55
