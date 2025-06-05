DELIMITER $$
DROP PROCEDURE IF EXISTS deportista_delete;
CREATE PROCEDURE deportista_delete(IN xid_deportista INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo eliminar el deportista' as 'result';
    END;
    
    START TRANSACTION;
		DELETE FROM deportista
		WHERE id_deportista = xid_deportista;
        
        COMMIT;
END $$
DELIMITER ;