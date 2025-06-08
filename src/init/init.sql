
DROP DATABASE IF EXISTS bank_test;
CREATE DATABASE bank_test;
USE bank_test;



DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1
);


DROP TABLE IF EXISTS Brands;
CREATE TABLE Brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1
);


DROP TABLE IF EXISTS CarLines;
CREATE TABLE CarLines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    brand_id INT NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1,
    FOREIGN KEY (brand_id) REFERENCES Brands(id)
);


DROP TABLE IF EXISTS Models;
CREATE TABLE Models (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    line_id INT NOT NULL,
    year INT NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1,
    FOREIGN KEY (line_id) REFERENCES CarLines(id)
);


DROP TABLE IF EXISTS TransmissionsTypes;
CREATE TABLE TransmissionsTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1
);


DROP TABLE IF EXISTS FuelTypes;
CREATE TABLE FuelTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1
);


DROP TABLE IF EXISTS Vehicles;
CREATE TABLE Vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model_id INT NOT NULL,
    user_id INT NOT NULL,
    vim VARCHAR(17) NOT NULL,
    color VARCHAR(30) NOT NULL,
    engine_number VARCHAR(30) NOT NULL,
    mileage INT NOT NULL DEFAULT 0,
    plate_number VARCHAR(15) DEFAULT NULL,
    fuel_type_id INT NOT NULL,
    transmission_type_id INT NOT NULL,
    registration_date DATE NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1,
    UNIQUE (vim),
    UNIQUE (engine_number),
    UNIQUE (plate_number),
    FOREIGN KEY (model_id) REFERENCES Models(id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (fuel_type_id) REFERENCES FuelTypes(id),
    FOREIGN KEY (transmission_type_id) REFERENCES TransmissionsTypes(id)
);

INSERT INTO Users (fullName) VALUES ('John Doe');
INSERT INTO Brands (name) VALUES ('Toyota');
INSERT INTO Brands (name) VALUES ('Honda');
INSERT INTO Brands (name) VALUES ('Ford');
INSERT INTO Brands (name) VALUES ('Mazda');

INSERT INTO CarLines (name, brand_id) VALUES ('Corolla', (SELECT id FROM Brands WHERE name = 'Toyota'));
INSERT INTO CarLines (name, brand_id) VALUES ('Civic', (SELECT id FROM Brands WHERE name = 'Honda'));
INSERT INTO CarLines (name, brand_id) VALUES ('Focus', (SELECT id FROM Brands WHERE name = 'Ford'));
INSERT INTO CarLines (name, brand_id) VALUES ('Mazda3', (SELECT id FROM Brands WHERE name = 'Mazda'));

INSERT INTO Models (name, line_id, year) VALUES ('Corolla LE', (SELECT id FROM CarLines WHERE name = 'Corolla'), 2020);
INSERT INTO Models (name, line_id, year) VALUES ('Civic LX', (SELECT id FROM CarLines WHERE name = 'Civic'), 2021);
INSERT INTO Models (name, line_id, year) VALUES ('Focus SE', (SELECT id FROM CarLines WHERE name = 'Focus'), 2019);
INSERT INTO Models (name, line_id, year) VALUES ('Mazda3 Sport', (SELECT id FROM CarLines WHERE name = 'Mazda3'), 2022);

INSERT INTO TransmissionsTypes (name) VALUES ('Automatic');
INSERT INTO TransmissionsTypes (name) VALUES ('Manual');
INSERT INTO TransmissionsTypes (name) VALUES ('CVT');

INSERT INTO FuelTypes (name) VALUES ('Diesel');
INSERT INTO FuelTypes (name) VALUES ('Electric');
INSERT INTO FuelTypes (name) VALUES ('Gasoline');

INSERT INTO Vehicles (model_id, user_id, vim, color, engine_number, mileage, fuel_type_id, transmission_type_id, registration_date)
VALUES 
    ((SELECT id FROM Models WHERE name = 'Corolla LE'), 
     (SELECT id FROM Users WHERE fullName = 'John Doe'), 
     '12345ABCDEFG', 
     'Red', 
     'ENG123', 
     1000, 
     3,
     1,
     '2024-01-01'),

    ((SELECT id FROM Models WHERE name = 'Civic LX'), 
     (SELECT id FROM Users WHERE fullName = 'John Doe'), 
     '67890HIJKLMN', 
     'Blue', 
     'ENG456', 
     5000, 
     1,
     2,
     '2024-02-01'),

    ((SELECT id FROM Models WHERE name = 'Focus SE'), 
     (SELECT id FROM Users WHERE fullName = 'John Doe'), 
     '11223OPQRSTU', 
     'Black', 
     'ENG789', 
     2000, 
     1,
     2, 
     '2024-03-01');
