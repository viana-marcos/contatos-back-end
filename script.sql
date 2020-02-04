
CREATE DATABASE contato_database;
	
USE contato_database;

CREATE TABLE contato(
    id int AUTO_INCREMENT,
    nome varchar(300) NOT NULL,
    canal varchar(300) NOT NULL,
    valor varchar(300) NOT NULL,
    obs varchar(300) NOT NULL,
    PRIMARY KEY (id)
);