DELIMITER $$
DROP PROCEDURE IF EXISTS puesto_delete;
CREATE PROCEDURE puesto_delete(
IN xid_puesto INT
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo eliminar el puesto' as 'result';
    END;
    
    START TRANSACTION;
		DELETE FROM puesto
		WHERE id_puesto = xid_puesto;
        
        COMMIT;
END $$
DELIMITER ;