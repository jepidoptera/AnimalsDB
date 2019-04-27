CREATE DATABASE animalsDB
USE animalsDB

CREATE TABLE animals 
(
	id int NOT NULL AUTO_INCREMENT,
	species_name varchar(64) NOT NULL,
	description varchar(256) NOT NULL,
    conservation_status varchar(64),
	PRIMARY KEY (id)
)

