DELIMITER $$
DROP PROCEDURE IF EXISTS puesto_update;
CREATE PROCEDURE puesto_update(
IN xid_puesto INT,
IN xid_turno INT,
IN xdescripcion VARCHAR(256),
IN xremuneracion_puesto DECIMAL(10,2)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo actualizar el puesto' as 'result';
    END;
    
    START TRANSACTION;
		UPDATE puesto
        SET id_turno = xid_turno,
			descripcion = xdescripcion,
            remuneracion_puesto = xremuneracion_puesto
		WHERE id_puesto = xid_puesto;
        COMMIT;
END $$
DELIMITER ;