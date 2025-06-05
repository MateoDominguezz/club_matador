DELIMITER $$
DROP PROCEDURE IF EXISTS contrato_delete;
CREATE PROCEDURE contrato_delete(IN xid_contrato INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo eliminar el contrato' as 'result';
    END;
    
    START TRANSACTION;
		DELETE FROM contrato
        WHERE id_contrato = xid_contrato;
        COMMIT;
END $$
DELIMITER ;