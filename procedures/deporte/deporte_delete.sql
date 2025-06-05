DELIMITER $$
DROP PROCEDURE IF EXISTS deporte_delete;
CREATE PROCEDURE deporte_delete(IN xid_deporte INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo eliminar el deporte' as 'result';
    END;
    
    START TRANSACTION;
		DELETE FROM deporte
        WHERE id_deporte = xid_deporte;
        COMMIT;
END $$
DELIMITER ;