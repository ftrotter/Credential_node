-- MySQL dump 10.13  Distrib 5.5.28, for Linux (x86_64)
--
-- Host: localhost    Database: cred
-- ------------------------------------------------------
-- Server version	5.5.28

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
-- Table structure for table `carrier`
--

DROP TABLE IF EXISTS `carrier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrier`
--

LOCK TABLES `carrier` WRITE;
/*!40000 ALTER TABLE `carrier` DISABLE KEYS */;
INSERT INTO `carrier` VALUES (1,'Bravo Health'),(2,'Molina (medicaid)'),(3,'XL Health'),(4,'Beech Street'),(5,'CHC (STAR)'),(6,'Molina (CHIPS)'),(7,'Senior Patient Association'),(8,'New Life Era'),(9,'Physicians\' ACO'),(10,'Wellcare'),(11,'Multi-Plan'),(12,'CHC (CHIPS)'),(13,'Molina (STAR plus)'),(14,'United American'),(15,'Universal Health Care'),(16,'CHC'),(17,'Galaxy'),(18,'Prime'),(19,'Molina (Medicare Advantage)'),(20,'Molina (Star)'),(21,'Alavida'),(22,'Patient/Physician Cooperatives');
/*!40000 ALTER TABLE `carrier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education_level`
--

DROP TABLE IF EXISTS `education_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `education_level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education_level`
--

LOCK TABLES `education_level` WRITE;
/*!40000 ALTER TABLE `education_level` DISABLE KEYS */;
INSERT INTO `education_level` VALUES (1,'BSN'),(2,'MSN'),(3,'Doctorate'),(4,'Degree'),(5,'Internship'),(6,'Residency'),(7,'Fellowship'),(8,'Teaching Appointment');
/*!40000 ALTER TABLE `education_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `id` int(10) NOT NULL,
  `table` varchar(30) NOT NULL,
  `row_id` int(10) NOT NULL,
  `note` varchar(500) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` date NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `profession_id` int(50) DEFAULT NULL,
  `status` varchar(11) DEFAULT NULL,
  `source_name` varchar(100) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `suffix` varchar(25) DEFAULT NULL,
  `maiden_name` varchar(50) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `birth_place` varchar(100) DEFAULT NULL,
  `gender_id` int(11) DEFAULT NULL,
  `pcp` int(11) DEFAULT NULL,
  `specialist` int(11) DEFAULT NULL,
  `home_street` varchar(50) DEFAULT NULL,
  `home_ste_apt_number` int(11) DEFAULT NULL,
  `home_city` varchar(25) DEFAULT NULL,
  `home_state` varchar(25) DEFAULT NULL,
  `home_zip_code` int(11) DEFAULT NULL,
  `home_phone_number` int(25) DEFAULT NULL,
  `corr_street` varchar(50) DEFAULT NULL,
  `corr_ste_apt_number` int(11) DEFAULT NULL,
  `corr_city` varchar(25) DEFAULT NULL,
  `corr_state` char(25) DEFAULT NULL,
  `corr_zip_code` int(11) DEFAULT NULL,
  `corr_phone_number` int(25) DEFAULT NULL,
  `corr_fax_number` int(25) DEFAULT NULL,
  `corr_email_address` varchar(50) DEFAULT NULL,
  `county` varchar(25) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `signature_date` date DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `modified_date` date DEFAULT NULL,
  `dea_number` varchar(25) DEFAULT NULL,
  `dea_issue_date` date DEFAULT NULL,
  `dea_exp_date` date DEFAULT NULL,
  `dps_number` int(11) DEFAULT NULL,
  `dps_issue_date` date DEFAULT NULL,
  `dps_exp_date` date DEFAULT NULL,
  `upin` int(11) DEFAULT NULL,
  `npi` int(25) DEFAULT NULL,
  `pan` int(25) DEFAULT NULL,
  `provider_number` int(25) DEFAULT NULL,
  `group_npi` int(25) DEFAULT NULL,
  `medicare_number` int(25) DEFAULT NULL,
  `medicare_tpi_number` int(25) DEFAULT NULL,
  `ecfmg_number` int(25) DEFAULT NULL,
  `ecfmg_issue_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider`
--

LOCK TABLES `provider` WRITE;
/*!40000 ALTER TABLE `provider` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_carrier`
--

DROP TABLE IF EXISTS `provider_carrier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider_carrier` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `provider_id` int(10) NOT NULL,
  `carrier_id` int(11) NOT NULL,
  `created_by_user_id` int(10) NOT NULL,
  `created_date` date NOT NULL,
  `modified_by_user_id` int(10) NOT NULL,
  `modified_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='track doctor licenses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_carrier`
--

LOCK TABLES `provider_carrier` WRITE;
/*!40000 ALTER TABLE `provider_carrier` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider_carrier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_coverage`
--

DROP TABLE IF EXISTS `provider_coverage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider_coverage` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `provider_id` int(10) NOT NULL,
  `is_self_insured` tinyint(1) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL,
  `street` varchar(25) DEFAULT NULL,
  `ste_apt_etc` varchar(25) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `state_id` int(11) NOT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `policy_number` int(25) DEFAULT NULL,
  `effective_date` date NOT NULL,
  `expiration_date` date NOT NULL,
  `occurrence_limit` int(25) DEFAULT NULL,
  `aggregate_limit` int(25) DEFAULT NULL,
  `coverage` varchar(25) DEFAULT NULL,
  `created_by_user_id` int(10) NOT NULL,
  `created_date` date NOT NULL,
  `modified_by_user_id` int(10) NOT NULL,
  `modified_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='track doctor licenses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_coverage`
--

LOCK TABLES `provider_coverage` WRITE;
/*!40000 ALTER TABLE `provider_coverage` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider_coverage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_credential`
--

DROP TABLE IF EXISTS `provider_credential`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider_credential` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `provider_id` int(10) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `credential_date` date NOT NULL,
  `recredential_date` date NOT NULL,
  `created_by_user_id` int(10) NOT NULL,
  `created_date` date NOT NULL,
  `modified_by_user_id` int(10) NOT NULL,
  `modified_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='track doctor licenses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_credential`
--

LOCK TABLES `provider_credential` WRITE;
/*!40000 ALTER TABLE `provider_credential` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider_credential` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_education`
--

DROP TABLE IF EXISTS `provider_education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider_education` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `provider_id` int(10) NOT NULL,
  `education_level_id` int(10) NOT NULL,
  `specialty_id` int(11) DEFAULT NULL,
  `attendance_period_start` date DEFAULT NULL,
  `attendance_period_end` date DEFAULT NULL,
  `institution_id` int(11) NOT NULL,
  `created_by_user_id` int(10) NOT NULL,
  `created_date` date NOT NULL,
  `modified_by_user_id` int(10) NOT NULL,
  `modified_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='track doctor licenses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_education`
--

LOCK TABLES `provider_education` WRITE;
/*!40000 ALTER TABLE `provider_education` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider_education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_hospital`
--

DROP TABLE IF EXISTS `provider_hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider_hospital` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `provider_id` int(10) NOT NULL,
  `is_primary` tinyint(1) DEFAULT NULL,
  `has_hospital_privaleges` tinyint(1) DEFAULT NULL,
  `hospital_id` varchar(1000) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `street` varchar(25) DEFAULT NULL,
  `ste_apt_etc` varchar(25) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `state_id` int(11) NOT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `fax` int(11) DEFAULT NULL,
  `email_address` varchar(25) DEFAULT '',
  `is_unrestricted_privileges` tinyint(1) DEFAULT NULL,
  `privileges_type` varchar(50) DEFAULT NULL,
  `is_privileges_temp` tinyint(1) DEFAULT NULL,
  `created_by_user_id` int(10) NOT NULL,
  `created_date` date NOT NULL,
  `modified_by_user_id` int(10) NOT NULL,
  `modified_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='track doctor licenses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_hospital`
--

LOCK TABLES `provider_hospital` WRITE;
/*!40000 ALTER TABLE `provider_hospital` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider_hospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_license`
--

DROP TABLE IF EXISTS `provider_license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider_license` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `provider_id` int(10) NOT NULL,
  `provider_type_id` int(10) NOT NULL,
  `license_number` varchar(50) NOT NULL,
  `state_id` int(11) NOT NULL,
  `issue_date` date NOT NULL,
  `expiration_date` date NOT NULL,
  `created_by_user_id` int(10) NOT NULL,
  `created_date` date NOT NULL,
  `modified_by_user_id` int(10) NOT NULL,
  `modified_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='track doctor licenses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_license`
--

LOCK TABLES `provider_license` WRITE;
/*!40000 ALTER TABLE `provider_license` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider_license` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_network`
--

DROP TABLE IF EXISTS `provider_network`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider_network` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `provider_id` int(10) NOT NULL,
  `network_id` int(11) NOT NULL,
  `created_by_user_id` int(10) NOT NULL,
  `created_date` date NOT NULL,
  `modified_by_user_id` int(10) NOT NULL,
  `modified_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='track doctor licenses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_network`
--

LOCK TABLES `provider_network` WRITE;
/*!40000 ALTER TABLE `provider_network` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider_network` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_reference`
--

DROP TABLE IF EXISTS `provider_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider_reference` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `provider_id` int(10) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `street` varchar(25) DEFAULT NULL,
  `ste_apt_etc` varchar(25) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `state_id` int(11) NOT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `created_by_user_id` int(10) NOT NULL,
  `created_date` date NOT NULL,
  `modified_by_user_id` int(10) NOT NULL,
  `modified_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='track doctor licenses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_reference`
--

LOCK TABLES `provider_reference` WRITE;
/*!40000 ALTER TABLE `provider_reference` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider_reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_specialty`
--

DROP TABLE IF EXISTS `provider_specialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider_specialty` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `provider_id` int(10) NOT NULL,
  `is_primary` tinyint(1) DEFAULT NULL,
  `specialty_id` int(11) DEFAULT NULL,
  `created_by_user_id` int(10) NOT NULL,
  `created_date` date NOT NULL,
  `modified_by_user_id` int(10) NOT NULL,
  `modified_date` int(11) NOT NULL,
  `specialty_abbrev_id` int(11) DEFAULT NULL,
  `board_id` int(10) DEFAULT NULL,
  `initial_cert_date` date DEFAULT NULL,
  `recertification_date` date DEFAULT NULL,
  `expiration_date` date NOT NULL,
  `hmo` tinyint(1) DEFAULT NULL,
  `ppo` tinyint(1) DEFAULT NULL,
  `pos` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='track doctor licenses';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_specialty`
--

LOCK TABLES `provider_specialty` WRITE;
/*!40000 ALTER TABLE `provider_specialty` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider_specialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tag` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags_to`
--

DROP TABLE IF EXISTS `tags_to`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags_to` (
  `id` int(10) NOT NULL,
  `table` varchar(30) NOT NULL,
  `row_id` int(10) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` date NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags_to`
--

LOCK TABLES `tags_to` WRITE;
/*!40000 ALTER TABLE `tags_to` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags_to` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-11-21 23:35:52
