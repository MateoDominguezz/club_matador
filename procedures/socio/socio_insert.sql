DELIMITER $$
DROP PROCEDURE IF EXISTS socio_insert;
CREATE PROCEDURE socio_insert(
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
		SELECT 'No se pudo insertar el socio' as 'result';
    END;
    
    START TRANSACTION;
		INSERT INTO socio(nombre,apellido,dni,email,telefono)
        VALUES (
        xnombre,
        xapellido,
        xdni,
        xemail,
        xtelefono
        );
        COMMIT;
        SELECT 'Se pudo insertar el socio' as 'result';
END $$
DELIMITER ;