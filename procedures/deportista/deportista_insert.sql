DELIMITER $$
DROP PROCEDURE IF EXISTS deportista_insert;
CREATE PROCEDURE deportista_insert(
IN xid_deporte VARCHAR(20),
IN xnombre VARCHAR(20),
IN xapellido VARCHAR(20),
IN xdni VARCHAR(20),
IN xtelefono VARCHAR(20)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo insertar el deportista' as 'result';
    END;
    
    START TRANSACTION;
		INSERT INTO deportista(id_deporte,nombre,apellido,dni,telefono)
        VALUES (
        xid_deporte,
        xnombre,
        xapellido,
        xdni,
        xtelefono
        );
        COMMIT;
        SELECT 'Se pudo insertar el deportista' as 'result';
END $$
DELIMITER ;