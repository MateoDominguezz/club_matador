DELIMITER $$
DROP PROCEDURE IF EXISTS socio_deporte_getAll;
CREATE PROCEDURE socio_deporte_getAll()
BEGIN
	select *
    from socio_deporte
    ORDER BY id_socio ASC;
END $$
DELIMITER ;