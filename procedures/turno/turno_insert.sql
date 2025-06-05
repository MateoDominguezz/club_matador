DELIMITER $$
DROP PROCEDURE IF EXISTS turno_insert;
CREATE PROCEDURE turno_insert(
IN xdescripcion VARCHAR(256),
IN xhorario_inicio TIME,
IN xhorario_final TIME
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo insertar el turno' as 'result';
    END;
    
    START TRANSACTION;
		INSERT INTO turno(descripcion,horario_inicio, horario_final)
        VALUES (
        xdescripcion,
        xhorario_inicio,
        xhorario_final
        );
        COMMIT;
        SELECT 'Se pudo insertar el turno' as 'result';
END $$
DELIMITER ;