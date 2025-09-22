DELIMITER $$
DROP PROCEDURE IF EXISTS empleado_update;
CREATE PROCEDURE empleado_update(
IN xid_empleado INT,
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
		SELECT 'No se pudo actualizar el empleado' as 'result';
    END;
    
    START TRANSACTION;
		UPDATE empleado
        SET nombre = xnombre,
			apellido = xapellido,
			dni = xdni,
			email = xemail,
			telefono = xtelefono
		WHERE id_empleado = xid_empleado;
        COMMIT;
END $$
DELIMITER ;