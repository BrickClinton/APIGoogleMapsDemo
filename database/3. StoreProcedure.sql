USE GEOLOCATIONDB;
-- =============================================================================================================
-- UBIGEO
-- -------------------------------------------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE spu_departamentos_listar()
BEGIN
	SELECT * FROM departamentos;
END $$

DELIMITER $$
CREATE PROCEDURE spu_provincias_listar(IN _iddepartamento	VARCHAR(2))
BEGIN
	SELECT * FROM provincias WHERE iddepartamento = _iddepartamento;
END $$


DELIMITER $$
CREATE PROCEDURE spu_distritos_listar(IN _idprovincia VARCHAR(4))
BEGIN
	SELECT * FROM distritos WHERE idprovincia = _idprovincia;
END $$

-- =============================================================================================================
-- TABLA ESTABLECIMIENTOS
-- -------------------------------------------------------------------------------------------------------------
-- ESTABLECIMIENTOS LISTADO POR USUARIO
DELIMITER $$
CREATE PROCEDURE spu_establecimientos_listar
(
	IN _limit 					TINYINT,
	IN _offset 					INT
)
BEGIN
	SELECT * FROM vs_establecimientos
		LIMIT _limit OFFSET _offset;	
END $$


DELIMITER $$
CREATE PROCEDURE spu_establecimientos_buscar
(
	IN _establecimiento VARCHAR(30),
	IN _distrito 				VARCHAR(45),
	IN _limit 					TINYINT,
	IN _offset 					INT
)
BEGIN
	SELECT * FROM vs_establecimientos
		WHERE establecimiento LIKE CONCAT('%',  _establecimiento, '%') AND 
		distrito LIKE CONCAT('%', _distrito, '%')
		LIMIT _limit OFFSET _offset;	
END $$

DELIMITER $$
CREATE PROCEDURE spu_establecimientos_getdata(IN _idestablecimiento INT)
BEGIN
	SELECT EST.idestablecimiento, EST.establecimiento, EST.ruc, EST.tipocalle,
				EST.nombrecalle, EST.numerocalle, EST.referencia, EST.latitud,
				EST.longitud, DST.iddistrito, DST.idprovincia, DST.iddepartamento
		FROM establecimientos EST
		INNER JOIN distritos DST ON DST.iddistrito = EST.iddistrito
		WHERE estado = 1 AND 
		idestablecimiento = _idestablecimiento;
END $$


-- AGREGAR ESTABLECIMIENTO --
DELIMITER $$
CREATE PROCEDURE spu_establecimientos_registrar
(
	IN _iddistrito 				VARCHAR(6),
	IN _establecimiento		VARCHAR(30),
	IN _ruc								CHAR(11),
	IN _tipocalle 				CHAR(2),
	IN _nombrecalle 			VARCHAR(60),
	IN _numerocalle 			VARCHAR(5),
	IN _referencia				VARCHAR(80),
	IN _latitud						FLOAT(10, 8),
	IN _longitud					FLOAT(10, 8)
)
BEGIN
	IF _numerocalle = '' THEN SET _numerocalle = NULL; END IF;
	IF _referencia = '' THEN SET _referencia = NULL; END IF;
	INSERT INTO establecimientos (iddistrito, establecimiento, ruc, tipocalle, nombrecalle, numerocalle, referencia, latitud, longitud)
		VALUES (_iddistrito, _establecimiento, _ruc, _tipocalle, _nombrecalle, _numerocalle, _referencia, _latitud, _longitud);
END $$


-- MODIFICAR ESTABLECIMIENTO --
DELIMITER $$
CREATE PROCEDURE spu_establecimientos_modificar
(
	IN _idestablecimiento INT,
	IN _iddistrito 				VARCHAR(6),
	IN _establecimiento		VARCHAR(30),
	IN _ruc								CHAR(11),
	IN _tipocalle 				CHAR(2),
	IN _nombrecalle 			VARCHAR(60),
	IN _numerocalle 			VARCHAR(5),
	IN _referencia				VARCHAR(80),
	IN _latitud						FLOAT(10, 8),
	IN _longitud					FLOAT(10, 8)
)
BEGIN
	UPDATE establecimientos SET
		iddistrito 			= _iddistrito,
		establecimiento = _establecimiento,
		ruc							= _ruc,
		tipocalle				= _tipocalle,
		nombrecalle			= _nombrecalle,
		numerocalle			= _numerocalle,
		referencia			= _referencia,
		latitud					= _latitud,
		longitud				= _longitud
	WHERE idestablecimiento 	= _idestablecimiento;
END $$


-- ELIMINAR ESTABLECIMIENTO (Lógico) --
DELIMITER $$
CREATE PROCEDURE spu_establecimientos_eliminar(IN _idestablecimiento INT)
BEGIN
	UPDATE establecimientos SET
		estado = 0
	WHERE idestablecimiento = _idestablecimiento;
END $$

