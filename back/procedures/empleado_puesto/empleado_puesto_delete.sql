DELIMITER $$
DROP PROCEDURE IF EXISTS empleado_puesto_delete;
CREATE PROCEDURE empleado_puesto_delete(
IN xid_empleado INT,
IN xid_puesto INT
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo eliminar el empleado en el puesto' as 'result';
    END;
    
    START TRANSACTION;
		DELETE FROM empleado_puesto
		WHERE id_empleado = xid_empleado AND id_puesto = xid_puesto ;
        
        COMMIT;
END $$
DELIMITER ;