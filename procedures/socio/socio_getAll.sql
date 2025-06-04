DELIMITER $$
DROP PROCEDURE IF EXISTS socio_getAll;
CREATE PROCEDURE socio_getAll()
BEGIN
	select *
    from socio
    ORDER BY id_socio ASC;
END $$
DELIMITER ;