DELIMITER $$
DROP PROCEDURE IF EXISTS socio_update;
CREATE PROCEDURE socio_update(
IN xid_socio INT,
IN xnombre VARCHAR(20),
IN xapellido VARCHAR(20),
IN xdni VARCHAR(20),
IN xemail VARCHAR(50),
IN xtelefono VARCHAR(20)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo actualizar el socio' as 'result';
    END;
    
    START TRANSACTION;
		UPDATE socio
        SET nombre = xnombre,
			apellido = xapellido,
			dni = xdni,
			email = xemail,
			telefono = xtelefono
		WHERE id_socio = xid_socio;
        COMMIT;
        SELECT 'Se pudo actualizar el socio' as 'result';
END $$
DELIMITER ;