DELIMITER $$
DROP PROCEDURE IF EXISTS socio_deporte_delete;
CREATE PROCEDURE socio_deporte_delete(
IN xid_deporte INT,
IN xid_socio INT
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo eliminar el socio con el deporte' as 'result';
    END;
    
    START TRANSACTION;
		DELETE FROM socio_deporte
		WHERE id_deporte = xid_deporte AND id_socio = xid_socio;
        
        COMMIT;
END $$
DELIMITER ;