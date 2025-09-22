DELIMITER $$
DROP PROCEDURE IF EXISTS empleado_getAll;
CREATE PROCEDURE empleado_getAll()
BEGIN
	SELECT *
    FROM empleado
    ORDER BY id_empleado ASC;
END $$
DELIMITER ; 