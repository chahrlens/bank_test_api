CREATE DATABASE IF NOT EXISTS my_database;

USE my_database;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
);

CREATE TABLE IF NOT EXISTS Brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Lines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    brand_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    FOREIGN KEY (brand_id) REFERENCES Brands(id)
);

CREATE TABLE IF NOT EXISTS Models (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    line_id INT NOT NULL,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1,
    FOREIGN KEY (line_id) REFERENCES Line(id)
);

CREATE TABLE IF NOT EXISTS TransmissionsTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS FuelTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model_id INT NOT NULL,
    user_id INT NOT NULL,
    vim VARCHAR(17) NOT NULL,
    color VARCHAR(30) NOT NULL,
    engine_number VARCHAR(30) NOT NULL,
    mileage INT NOT NULL DEFAULT 0,
    plate_number VARCHAR(15) DEFAULT NULL,
    fuel_type VARCHAR(20) NOT NULL,
    transmission_type VARCHAR(20) NOT NULL,
    registration_date DATE NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    status tinyint NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE (vim),
    UNIQUE (engine_number),
    FOREIGN KEY (model_id) REFERENCES Models(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Users (fullName, status) VALUES
('Juan Pérez', 1),
('Ana Gómez', 1);

INSERT INTO Brands (name, status) VALUES
('Toyota', 1),
('Honda', 1);

INSERT INTO Line (name, brand_id, status) VALUES
('Corolla', 1, 1),
('Civic', 2, 1);

INSERT INTO Models (name, line_id, year, status) VALUES
('Corolla LE', 1, 2020, 1),
('Civic EX', 2, 2021, 1);

INSERT INTO TransmissionsTypes (name, status) VALUES
('Automática', 1),
('Manual', 1);

INSERT INTO FuelTypes (name, status) VALUES
('Gasolina', 1),
('Diesel', 1);

INSERT INTO Vehicles (
    model_id, user_id, vim, color, engine_number, mileage, plate_number,
    fuel_type, transmission_type, registration_date, image_url, description, status
) VALUES
(1, 1, '1HGCM82633A004352', 'Rojo', 'ENG12345', 15000, 'ABC123', 'Gasolina', 'Automática', '2022-01-15', NULL, 'Auto en buen estado', 1),
(2, 2, '2HGCM82633A004353', 'Azul', 'ENG54321', 20000, 'XYZ789', 'Diesel', 'Manual', '2023-03-10', NULL, 'Auto seminuevo', 1);

GRANT ALL PRIVILEGES ON *.* TO 'master'@'%' IDENTIFIED BY 'asdf.124' WITH GRANT OPTION;
FLUSH PRIVILEGES;