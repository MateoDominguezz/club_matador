DELIMITER $$
DROP PROCEDURE IF EXISTS cuota_delete;
CREATE PROCEDURE cuota_delete(
IN xid_cuota INT
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo eliminar la cuota' as 'result';
    END;
    
    START TRANSACTION;
		DELETE FROM cuota
        WHERE id_cuota = xid_cuota;
        COMMIT;
END $$
DELIMITER ;