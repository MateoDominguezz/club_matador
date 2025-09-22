DELIMITER $$
DROP PROCEDURE IF EXISTS deporte_update;
CREATE PROCEDURE deporte_update(
IN xid_deporte INT,
IN xdescripcion VARCHAR(256)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo actualizar el deporte' as 'result';
    END;
    
    START TRANSACTION;
		UPDATE deporte
        SET descripcion = xdescripcion
		WHERE id_deporte = xid_deporte;
        COMMIT;
END $$
DELIMITER ;