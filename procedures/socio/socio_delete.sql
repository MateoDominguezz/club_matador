DELIMITER $$
DROP PROCEDURE IF EXISTS socio_delete;
CREATE PROCEDURE socio_delete(IN xid_socio INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo eliminar el socio' as 'result';
    END;
    
    START TRANSACTION;
		DELETE FROM socio
		WHERE id_socio = xid_socio;
        
        COMMIT;
END $$
DELIMITER ;