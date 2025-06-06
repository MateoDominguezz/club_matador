DELIMITER $$
DROP PROCEDURE IF EXISTS socio_deporte_update;
CREATE PROCEDURE socio_deporte_update(
IN xid_deporte INT,
IN xid_socio INT,
IN xfecha_inscripcion DATE
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo actualizar el socio con el deporte' as 'result';
    END;
    
    START TRANSACTION;
		UPDATE socio_deporte
        SET id_deporte = xid_deporte,
			id_socio = xid_socio,
			fecha_inscripcion = xfecha_inscripcion
		WHERE id_deporte = xid_deporte AND id_socio = xid_socio;
        COMMIT;
END $$
DELIMITER ;