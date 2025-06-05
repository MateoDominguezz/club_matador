DELIMITER $$
DROP PROCEDURE IF EXISTS turno_update;
CREATE PROCEDURE turno_update(
IN xid_turno INT,
IN xdescripcion VARCHAR(256),
IN xhorario_inicio TIME,
IN xhorario_final TIME
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo actualizar el turno' as 'result';
    END;
    
    START TRANSACTION;
		UPDATE turno
        SET descripcion = xdescripcion,
			horario_inicio = xhorario_inicio,
            horario_final = xhorario_final
		WHERE id_turno = xid_turno;
        COMMIT;
END $$
DELIMITER ;