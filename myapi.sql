-- to create database --

CREATE DATABASE myapi
USE myapi

-- create table --
CREATE TABLE `myapi`.`users` (
  `user-id` INT NOT NULL AUTO_INCREMENT,
  `user-name` VARCHAR(45) NULL,
  `user-number` VARCHAR(45) NULL,
  PRIMARY KEY (`user-id`));

-- Insert data into table --

INSERT INTO `myapi`.`users` (`user-name`, `user-number`) VALUES ('John', '1234567890');
INSERT INTO `myapi`.`users` (`user-name`, `user-number`) VALUES ('Doe', '0987654321');
