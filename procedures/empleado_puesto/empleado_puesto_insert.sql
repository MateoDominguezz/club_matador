DELIMITER $$
DROP PROCEDURE IF EXISTS empleado_puesto_insert;
CREATE PROCEDURE empleado_puesto_insert(
IN xid_empleado INT,
IN xid_puesto INT,
IN xfecha_inicio DATE
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo insertar el empleado en el puesto' as 'result';
    END;
    
    START TRANSACTION;
		INSERT INTO empleado_puesto (id_empleado, id_puesto, fecha_inicio)
        VALUES (
        xid_empleado,
        xid_puesto,
        xfecha_inicio
        );
        COMMIT;
        SELECT 'Se pudo insertar el empleado en el puesto' as 'result';
END $$
DELIMITER ;