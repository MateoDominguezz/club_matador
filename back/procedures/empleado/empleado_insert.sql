DELIMITER $$
DROP PROCEDURE IF EXISTS empleado_insert;
CREATE PROCEDURE empleado_insert(
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
		SELECT 'No se pudo insertar el empleado' as 'result';
    END;
    
    START TRANSACTION;
		INSERT INTO empleado(nombre,apellido,dni,email,telefono)
        VALUES (
        xnombre,
        xapellido,
        xdni,
        xemail,
        xtelefono
        );
        COMMIT;
        SELECT 'Se pudo insertar el empleado' as 'result';
END $$
DELIMITER ;