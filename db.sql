

DROP TABLE IF EXISTS `ADMIN`;

CREATE TABLE `ADMIN` (
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Branch` varchar(255) DEFAULT NULL,
  `Token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Email`)
);


DROP TABLE IF EXISTS `ADMIN_LOGGER`;

CREATE TABLE `ADMIN_LOGGER` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) NOT NULL,
  `log` varchar(255) NOT NULL,
  `timeOfCreation` timestamp NOT NULL,
  `publicIP` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Email_idx` (`Email`),
  CONSTRAINT `Email` FOREIGN KEY (`Email`) REFERENCES `ADMIN` (`Email`)
);


DROP TABLE IF EXISTS `ALL_USER`;

CREATE TABLE `ALL_USER` (
  `Email` varchar(255) NOT NULL,
  `Token` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Email`)
);


DROP TABLE IF EXISTS `COMPANIES`;

CREATE TABLE `COMPANIES` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Min_CGPA` float(5,3) DEFAULT NULL,
  `Date_Of_Visit` date DEFAULT NULL,
  `Last_Date_Of_Apply` date DEFAULT NULL,
  `Package` int DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `PDF` varchar(1000) DEFAULT NULL,
  `Student_informed` tinyint(1) DEFAULT '0',
  `Updated` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ;


DROP TABLE IF EXISTS `ELIGIBLE_BRANCHES`;

CREATE TABLE `ELIGIBLE_BRANCHES` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Company_Id` varchar(255) NOT NULL,
  `Branch` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Company_Id_idx` (`Company_Id`),
  CONSTRAINT `Company_Id` FOREIGN KEY (`Company_Id`) REFERENCES `COMPANIES` (`Id`) ON DELETE CASCADE
);


DROP TABLE IF EXISTS `SELECTED`;

CREATE TABLE `SELECTED` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Company_id` varchar(225) NOT NULL,
  `RegNo` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
);


DROP TABLE IF EXISTS `STUDENT`;

CREATE TABLE `STUDENT` (
  `RegNo` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Branch` varchar(255) DEFAULT NULL,
  `10th` float(5,3) DEFAULT NULL,
  `12th` float(5,3) DEFAULT NULL,
  `CV` varchar(255) DEFAULT NULL,
  `Cgpa` float(5,3) DEFAULT NULL,
  PRIMARY KEY (`RegNo`),
  KEY `Email_idx` (`Email`),
  KEY `Email` (`Email`),
  CONSTRAINT `` FOREIGN KEY (`Email`) REFERENCES `ALL_USER` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
);


DROP TABLE IF EXISTS `USER_LOGGER`;

CREATE TABLE `USER_LOGGER` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) NOT NULL,
  `log` varchar(255) NOT NULL,
  `timeOfCreation` timestamp NOT NULL,
  `publicIP` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Email_idx` (`Email`),
  CONSTRAINT `Email_2` FOREIGN KEY (`Email`) REFERENCES `ALL_USER` (`Email`)
) ;


