DELIMITER $$
DROP PROCEDURE IF EXISTS deportista_update;
CREATE PROCEDURE deportista_update(
IN xid_deportista INT,
IN xid_deporte INT,
IN xnombre VARCHAR(20),
IN xapellido VARCHAR(20),
IN xdni VARCHAR(20),
IN xtelefono VARCHAR(20)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo actualizar el deportista' as 'result';
    END;
    
    START TRANSACTION;
		UPDATE deportista
        SET id_deporte = xid_deporte,
			nombre = xnombre,
			apellido = xapellido,
			dni = xdni,
			telefono = xtelefono
		WHERE id_deportista = xid_deportista;
        COMMIT;
END $$
DELIMITER ;