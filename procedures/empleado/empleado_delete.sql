DELIMITER $$
DROP PROCEDURE IF EXISTS empleado_delete;
CREATE PROCEDURE empleado_delete(IN xid_empleado INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo eliminar el socio' as 'result';
    END;
    
    START TRANSACTION;
		DELETE FROM empleado
		WHERE id_empleado = xid_empleado;
        
        COMMIT;
END $$
DELIMITER ;