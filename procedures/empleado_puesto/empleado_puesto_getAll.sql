DELIMITER $$
DROP PROCEDURE IF EXISTS empleado_puesto_getAll;
CREATE PROCEDURE empleado_puesto_getAll()
BEGIN
	select *
    from empleado_puesto
    ORDER BY id_puesto ASC;
END $$
DELIMITER ;