CREATE DATABASE GEOLOCATIONDB;

USE GEOLOCATIONDB;

CREATE TABLE departamentos
(
  iddepartamento	VARCHAR(2) NOT NULL PRIMARY KEY,
  departamento		VARCHAR(45) NOT NULL
)ENGINE = INNODB;

CREATE TABLE provincias 
(
  idprovincia		VARCHAR(4)	NOT NULL PRIMARY KEY,
  provincia			VARCHAR(45) NOT NULL,
  iddepartamento	VARCHAR(2)	NOT NULL,
  CONSTRAINT fk_iddepartamento_pro FOREIGN KEY (iddepartamento) REFERENCES departamentos (iddepartamento)
)ENGINE = INNODB;

CREATE TABLE distritos 
(
  iddistrito		VARCHAR(6)	NOT NULL PRIMARY KEY,
  distrito			VARCHAR(45) DEFAULT NULL,
  idprovincia		VARCHAR(4)	DEFAULT NULL,
  iddepartamento	VARCHAR(2)	DEFAULT NULL,
  CONSTRAINT fk_idprovincia_dis FOREIGN KEY (idprovincia) REFERENCES provincias (idprovincia),
  CONSTRAINT fk_iddepartamento_dis FOREIGN KEY (iddepartamento) REFERENCES departamentos (iddepartamento)
)ENGINE = INNODB;


CREATE TABLE establecimientos
(
	idestablecimiento	INT AUTO_INCREMENT PRIMARY KEY,
	iddistrito				VARCHAR(6)		NOT NULL,
	establecimiento		VARCHAR(30)		NOT NULL,
	ruc								CHAR(11)			NOT NULL,
	tipocalle 				CHAR(2) 			NOT NULL,
	nombrecalle 			VARCHAR(60) 	NOT NULL,
	numerocalle 			VARCHAR(5) 		NULL,
	referencia				VARCHAR(80)		NULL,
	latitud						FLOAT(10, 8)	NOT NULL,
	longitud					FLOAT(10, 8)	NOT NULL,
	estado 						BIT 					NOT NULL DEFAULT 1,
	CONSTRAINT fk_est_iddistrito FOREIGN KEY(iddistrito) REFERENCES distritos (iddistrito),
	CONSTRAINT uk_est_ruc UNIQUE(ruc)
)ENGINE = INNODB;


-- INSERCIÓN DE ESTABLECIMIENTOS
INSERT INTO establecimientos (iddistrito, establecimiento, ruc, tipocalle, nombrecalle, numerocalle, referencia, latitud, longitud) VALUES
('010101', 'Camitas azules SAC', '10042628811', 'AV', 'Las Gardenias','123','Al costado de la iglesia',-5.998537,-77.668874),
('010203', 'Calles Ambiguas SAC', '10942658821', 'AV', 'Los alamos','1223','Al lado de comisaria',-5.638457, -78.449048),
('020103', 'Ojos de la justicia', '10942258311', 'AV', 'Luis Masaro','1234','AL frente del parque',-9.594582, -77.811126),
('020104', 'Matematicas El Tigre', '10942529811', 'JR', '28 de Julio','1235','2 cuadras antes del tecnologico', -9.723460,-77.819815),
('020105', 'DiseMundis', '10942658311', 'JR', '8 de Agosto','1678','Atras del bar Los Olivos',-9.497875, -77.612061),
('030101', 'Opera Sociales', '10342658811', 'JR', '9 de Diciembre','235','Al costado del circo Payaso', -13.635083, -72.885675),
('030102', 'Tus palabras', '10942651811', 'UR', 'Los ojos de Dios','765','Al frente de la notaria municipal',-14.002847 , -73.044786),
('030103', 'Vigilancia Segura', '10942358811', 'UR', 'Pedro Caceres','357','Entre Jr Galvez Chipoco y Rosario', -13.879381, -72.876338 ),
('040101', 'Asesores Unidos', '10942678811', 'LT', 'San Beata Melchorita','345','Al frente del estadio', -16.404546 ,  -71.546565),
('040102', 'TraducemePe', '10942628811', 'PJ', 'Juan de Dios','252','A tras de la cancha deportiva Mauro Mina', -16.357874, -71.545076);


