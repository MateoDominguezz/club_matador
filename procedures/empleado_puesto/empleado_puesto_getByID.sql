DELIMITER $$
DROP PROCEDURE IF EXISTS empleado_puesto_getByID;
CREATE PROCEDURE empleado_puesto_getByID(
IN xid_empleado INT,
IN xid_puesto INT
)
BEGIN
	SELECT *
    FROM empleado_puesto
    WHERE id_empleado = xid_empleado AND id_puesto = xid_puesto;
END $$
DELIMITER ;