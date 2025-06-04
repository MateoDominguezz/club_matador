DELIMITER $$
DROP PROCEDURE IF EXISTS empleado_getByID;
CREATE PROCEDURE empleado_getByID(
IN xid_empleado INT
)
BEGIN
	SELECT *
    FROM empleado
    WHERE id_empleado = xid_empleado;
END $$
DELIMITER ;