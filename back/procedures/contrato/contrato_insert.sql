DELIMITER $$
DROP PROCEDURE IF EXISTS contrato_insert;
CREATE PROCEDURE contrato_insert(
IN xid_deportista INT,
IN xid_empleado INT,
IN xdescripcion varchar(256),
IN xfecha_inicio DATE,
IN xfecha_fin DATE
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SELECT 'No se pudo insertar el contrato' as 'result';
    END;
    
    START TRANSACTION;
		INSERT INTO contrato(id_deportista, id_empleado, descripcion, fecha_inicio, fecha_fin)
        VALUES (
        xid_deportista, xid_empleado, xdescripcion, xfecha_inicio, xfecha_fin
        );
        COMMIT;
        SELECT 'Se pudo insertar el contrato' as 'result';
END $$
DELIMITER ;
