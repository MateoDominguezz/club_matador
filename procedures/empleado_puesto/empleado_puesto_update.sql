DELIMITER $$
DROP PROCEDURE IF EXISTS empleado_puesto_update;
CREATE PROCEDURE empleado_puesto_update(
IN xid_empleado INT,
IN xid_puesto INT,
IN xfecha_inicio DATE
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo actualizar el empleado con el puesto' as 'result';
    END;
    
    START TRANSACTION;
		UPDATE empleado_puesto
        SET id_empleado = xid_empleado,
			id_puesto = xid_puesto,
			fecha_inicio = xfecha_inicio
		WHERE id_empleado = xid_empleado AND id_puesto = xid_puesto ;
        COMMIT;
END $$
DELIMITER ;