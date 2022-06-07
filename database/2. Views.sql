USE GEOLOCATIONDB;

-- =============================================================================================================
-- VISTA DE ESTABLECIMIENTOS
-- -------------------------------------------------------------------------------------------------------------
CREATE VIEW vs_establecimientos AS 
		SELECT EST.idestablecimiento, EST.establecimiento, EST.ruc, 
					CONCAT(
						CASE 
							WHEN EST.tipocalle LIKE 'CA' THEN 'Calle'
							WHEN EST.tipocalle LIKE 'AV' THEN 'Avenida'
							WHEN EST.tipocalle LIKE 'UR' THEN 'Urbanización'
							WHEN EST.tipocalle LIKE 'PJ' THEN 'Pasaje'
							WHEN EST.tipocalle LIKE 'JR' THEN 'Jirón'
						END, ' ', EST.nombrecalle, ' #', EST.numerocalle) AS 'ubicacion', 
					EST.referencia, EST.latitud, EST.longitud,
					DST.iddistrito, DST.distrito, PRV.idprovincia, PRV.provincia,
					DPT.iddepartamento, DPT.departamento
		FROM establecimientos EST
		INNER JOIN distritos DST ON DST.iddistrito = EST.iddistrito
		INNER JOIN provincias PRV ON PRV.idprovincia = DST.idprovincia
		INNER JOIN departamentos DPT ON DPT.iddepartamento = PRV.iddepartamento
		WHERE EST.estado = 1;
	