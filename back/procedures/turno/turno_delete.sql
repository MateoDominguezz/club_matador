DELIMITER $$
DROP PROCEDURE IF EXISTS turno_delete;
CREATE PROCEDURE turno_delete(IN xid_turno INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo eliminar el turno' as 'result';
    END;
    
    START TRANSACTION;
		DELETE FROM turno
		WHERE id_turno = xid_turno;
        
        COMMIT;
END $$
DELIMITER ;