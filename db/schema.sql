CREATE DATABASE animalsDB
USE animalsDB

CREATE TABLE animals 
(
	id INT NOT NULL AUTO_INCREMENT,
	species_name VARCHAR(64) NOT NULL,
	description VARCHAR(256) NOT NULL,
    conservation_status varchar(64),
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
)

